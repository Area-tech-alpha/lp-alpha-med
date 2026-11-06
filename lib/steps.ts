export type StepId = "nome" | "whatsapp" | "empresa" | "areaAtuacao" | "faturamento";
export type Answers = Record<StepId, string>;
export const EMPTY_ANSWERS: Answers = {
  nome: "",
  whatsapp: "",
  empresa: "",
  areaAtuacao: "",
  faturamento: "",
};

// Tipos de campo — iguais nas 3 LPs (o components/LeadForm.tsx é o mesmo).
interface BaseStep {
  id: StepId;
  question: string;
  placeholder: string;
  eyebrow?: string;
}
export interface TextStep extends BaseStep {
  type: "text" | "email" | "tel";
  helperText?: string;
  autoComplete?: string;
}
export interface SelectStep extends BaseStep {
  type: "select";
  options: string[];
}
export type Step = TextStep | SelectStep;

export const STEPS: Step[] = [
  { id: "nome", type: "text", eyebrow: "Bom ter você aqui!", question: "Nome", placeholder: "Digite sua resposta...", autoComplete: "name" },
  { id: "whatsapp", type: "tel", eyebrow: "Perfeito!", question: "WhatsApp", placeholder: "(61) 99123-4567", helperText: "Vamos usar esse número só para falar sobre o seu diagnóstico.", autoComplete: "tel-national" },
  {
    id: "empresa",
    type: "text",
    eyebrow: "Quase lá!",
    question: "Qual o nome da sua empresa?",
    placeholder: "Digite o nome da sua empresa...",
    autoComplete: "organization",
  },
  {
    id: "areaAtuacao",
    type: "select",
    eyebrow: "Agora, sobre o seu consultório",
    question: "Área de atuação do consultório",
    placeholder: "Selecione a área",
    options: ["Cirurgia Plástica", "Dermatologia", "Nutrologia", "Odontologia", "Outro"],
  },
  {
    id: "faturamento",
    type: "select",
    eyebrow: "Última pergunta!",
    question: "Faturamento médio mensal do consultório",
    placeholder: "Selecione o faturamento",
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
