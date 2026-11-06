export interface VideoTestimonial {
  // Nome de quem fala no vídeo. Se vazio, o card mostra só a company.
  name: string;
  company?: string;
  // Frase de resultado exibida no card, acima do nome. Opcional.
  highlight?: string;
  // URL do .mp4 (Vercel Blob: https://<id>.public.blob.vercel-storage.com/...) ou arquivo em /public/videos/.
  videoSrc: string;
  // Capa do card (frame exibido antes do play). Opcional.
  poster?: string;
}

// Depoimentos em vídeo (formato vertical 9:16) da seção #depoimentos.
// Com a lista vazia, a seção some e o hero/footer deixam de apontar para #depoimentos.
export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    name: "",
    company: "Dona de clínica · cliente Alpha", // TODO nome real da clínica
    highlight: "De 150 para +350 pacientes em menos de 3 meses",
    videoSrc: "https://vtnasmqf5c8sv6ff.public.blob.vercel-storage.com/Videos/depoimento-med-1124.mp4",
    poster: "https://vtnasmqf5c8sv6ff.public.blob.vercel-storage.com/Videos/depoimento-med-1124-poster.jpg",
  },
  {
    name: "",
    company: "Dona de clínica · cliente Alpha", // TODO nome real da clínica
    videoSrc: "https://vtnasmqf5c8sv6ff.public.blob.vercel-storage.com/Videos/depoimento-med-1123.mp4",
    poster: "https://vtnasmqf5c8sv6ff.public.blob.vercel-storage.com/Videos/depoimento-med-1123-poster.jpg",
  },
];
