import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_LOGO_MARK, BRAND_NAME, OBRIGADO_DESCRIPTION, OBRIGADO_HEADLINE } from "@/lib/config";
import { renderAccentText } from "@/lib/text";

export const metadata: Metadata = {
  title: `Cadastro concluído | ${BRAND_NAME}`,
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return (
    <main className="confirm-page">
      <header className="confirm-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BRAND_LOGO_MARK} alt={BRAND_NAME} />
        <span>{BRAND_NAME}</span>
      </header>

      <div className="confirm-main">
        <h1>{renderAccentText(OBRIGADO_HEADLINE)}</h1>
        <p>{OBRIGADO_DESCRIPTION}</p>
      </div>

      <footer className="confirm-footer">
        <p>
          © {new Date().getFullYear()} {BRAND_NAME}. Todos os direitos reservados.
        </p>
      </footer>

      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute w-px h-px p-0 m-0 opacity-0 overflow-hidden border-0"
      />

      <Link
        href="/"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute w-px h-px p-0 m-0 opacity-0 overflow-hidden border-0"
      >
        &nbsp;
      </Link>
    </main>
  );
}
