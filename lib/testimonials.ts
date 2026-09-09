export interface Testimonial {
  quote: string;
  author: string;
}

// Depoimentos ILUSTRATIVOS (texto e nomes fictícios) para preencher o layout
// durante o desenvolvimento — trocar por depoimentos reais e verificáveis dos
// seus clientes antes de publicar. Um por etapa, cíclico caso haja mais
// etapas que depoimentos.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Antes eu dependia só de indicação. Hoje tenho um fluxo constante de gente entrando em contato interessada nos meus serviços.",
    author: "Rafael Nogueira",
  },
  {
    quote:
      "O que mais me chamou atenção foi a organização: cada lead chega com contexto, e eu já sei se vale a pena ligar antes mesmo de atender.",
    author: "Camila Duarte",
  },
  {
    quote:
      "Levei um tempo pra confiar em marketing pra advocacia, mas o retorno em consultas agendadas me convenceu rápido.",
    author: "Marcos Tavares",
  },
  {
    quote:
      "A equipe entende a dinâmica de um escritório pequeno. Não fiquei preso a um contrato genérico feito pra empresa grande.",
    author: "Juliana Prado",
  },
  {
    quote:
      "Consegui parar de gastar tempo respondendo curioso no WhatsApp. Os leads que chegam já sabem o que procuram.",
    author: "Eduardo Lins",
  },
  {
    quote:
      "Em poucos meses o escritório cresceu o suficiente pra eu pensar em contratar o primeiro associado.",
    author: "Patrícia Alencar",
  },
];
