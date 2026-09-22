export type StepId = "nome" | "whatsapp";

export type Answers = Record<StepId, string>;

export const EMPTY_ANSWERS: Answers = {
  nome: "",
  whatsapp: "",
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
];
