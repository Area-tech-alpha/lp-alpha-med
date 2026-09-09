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
