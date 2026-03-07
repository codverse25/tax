import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import previewCover from "/preview";
// import previewToc from "/preview";
// import previewChapter from "/preview";

const img = "https://placehold.co/600x400";

const slides = [
  { src: img, label: "Halaman Cover" },
  { src: img, label: "Daftar Isi" },
  { src: img, label: "Isi Bab" },
];

const PreviewSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

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
          <div className="relative overflow-hidden rounded-xl border border-border bg-card glow-soft">
            <div className="flex items-center justify-center p-6 md:p-10 min-h-125">
              <img
                src={slides[current].src}
                alt={slides[current].label}
                className="max-h-120 w-auto rounded-lg shadow-2xl object-contain transition-opacity duration-300"
              />
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-foreground hover:bg-secondary transition-colors backdrop-blur-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-foreground hover:bg-secondary transition-colors backdrop-blur-sm"
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
                  className={`h-2 rounded-full transition-all ${
                    i === current
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30"
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
