import type { Answers } from "./steps";

const DESQUALIFYING_FATURAMENTO = "Menos de R$20.000,00 mensal";

export function isQualified(answers: Answers): boolean {
  return answers.faturamento !== DESQUALIFYING_FATURAMENTO;
}
