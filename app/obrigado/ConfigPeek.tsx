"use client";

import { useEffect, useState } from "react";
import { GTM_ID, META_PIXEL_ID, N8N_WEBHOOK_URL, LEAD_WEBHOOK_URL } from "@/lib/config";

export function ConfigPeek() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Ver configuração de tracking"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="config-peek-dot"
      />

      {open && (
        <div className="config-peek-overlay" onClick={() => setOpen(false)}>
          <div
            className="config-peek-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Configuração de tracking"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Configuração de tracking</h2>

            <div className="config-peek-row">
              <strong>Meta Pixel ID</strong>
              <span>{META_PIXEL_ID || "não configurado"}</span>
            </div>
            <div className="config-peek-row">
              <strong>GTM ID</strong>
              <span>{GTM_ID || "não configurado"}</span>
            </div>
            <div className="config-peek-row">
              <strong>Webhook do lead</strong>
              <span>{LEAD_WEBHOOK_URL}</span>
            </div>
            <div className="config-peek-row">
              <strong>Webhook n8n</strong>
              <span>{N8N_WEBHOOK_URL || "não configurado"}</span>
            </div>

            <button type="button" className="config-peek-close" onClick={() => setOpen(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
