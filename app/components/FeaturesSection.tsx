import {
  BookOpen,
  FileCode,
  Layout,
  Settings,
  Layers,
  Zap,
} from "lucide-react";
import { useInView } from "~/lib/use-in-view";

const features = [
  {
    icon: Layout,
    title: "Format Resmi UNIRA",
    desc: "Mengikuti pedoman penulisan akademik Teknik Informatika Universitas Madura.",
  },
  {
    icon: FileCode,
    title: "Berbasis LaTeX",
    desc: "Kualitas tipografi profesional dengan manajemen referensi otomatis via BibTeX.",
  },
  {
    icon: Layers,
    title: "Struktur Modular",
    desc: "Setiap bab dan bagian terpisah dalam file .tex tersendiri untuk kemudahan editing.",
  },
  {
    icon: Settings,
    title: "Compile Otomatis",
    desc: "Script compile untuk build PDF dengan satu perintah tanpa konfigurasi rumit.",
  },
  {
    icon: Zap,
    title: "Cepat & Efisien",
    desc: "Langsung fokus menulis konten tanpa pusing format template mengurus sisanya.",
  },
  {
    icon: BookOpen,
    title: "Multi Template",
    desc: "Tersedia untuk berbagai jenis laporan akademik: KP, Skripsi, dan lainnya.",
  },
];

const FeaturesSection = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="fitur" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Kenapa TAX?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dirancang khusus untuk mahasiswa Informatika UNIRA agar fokus
            menulis konten, bukan format.
          </p>
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-card p-6 space-y-3
                         hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5
                         transition-all duration-300"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms, border-color 0.2s, box-shadow 0.2s, translate 0.2s`,
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
