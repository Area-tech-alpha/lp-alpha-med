export interface VideoTestimonial {
  // Nome de quem fala no vídeo. Se vazio, o card mostra só a company.
  name: string;
  company?: string;
  // Frase de resultado exibida no card, acima do nome. Opcional.
  highlight?: string;
  // Arquivo em public/videos/ (ex.: "/videos/cliente.mp4") ou URL externa de um .mp4.
  videoSrc: string;
  // Capa do card (ex.: "/videos/cliente-poster.jpg"), exibida antes do play. Opcional.
  poster?: string;
}

// Depoimentos em vídeo (formato vertical 9:16) da seção #depoimentos.
// Com a lista vazia, a seção some e o hero/footer deixam de apontar para #depoimentos.
export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    name: "",
    company: "Dona de clínica · cliente Alpha", // TODO nome real da clínica
    highlight: "De 150 para +350 pacientes em menos de 3 meses",
    videoSrc: "/videos/depoimento-med-1124.mp4",
    poster: "/videos/depoimento-med-1124-poster.jpg",
  },
  {
    name: "",
    company: "Dona de clínica · cliente Alpha", // TODO nome real da clínica
    videoSrc: "/videos/depoimento-med-1123.mp4",
    poster: "/videos/depoimento-med-1123-poster.jpg",
  },
];
