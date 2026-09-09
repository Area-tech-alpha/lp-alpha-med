"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  LEAD_SOURCE,
  META_PIXEL_ID,
  N8N_WEBHOOK_URL,
} from "@/lib/config";
import { getAttribution, type Attribution } from "@/lib/attribution";
import { isQualified } from "@/lib/qualification";
import { EMPTY_ANSWERS, STEPS, type Answers, type Step } from "@/lib/steps";
import { renderAccentText } from "@/lib/text";
import { TESTIMONIALS } from "@/lib/testimonials";
import { pushDataLayerEvent, trackMetaLead } from "@/lib/tracking";
import { formatPhone, isValidEmail, isValidPhone } from "@/lib/validation";

function validateStep(step: Step, value: string): string | null {
  switch (step.id) {
    case "nome":
      return value.trim().length > 0 ? null : "Digite seu nome para continuar.";
    case "whatsapp":
      return isValidPhone(value) ? null : "Digite um WhatsApp válido.";
    case "email":
      return isValidEmail(value) ? null : "Digite um e-mail válido.";
    default:
      return value ? null : "Selecione uma opção para continuar.";
  }
}

export function LeadForm() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [error, setError] = useState("");
  const attributionRef = useRef<Attribution | null>(null);
  const leadFiredRef = useRef(false);

  const step = STEPS[stepIndex];
  const testimonial = useMemo(
    () => TESTIMONIALS[stepIndex % TESTIMONIALS.length],
    [stepIndex]
  );
  const progress = (stepIndex / STEPS.length) * 100;
  // Imagem real da marca por cima, gradiente laranja como fallback caso o
  // arquivo ainda não exista em public/ (ver BRAND_PANEL_BG).
  const brandPanelStyle = {
    backgroundImage: `url(${BRAND_PANEL_BG}), linear-gradient(135deg, var(--brand-hi), var(--brand) 55%, var(--brand-deep))`,
  };

  useEffect(() => {
    attributionRef.current = getAttribution();
    pushDataLayerEvent({ event: "form_view", form_name: FORM_NAME, source: LEAD_SOURCE });
  }, []);

  useEffect(() => {
    if (stepIndex === 0) return;
    pushDataLayerEvent({
      event: "form_step",
      form_name: FORM_NAME,
      source: LEAD_SOURCE,
      step: step.id,
      step_number: stepIndex + 1,
    });
  }, [stepIndex, step.id]);

  function updateAnswer(value: string) {
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
    if (error) setError("");
  }

  function goBack() {
    if (stepIndex === 0) return;
    setError("");
    setStepIndex((i) => i - 1);
  }

  function finalize(finalAnswers: Answers) {
    const qualificado = isQualified(finalAnswers);

    pushDataLayerEvent({
      event: "form_submit",
      form_name: FORM_NAME,
      source: LEAD_SOURCE,
      qualificado,
    });

    if (!leadFiredRef.current) {
      trackMetaLead(META_PIXEL_ID, { qualificado });
      leadFiredRef.current = true;
    }

    if (N8N_WEBHOOK_URL) {
      const payload = {
        ...finalAnswers,
        qualificado,
        attribution: attributionRef.current,
      };

      // Disparo em paralelo, sem bloquear o redirecionamento — keepalive
      // garante que a requisição termine mesmo após a navegação.
      fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => { });
    }

    router.push(qualificado ? "/obrigado" : "/agradecimento");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = answers[step.id];
    const validationError = validateStep(step, value);

    if (validationError) {
      setError(validationError);
      return;
    }

    if (stepIndex === STEPS.length - 1) {
      finalize(answers);
      return;
    }

    setStepIndex((i) => i + 1);
  }

  function handleSelect(option: string) {
    updateAnswer(option);
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
        <div className="progress-track" aria-hidden="true">
          <span style={{ height: `${progress}%` }} />
        </div>

        <header className="form-header">
          <button
            className="back-button"
            type="button"
            onClick={goBack}
            disabled={stepIndex === 0}
            aria-label="Voltar para a etapa anterior"
          >
            ←
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-mark" src={BRAND_LOGO_MARK} alt={BRAND_NAME} />
        </header>

        <div className="content-stack" key={step.id}>
          <form className="question-card" onSubmit={handleSubmit} noValidate>
            <div className="question-copy">
              <p className="eyebrow">{step.eyebrow}</p>
              <h1>{step.question}</h1>
            </div>

            <div className="field-group">
              {step.type === "select" ? (
                <div className="choice-grid" role="group" aria-label={step.question}>
                  {step.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`choice-button${answers[step.id] === option ? " selected" : ""}`}
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : step.type === "tel" ? (
                <div className="phone-control">
                  <span className="phone-prefix">+55</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder={step.placeholder}
                    aria-label={step.question}
                    aria-invalid={Boolean(error)}
                    autoFocus
                    value={answers[step.id]}
                    onChange={(e) => updateAnswer(formatPhone(e.target.value))}
                  />
                </div>
              ) : (
                <input
                  type={step.type}
                  placeholder={step.placeholder}
                  aria-label={step.question}
                  aria-invalid={Boolean(error)}
                  autoFocus
                  value={answers[step.id]}
                  onChange={(e) => updateAnswer(e.target.value)}
                />
              )}
              {step.type !== "select" && step.helperText ? (
                <p className="helper-text">{step.helperText}</p>
              ) : null}
              <p className="error-message" role="alert">
                {error}
              </p>
            </div>

            <div className="action-row">
              <button className="primary-button" type="submit" disabled={!answers[step.id]}>
                {stepIndex === STEPS.length - 1 ? "ENVIAR" : "CONFIRMAR"}
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
          <p>
            Ao continuar, você concorda em receber mensagens de marketing por SMS e e-mail
            da {BRAND_NAME}.
          </p>
          <span>© {new Date().getFullYear()} {BRAND_NAME}</span>
        </footer>
      </section>
    </main>
  );
}
