export type StepId = "nome" | "whatsapp" | "areaAtuacao" | "faturamento";
export type Answers = Record<StepId, string>;
export const EMPTY_ANSWERS: Answers = {
  nome: "",
  whatsapp: "",
  areaAtuacao: "",
  faturamento: "",
};

interface BaseStep { id: StepId; eyebrow: string; question: string; }
export interface TextStep extends BaseStep {
  type: "text" | "email" | "tel";
  placeholder: string;
  helperText?: string;
}
export interface SelectStep extends BaseStep { type: "select"; placeholder: string; options: string[]; }
export type Step = TextStep | SelectStep;

export const STEPS: Step[] = [
  { id: "nome", type: "text", eyebrow: "Bom ter você aqui!", question: "Nome", placeholder: "Digite sua resposta..." },
  { id: "whatsapp", type: "tel", eyebrow: "Perfeito!", question: "WhatsApp", placeholder: "(61) 99123-4567", helperText: "Vamos usar esse número só para falar sobre o seu diagnóstico." },
  {
    id: "areaAtuacao",
    type: "select",
    eyebrow: "Agora, sobre o seu consultório",
    question: "Área de atuação do consultório",
    placeholder: "Selecione uma área de atuação",
    options: ["Cirurgia Plástica", "Dermatologia", "Nutrologia", "Odontologia", "Outro"],
  },
  {
    id: "faturamento",
    type: "select",
    eyebrow: "Última pergunta!",
    question: "Faturamento médio mensal do consultório",
    placeholder: "Selecione um faturamento mensal",
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
