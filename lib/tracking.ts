export function pushDataLayerEvent(data: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

export function trackMetaLead(pixelId: string, extra: Record<string, unknown>): void {
  if (typeof window === "undefined" || !pixelId || typeof window.fbq !== "function") return;
  window.fbq("trackSingle", pixelId, "Lead", extra);
}
