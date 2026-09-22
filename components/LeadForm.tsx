"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BRAND_DESCRIPTION,
  BRAND_HEADLINE,
  BRAND_LOGO_MARK,
  BRAND_LOGO_PANEL,
  BRAND_NAME,
  BRAND_PANEL_BG,
  BRAND_PILLS,
  FORM_NAME,
  LEAD_ORIGIN,
  LEAD_SOURCE,
  LEAD_WEBHOOK_URL,
  META_PIXEL_ID,
  N8N_WEBHOOK_URL,
} from "@/lib/config";
import { getAttribution, type Attribution } from "@/lib/attribution";
import { isQualified } from "@/lib/qualification";
import { EMPTY_ANSWERS, STEPS, type Answers, type Step } from "@/lib/steps";
import { renderAccentText } from "@/lib/text";
import { TESTIMONIALS } from "@/lib/testimonials";
import { pushDataLayerEvent, trackMetaLead } from "@/lib/tracking";
import { formatPhone, isValidPhone } from "@/lib/validation";

async function verifyPhoneIsReal(digits: string): Promise<boolean> {
  try {
    const res = await fetch("/api/verify-phone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: `+55${digits}` }),
    });
    if (!res.ok) return true;
    const data = await res.json();
    return Boolean(data.valid);
  } catch {
    return true;
  }
}

function validateStepValue(step: Step, value: string): string | null {
  switch (step.id) {
    case "nome":
      return value.trim().length > 0 ? null : "Digite seu nome para continuar.";
    case "whatsapp":
      return isValidPhone(value) ? null : "Digite um WhatsApp válido.";
    case "empresa":
      return value.trim().length > 0 ? null : "Por favor, informe o nome da sua empresa.";
    default:
      return value ? null : "Selecione uma opção para continuar.";
  }
}

export function LeadForm() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [errors, setErrors] = useState<Partial<Record<keyof Answers, string>>>({});
  const [checkingPhone, setCheckingPhone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const attributionRef = useRef<Attribution | null>(null);
  const leadFiredRef = useRef(false);

  const testimonial = TESTIMONIALS[0];
  const brandPanelStyle = {
    backgroundImage: `url(${BRAND_PANEL_BG}), linear-gradient(135deg, var(--brand-hi), var(--brand) 55%, var(--brand-deep))`,
  };

  useEffect(() => {
    attributionRef.current = getAttribution();
    pushDataLayerEvent({ event: "form_view", form_name: FORM_NAME, source: LEAD_SOURCE });
  }, []);

  function updateAnswer(id: keyof Answers, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: undefined }));
  }

  function finalize(finalAnswers: Answers) {
    const qualificado = isQualified(finalAnswers);

    pushDataLayerEvent({ event: "form_submit", form_name: FORM_NAME, source: LEAD_SOURCE, qualificado });

    if (!leadFiredRef.current) {
      trackMetaLead(META_PIXEL_ID, { qualificado });
      leadFiredRef.current = true;
    }

    const payload = { ...finalAnswers, qualificado, attribution: attributionRef.current };

    if (N8N_WEBHOOK_URL) {
      fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }

    fetch(LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, origem: LEAD_ORIGIN }),
      keepalive: true,
    }).catch(() => {});

    router.push(qualificado ? "/obrigado" : "/agradecimento");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: Partial<Record<keyof Answers, string>> = {};
    for (const step of STEPS) {
      const err = validateStepValue(step, answers[step.id]);
      if (err) nextErrors[step.id] = err;
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setCheckingPhone(true);
    const phoneIsReal = await verifyPhoneIsReal(answers.whatsapp.replace(/\D/g, ""));
    setCheckingPhone(false);

    if (!phoneIsReal) {
      setErrors((prev) => ({ ...prev, whatsapp: "Esse número de WhatsApp não parece ser válido." }));
      setSubmitting(false);
      return;
    }

    finalize(answers);
  }

  return (
    <main className="form-shell">
      <aside className="brand-panel" style={brandPanelStyle} aria-label={BRAND_NAME}>
        <div className="brand-panel-content">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-panel-logo" src={BRAND_LOGO_PANEL} alt={BRAND_NAME} />
          <div className="brand-panel-copy">
            <h2>{renderAccentText(BRAND_HEADLINE)}</h2>
            <p>{BRAND_DESCRIPTION}</p>
          </div>
          <div className="brand-pill-row" aria-label="Pilares da análise">
            {BRAND_PILLS.map((pill) => (
              <span key={pill}>{pill}</span>
            ))}
          </div>
        </div>
      </aside>

      <section className="form-panel">
        <header className="form-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-mark" src={BRAND_LOGO_MARK} alt={BRAND_NAME} />
        </header>

        <div className="content-stack">
          <form className="question-card compact-form" onSubmit={handleSubmit} noValidate>
            <div className="question-copy">
              <p className="eyebrow">Preencha e um especialista entra em contato</p>
              <h1>Quero saber mais</h1>
            </div>

            {STEPS.map((step) => (
              <div className="field-group" key={step.id}>
                <label className="field-label" htmlFor={step.id}>{step.question}</label>

                {step.type === "select" ? (
                  <select
                    id={step.id}
                    value={answers[step.id]}
                    required
                    aria-invalid={Boolean(errors[step.id])}
                    onChange={(e) => updateAnswer(step.id, e.target.value)}
                  >
                    <option value="" disabled>
                      {step.placeholder}
                    </option>
                    {step.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : step.type === "tel" ? (
                  <div className="phone-control">
                    <span className="phone-prefix">+55</span>
                    <input
                      id={step.id}
                      type="tel"
                      inputMode="numeric"
                      placeholder={step.placeholder}
                      required
                      aria-invalid={Boolean(errors[step.id])}
                      value={answers[step.id]}
                      onChange={(e) => updateAnswer(step.id, formatPhone(e.target.value))}
                    />
                  </div>
                ) : (
                  <input
                    id={step.id}
                    type={step.type}
                    placeholder={step.placeholder}
                    required
                    aria-invalid={Boolean(errors[step.id])}
                    value={answers[step.id]}
                    onChange={(e) => updateAnswer(step.id, e.target.value)}
                  />
                )}

                {step.type !== "select" && step.helperText ? (
                  <p className="helper-text">{step.helperText}</p>
                ) : null}
                {errors[step.id] ? <p className="error-message" role="alert">{errors[step.id]}</p> : null}
              </div>
            ))}

            <div className="action-row">
              <button className="primary-button" type="submit" disabled={submitting}>
                {checkingPhone ? "VALIDANDO WHATSAPP..." : "ENVIAR"}
                <span>→</span>
              </button>
            </div>
          </form>

          <article className="testimonial-card">
            <div className="testimonial-copy">
              <span className="quote-mark">&ldquo;</span>
              <p>{testimonial.quote}</p>
            </div>
            <footer>{testimonial.author}</footer>
          </article>
        </div>

        <footer className="legal-footer">
          <p>Ao continuar, você concorda em receber mensagens de marketing por SMS e e-mail da {BRAND_NAME}.</p>
          <span>© {new Date().getFullYear()} {BRAND_NAME}</span>
        </footer>
      </section>
    </main>
  );
}
