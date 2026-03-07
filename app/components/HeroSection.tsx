import { Button } from "~/components/ui/button";
import { ArrowDown, Github } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient pt-16">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            by DCN UNIRA
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            <span className="text-gradient">TAX</span>
            <br />
            <span className="text-foreground text-3xl lg:text-4xl font-medium">
              Template Academic Xpress
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Koleksi template LaTeX akademik untuk mahasiswa Teknik Informatika
            Universitas Madura. Mulai dari laporan Kerja Praktik hingga Skripsi,
            siap pakai dan sesuai format resmi.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="#templates">
              <Button variant="hero" size="lg" className="gap-2">
                <ArrowDown className="h-4 w-4" />
                Lihat Template
              </Button>
            </a>
            <a
              href="https://github.com/CodeCampUnira"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="heroOutline" size="lg" className="gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </a>
          </div>

          {/* Quick stats */}
          <div className="flex justify-center gap-8 pt-8 border-t border-border mt-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">2</p>
              <p className="text-xs text-muted-foreground">Template</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">LaTeX</p>
              <p className="text-xs text-muted-foreground">Berbasis</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">TI</p>
              <p className="text-xs text-muted-foreground">UNIRA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
