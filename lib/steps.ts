export type StepId = "nome" | "whatsapp" | "email" | "areaAtuacao" | "faturamento";

export type Answers = Record<StepId, string>;

export const EMPTY_ANSWERS: Answers = {
  nome: "",
  whatsapp: "",
  email: "",
  areaAtuacao: "",
  faturamento: "",
};

interface BaseStep {
  id: StepId;
  eyebrow: string;
  question: string;
}

export interface TextStep extends BaseStep {
  type: "text" | "email" | "tel";
  placeholder: string;
  helperText?: string;
}

export interface SelectStep extends BaseStep {
  type: "select";
  options: string[];
}

export type Step = TextStep | SelectStep;

export const STEPS: Step[] = [
  {
    id: "nome",
    type: "text",
    eyebrow: "Bom ter você aqui!",
    question: "Qual seu nome?",
    placeholder: "Digite sua resposta...",
  },
  {
    id: "whatsapp",
    type: "tel",
    eyebrow: "Perfeito!",
    question: "Qual seu WhatsApp?",
    placeholder: "99999-9999",
    helperText: "Vamos usar esse número só para falar sobre o seu diagnóstico.",
  },
  {
    id: "email",
    type: "email",
    eyebrow: "Ótimo!",
    question: "Digite seu melhor e-mail:",
    placeholder: "voce@escritorio.com.br",
  },
  {
    id: "areaAtuacao",
    type: "select",
    eyebrow: "Agora, sobre o seu consultório",
    question: "Qual é a área de atuação do seu consultório?",
    // TODO: ajustar as opções pro nicho/cliente antes de ir pra produção.
    options: [
      "Cirurgia Plástica",
      "Dermatologia",
      "Nutrologia",
      "Odontologia",
      "Outro",
    ],
  },
  {
    id: "faturamento",
    type: "select",
    eyebrow: "Última pergunta!",
    question: "Qual faturamento médio mensal do seu consultório?",
    options: [
      "Mais de 2 milhões mensais",
      "Entre 500 mil e 2 milhões mensais",
      "Entre 150 e 500 mil reais mensais",
      "Entre 50 e 150 mil reais mensais",
      "Entre 20 e 50 mil reais mensais",
      "Menos de R$20.000,00 mensal",
    ],
  },
];