// Configuração de marca e integrações. Tudo lido de env vars com fallback
// genérico — ajustar via .env.local (ver .env.example) antes de produção.

export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "Assessoria Alpha";
export const BRAND_HEADLINE =
  process.env.NEXT_PUBLIC_BRAND_HEADLINE ||
  "A Maior Assessoria de Marketing Nichada da América Latina.";
export const BRAND_DESCRIPTION =
  process.env.NEXT_PUBLIC_BRAND_DESCRIPTION ||
  "Uma análise estratégica para identificar oportunidades de captação de clientes para o seu consultório.";
// Logo em fundo escuro (usada sobre o painel laranja/imagem de marca)
export const BRAND_LOGO_PANEL =
  process.env.NEXT_PUBLIC_BRAND_LOGO_PANEL || "/logo-fundo-preto.jpg";
// Logo transparente (usada sobre fundo branco: header do form, páginas de resultado)
export const BRAND_LOGO_MARK =
  process.env.NEXT_PUBLIC_BRAND_LOGO_MARK || "/logo-sem-fundo.PNG";
export const BRAND_PANEL_BG = process.env.NEXT_PUBLIC_BRAND_PANEL_BG || "/brand-panel-bg.webp";
export const BRAND_PILLS = ["Demanda qualificada", "Previsibilidade", "Estratégia"];

// Página /obrigado (lead qualificado)
export const OBRIGADO_HEADLINE =
  process.env.NEXT_PUBLIC_OBRIGADO_HEADLINE || "Cadastro *Concluído!*";
export const OBRIGADO_DESCRIPTION =
  process.env.NEXT_PUBLIC_OBRIGADO_DESCRIPTION ||
  "Nos próximos minutos, o nosso time de especialistas vai entrar em contato para entender melhor o seu consultório e como podemos ajudar a aumentar sua captação de pacientes.";

// Página /agradecimento (lead desqualificado)
export const AGRADECIMENTO_HEADLINE =
  process.env.NEXT_PUBLIC_AGRADECIMENTO_HEADLINE || "Obrigado pelo interesse!";
export const AGRADECIMENTO_DESCRIPTION =
  process.env.NEXT_PUBLIC_AGRADECIMENTO_DESCRIPTION ||
  "Analisamos cada perfil com cuidado. Se houver uma oportunidade de parceria, entraremos em contato com você em breve.";
export const AGRADECIMENTO_CTA =
  process.env.NEXT_PUBLIC_AGRADECIMENTO_CTA ||
  "Enquanto isso, acompanhe nosso conteúdo e fique por dentro das novidades.";

// Redes sociais na página /agradecimento (em branco, o ícone some)
export const SOCIAL_YOUTUBE_URL =
  process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL || "https://www.youtube.com/@assessorialpha";
export const SOCIAL_INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL || "https://www.instagram.com/assessorialpha/";

// Tracking — em branco = script não é renderizado.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

// Identificação do formulário nos eventos de tracking (dataLayer).
export const FORM_NAME = process.env.NEXT_PUBLIC_FORM_NAME || "diagnostico_captacao_leads";
export const LEAD_SOURCE = process.env.NEXT_PUBLIC_LEAD_SOURCE || "landing_page";

// Webhook do n8n que recebe o lead ao final do funil.
export const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "";
