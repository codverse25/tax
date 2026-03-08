import { Button } from "~/components/ui/button";
import { ArrowDown, Github } from "lucide-react";
import { ParticleCanvas } from "~/components/ParticleCanvas";
import { useInView } from "~/lib/use-in-view";
import { useCounter } from "~/lib/use-counter";
import { useEffect } from "react";

function AnimatedStat({
  target,
  suffix = "",
  label,
  triggered,
}: {
  target: number | null;
  suffix?: string;
  label: string;
  triggered: boolean;
}) {
  const isNumber = target !== null;
  const { value, start } = useCounter(isNumber ? target : 0, 1400);

  useEffect(() => {
    if (triggered && isNumber) start();
  }, [triggered]);

  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-foreground tabular-nums">
        {isNumber ? `${value}${suffix}` : (
          <span className="text-gradient">LaTeX</span>
        )}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

const HeroSection = () => {
  const { ref: statsRef, inView: statsInView } = useInView<HTMLDivElement>({
    threshold: 0.5,
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient pt-10 overflow-hidden">
      {/* Ambient particle background */}
      <ParticleCanvas />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs text-muted-foreground opacity-0"
            style={{ animation: "fade-in-up 0.6s ease forwards 0.1s" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            by DCN UNIRA
          </div>

          {/* Heading */}
          <h1
            className="text-5xl lg:text-7xl font-bold leading-tight opacity-0"
            style={{ animation: "fade-in-up 0.7s ease forwards 0.25s" }}
          >
            <span
              className="text-gradient"
              style={{
                backgroundSize: "200% 200%",
                animation:
                  "fade-in-up 0.7s ease forwards 0.25s, shimmer-gradient 6s ease infinite 1s",
              }}
            >
              TAX
            </span>
            <br />
            <span className="text-foreground text-3xl lg:text-4xl font-medium">
              Template Academic Xpress
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0"
            style={{ animation: "fade-in-up 0.7s ease forwards 0.4s" }}
          >
            Koleksi template LaTeX akademik untuk mahasiswa Informatika
            Universitas Madura. Mulai dari laporan Kerja Praktik hingga Skripsi,
            siap pakai dan sesuai format resmi.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap justify-center gap-4 opacity-0"
            style={{ animation: "fade-in-up 0.7s ease forwards 0.55s" }}
          >
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

          {/* Animated stats */}
          <div
            ref={statsRef}
            className="flex justify-center gap-8 pt-8 border-t border-border mt-8 opacity-0"
            style={{ animation: "fade-in-up 0.7s ease forwards 0.7s" }}
          >
            <AnimatedStat target={2} label="Template" triggered={statsInView} />
            <AnimatedStat target={null} label="Berbasis" triggered={statsInView} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
