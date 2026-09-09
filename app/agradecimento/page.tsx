import type { Metadata } from "next";
import Link from "next/link";
import {
  AGRADECIMENTO_CTA,
  AGRADECIMENTO_DESCRIPTION,
  AGRADECIMENTO_HEADLINE,
  BRAND_LOGO_PANEL,
  BRAND_NAME,
  BRAND_PANEL_BG,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_YOUTUBE_URL,
} from "@/lib/config";

export const metadata: Metadata = {
  title: `Obrigado | ${BRAND_NAME}`,
  robots: { index: false, follow: false },
};

// Mesmo padrão de imagem + gradiente de fallback do painel do formulário.
const visualStyle = {
  backgroundImage: `url(${BRAND_PANEL_BG}), linear-gradient(135deg, var(--brand-hi), var(--brand) 55%, var(--brand-deep))`,
};

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5V8.5L15.8 12l-6.2 3.5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function AgradecimentoPage() {
  const hasSocial = Boolean(SOCIAL_YOUTUBE_URL || SOCIAL_INSTAGRAM_URL);

  return (
    <main className="decline-page">
      <div className="decline-content">
        <span className="decline-badge">{BRAND_NAME}</span>
        <h1>{AGRADECIMENTO_HEADLINE}</h1>
        <p>{AGRADECIMENTO_DESCRIPTION}</p>
        <p className="decline-cta">{AGRADECIMENTO_CTA}</p>

        {hasSocial ? (
          <div className="decline-social">
            {SOCIAL_YOUTUBE_URL ? (
              <a href={SOCIAL_YOUTUBE_URL} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <YoutubeIcon />
              </a>
            ) : null}
            {SOCIAL_INSTAGRAM_URL ? (
              <a href={SOCIAL_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
            ) : null}
          </div>
        ) : null}

        <Link className="decline-back" href="/">
          Voltar ao início
        </Link>
      </div>

      <div className="decline-visual" style={visualStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="decline-visual-logo" src={BRAND_LOGO_PANEL} alt={BRAND_NAME} />
      </div>
    </main>
  );
}
