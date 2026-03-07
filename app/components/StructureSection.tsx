import { FileText, Folder, FolderOpen } from "lucide-react";

const files = [
  {
    type: "file",
    name: "laporan.tex",
    desc: "File utama — entry point compile",
  },
  {
    type: "file",
    name: "a0-identitas.tex",
    desc: "Data mahasiswa, dosen, judul",
  },
  {
    type: "file",
    name: "a1-database.hyphenate.tex",
    desc: "Database pemenggalan kata",
  },
  { type: "file", name: "a4-persembahan.tex", desc: "Halaman persembahan" },
  { type: "file", name: "a5-katapengantar.tex", desc: "Kata pengantar" },
  { type: "file", name: "a6-daftarsingkatan.tex", desc: "Daftar singkatan" },
  { type: "file", name: "a7-pustaka.bib", desc: "Database referensi BibTeX" },
  { type: "file", name: "a8-lampiran.tex", desc: "Lampiran" },
  { type: "file", name: "b1-bab1.tex", desc: "BAB I — Pendahuluan" },
  { type: "file", name: "b2-bab2.tex", desc: "BAB II — Tinjauan Pustaka" },
  { type: "file", name: "b3-bab3.tex", desc: "BAB III — Metodologi" },
  { type: "file", name: "b4-bab4.tex", desc: "BAB IV — Hasil & Pembahasan" },
  { type: "file", name: "b5-bab5.tex", desc: "BAB V — Penutup" },
  { type: "file", name: "compile.sh", desc: "Script compile otomatis" },
  { type: "folder", name: "gambar/", desc: "Folder gambar & ilustrasi" },
  { type: "folder", name: "kode/", desc: "Folder source code lampiran" },
  {
    type: "folder",
    name: "untouch/",
    desc: "File format yang tidak perlu diubah",
  },
];

const StructureSection = () => {
  return (
    <section id="struktur" className="py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Struktur File</h2>
          <p className="text-muted-foreground">
            Setiap file memiliki peran yang jelas dan terorganisir.
          </p>
        </div>

        <div className="code-block divide-y divide-border overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3 bg-secondary/50">
            <FolderOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground font-mono">
              Template-laporan-kerja-praktik-TI-unira/
            </span>
          </div>
          {files.map((f) => (
            <div
              key={f.name}
              className="flex items-center gap-3 px-5 py-2.5 hover:bg-secondary/30 transition-colors"
            >
              {f.type === "folder" ? (
                <Folder className="h-4 w-4 text-primary/70 ml-4" />
              ) : (
                <FileText className="h-4 w-4 text-muted-foreground ml-4" />
              )}
              <span className="text-sm font-mono text-foreground min-w-55">
                {f.name}
              </span>
              <span className="text-xs text-muted-foreground">{f.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StructureSection;
