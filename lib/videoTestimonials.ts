export interface VideoTestimonial {
  // Nome de quem fala no vídeo. Se vazio, o card mostra só a company.
  name: string;
  company?: string;
  // Frase de resultado exibida no card, acima do nome. Opcional.
  highlight?: string;
  // Fonte principal do vídeo (Vercel Blob ou /videos/... em public/).
  videoSrc: string;
  // Cópia local em public/videos/. Usada automaticamente se o videoSrc der erro.
  videoFallback?: string;
  // Capa do card, exibida antes do play (Blob ou local). Opcional.
  poster?: string;
  // Cópia local da capa, usada se o poster não carregar.
  posterFallback?: string;
}

// Depoimentos em vídeo (formato vertical 9:16) da seção #depoimentos.
// Com a lista vazia, a seção some e o hero/footer deixam de apontar para #depoimentos.
// Os arquivos em public/videos/ são o fallback do Blob: não apague.
export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    name: "",
    company: "Dona de clínica · cliente Alpha", // TODO nome real da clínica
    highlight: "De 150 para +350 pacientes em menos de 3 meses",
    videoSrc: "https://vtnasmqf5c8sv6ff.public.blob.vercel-storage.com/Videos/depoimento-med-1124.mp4",
    videoFallback: "/videos/depoimento-med-1124.mp4",
    poster: "https://vtnasmqf5c8sv6ff.public.blob.vercel-storage.com/Videos/depoimento-med-1124-poster.jpg",
    posterFallback: "/videos/depoimento-med-1124-poster.jpg",
  },
  {
    name: "",
    company: "Dona de clínica · cliente Alpha", // TODO nome real da clínica
    videoSrc: "https://vtnasmqf5c8sv6ff.public.blob.vercel-storage.com/Videos/depoimento-med-1123.mp4",
    videoFallback: "/videos/depoimento-med-1123.mp4",
    poster: "https://vtnasmqf5c8sv6ff.public.blob.vercel-storage.com/Videos/depoimento-med-1123-poster.jpg",
    posterFallback: "/videos/depoimento-med-1123-poster.jpg",
  },
];
