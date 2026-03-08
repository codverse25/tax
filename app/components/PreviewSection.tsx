import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import previewCover from "/preview/sampul.png";
import PreviewToc from "/preview/pengesahan.png";
import PreviewChapter from "/preview/pengantar.png";
import DaftarIsi from "/preview/daftarisi.png";

const slides = [
  { src: previewCover, label: "Halaman Cover" },
  { src: PreviewToc, label: "Lembar Pengesahan" },
  { src: PreviewChapter, label: "Kata Pengantar" },
  { src: DaftarIsi, label: "Daftar Isi" },
];

const PreviewSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const containerRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => {
    setDirection("left");
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  }, []);

  const next = useCallback(() => {
    setDirection("right");
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    },
    [prev, next],
  );

  return (
    <section id="preview" className="py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Preview Hasil</h2>
          <p className="text-muted-foreground">
            Tampilan PDF yang dihasilkan dari template ini.
          </p>
        </div>

        <div className="relative">
          {/* Carousel */}
          <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="relative overflow-hidden rounded-xl border border-border bg-card glow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label="Carousel preview dokumen"
            role="region"
          >
            <div className="flex items-center justify-center p-6 md:p-10 min-h-125">
              <img
                key={current}
                src={slides[current].src}
                alt={slides[current].label}
                className="max-h-120 w-auto rounded-lg shadow-2xl object-contain"
                style={{ animation: "fade-in 0.3s ease forwards" }}
              />
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              aria-label="Slide sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-foreground hover:bg-secondary hover:scale-110 transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Slide berikutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-foreground hover:bg-secondary hover:scale-110 transition-all backdrop-blur-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots + label */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-sm font-medium text-foreground">
              {slides[current].label}
            </p>
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;
