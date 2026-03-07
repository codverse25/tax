import { Download, Github, Clock, FileText, GraduationCap } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

const templates = [
  {
    icon: FileText,
    title: "Laporan Kerja Praktik",
    desc: "Template lengkap laporan KP untuk mahasiswa Teknik Informatika UNIRA. Sesuai format resmi dengan struktur modular.",
    tags: ["LaTeX", "KP", "TI UNIRA"],
    status: "available" as const,
    repoUrl:
      "https://github.com/CodeCampUnira/Template-laporan-kerja-praktik-TI-unira",
    downloadUrl:
      "https://github.com/CodeCampUnira/Template-laporan-kerja-praktik-TI-unira/archive/refs/heads/main.zip",
  },
  {
    icon: GraduationCap,
    title: "Laporan Skripsi",
    desc: "Template laporan skripsi untuk mahasiswa Teknik Informatika UNIRA. Sedang dalam pengembangan oleh tim CodeCampUnira.",
    tags: ["LaTeX", "Skripsi", "TI UNIRA"],
    status: "coming_soon" as const,
    repoUrl: null,
    downloadUrl: null,
  },
];

const TemplatesSection = () => {
  return (
    <section id="templates" className="py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Template Tersedia
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Koleksi template LaTeX resmi untuk mahasiswa Teknik Informatika
            Universitas Madura.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {templates.map((t) => (
            <div
              key={t.title}
              className={`rounded-xl border bg-card p-8 space-y-5 transition-all ${
                t.status === "available"
                  ? "border-primary/30 glow-soft"
                  : "border-border opacity-75"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <t.icon className="h-6 w-6 text-primary" />
                </div>
                {t.status === "available" ? (
                  <Badge className="bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
                    Tersedia
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="h-3 w-3" />
                    Segera Hadir
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {t.status === "available" ? (
                <div className="flex gap-3 pt-2">
                  <a
                    href={t.downloadUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="hero" size="sm" className="gap-2">
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </Button>
                  </a>
                  <a
                    href={t.repoUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="heroOutline" size="sm" className="gap-2">
                      <Github className="h-3.5 w-3.5" />
                      GitHub
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="pt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled
                    className="gap-2 cursor-not-allowed"
                  >
                    <Clock className="h-3.5 w-3.5" />
                    Coming Soon
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
