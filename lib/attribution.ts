export interface Attribution {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  meta_campaign_id: string;
  meta_adset_id: string;
  meta_ad_id: string;
  landing_page: string;
}

const QUERY_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "meta_campaign_id",
  "meta_adset_id",
  "meta_ad_id",
] as const;

const EMPTY_ATTRIBUTION: Attribution = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
  meta_campaign_id: "",
  meta_adset_id: "",
  meta_ad_id: "",
  landing_page: "",
};

// Lê UTMs e parâmetros de atribuição de Meta Ads da própria query string da
// página (mesmo padrão do funil original: capturar tudo no client, na hora).
export function getAttribution(): Attribution {
  if (typeof window === "undefined") {
    return EMPTY_ATTRIBUTION;
  }

  const params = new URLSearchParams(window.location.search);
  const attribution = { ...EMPTY_ATTRIBUTION };

  for (const key of QUERY_PARAMS) {
    attribution[key] = params.get(key) ?? "";
  }

  attribution.landing_page = window.location.href;

  return attribution;
}

// fbclid da URL e fbc/fbp dos cookies do Pixel (_fbc/_fbp), lidos na hora do envio. Sem cookie,
// o fbc segue o formato do Meta a partir do fbclid. Vão com o lead para o CRM (atribuição).
export function readMetaIds(): { fbclid?: string; fbc?: string; fbp?: string } {
  if (typeof window === "undefined") return {};
  const cookie = (name: string) => {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : undefined;
  };
  const fbclid = new URLSearchParams(window.location.search).get("fbclid") || undefined;
  const fbc = cookie("_fbc") || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined);
  const fbp = cookie("_fbp");
  return { ...(fbclid && { fbclid }), ...(fbc && { fbc }), ...(fbp && { fbp }) };
}
