import { useInView } from "~/lib/use-in-view";

const steps = [
  {
    num: "01",
    title: "Clone atau Download Template",
    code: `# Pilih template yang kamu butuhkan dari halaman Template
# Lalu clone atau download dari GitHub

git clone <url-repository-template>
cd <nama-folder-template>`,
  },
  {
    num: "02",
    title: "Install LaTeX (jika belum)",
    code: `# Ubuntu/Debian
sudo apt install texlive-full

# macOS (via Homebrew)
brew install --cask mactex

# Windows → install MiKTeX atau TeX Live`,
  },
  {
    num: "03",
    title: "Edit Data Identitas & Konten",
    code: `# Buka file identitas, isi data dirimu
nano a0-identitas.tex

# Edit setiap bab sesuai kebutuhan
# Masukkan gambar ke folder gambar/
# Tambah referensi di file pustaka.bib`,
  },
  {
    num: "04",
    title: "Compile ke PDF",
    code: `bash compile.sh
# Output: laporan.pdf ✓

# Atau bisa juga compile manual:
# pdflatex → bibtex → pdflatex × 2`,
  },
];

const GuideSection = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="panduan"
      className="py-16 sm:py-24 px-4 sm:px-6 border-t border-border"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Cara Penggunaan
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Empat langkah sederhana untuk semua template TAX.
          </p>
        </div>

        <div ref={ref} className="relative space-y-6 sm:space-y-8">
          {/* Vertical connector line */}
          <div
            className="absolute left-5 sm:left-6 top-10 bottom-10 w-px bg-linear-to-b from-primary/40 via-primary/20 to-transparent"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <div
              key={step.num}
              className="flex gap-4 sm:gap-6"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
              }}
            >
              {/* Step number — sits on top of the connector line */}
              <div className="relative z-10 shrink-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-base sm:text-lg font-mono ring-4 ring-background">
                {step.num}
              </div>
              <div className="flex-1 min-w-0 space-y-2 sm:space-y-3 pt-1">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <div className="code-block p-3 sm:p-4 hover:border-primary/30 transition-colors">
                  <pre className="text-xs sm:text-sm leading-relaxed overflow-x-auto">
                    <code className="text-muted-foreground">{step.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuideSection;
