import type { Answers } from "./steps";

const DESQUALIFYING_FATURAMENTO = "Menos de R$20.000,00 mensal";

// Regra de qualificação: só desqualifica quem respondeu a faixa mais baixa
// de faturamento; todas as demais faixas qualificam.
export function isQualified(answers: Answers): boolean {
  return answers.faturamento !== DESQUALIFYING_FATURAMENTO;
}
