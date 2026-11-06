export interface Testimonial {
  quote: string;
  author: string;
}

// Depoimentos em TEXTO exibidos na seção #depoimentos quando não há vídeos
// (ver lib/videoTestimonials.ts). Só entram depoimentos REAIS e verificáveis.
// Os depoimentos ilustrativos (fictícios) que existiam aqui foram removidos —
// esta LP vai receber depoimentos em vídeo. Com as duas listas vazias, a
// seção não é renderizada e o botão do hero aponta para #metodo.
export const TESTIMONIALS: Testimonial[] = [];
