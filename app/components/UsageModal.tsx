"use client";

import { useState } from "react";
import { X, Monitor, Apple, Terminal, Globe, Copy, Check } from "lucide-react";
import { Button } from "~/components/ui/button";

type OS = "windows" | "macos" | "linux" | "overleaf";

const osOptions: { id: OS; label: string; icon: React.ElementType }[] = [
  { id: "windows", label: "Windows", icon: Monitor },
  { id: "macos", label: "macOS", icon: Apple },
  { id: "linux", label: "Linux", icon: Terminal },
  { id: "overleaf", label: "Overleaf", icon: Globe },
];

interface Step {
  title: string;
  commands?: string[];
  notes?: string;
  link?: { label: string; url: string };
}

const guide: Record<OS, { steps: Step[] }> = {
  windows: {
    steps: [
      {
        title: "Install MikTeX",
        notes: 'Pilih "For All Users" dan aktifkan opsi "Always install missing packages".',
        link: { label: "Download MikTeX", url: "https://miktex.org/download" },
      },
      {
        title: "Install TeXstudio",
        link: { label: "Download TeXstudio", url: "https://www.texstudio.org/" },
      },
      {
        title: "Update MikTeX",
        notes: "Buka MikTeX Console, lalu klik Check for updates.",
      },
      {
        title: "Buka & Compile Template",
        notes: "Clone/unduh repositori, buka laporan.tex di TeXstudio, lalu klik Build & View.",
      },
    ],
  },
  macos: {
    steps: [
      {
        title: "Install MacTeX",
        commands: ["brew install --cask mactex"],
        link: { label: "Atau download manual", url: "https://www.tug.org/mactex/" },
      },
      {
        title: "Install VS Code + LaTeX Workshop",
        notes: "Buka VS Code, cari ekstensi LaTeX Workshop dan install.",
        link: { label: "Download VS Code", url: "https://code.visualstudio.com/" },
      },
      {
        title: "Compile Template",
        commands: ["cd Project/", "./compile.sh"],
        notes: "Atau gunakan Ctrl+Alt+B di dalam VS Code.",
      },
    ],
  },
  linux: {
    steps: [
      {
        title: "Install TeX Live",
        commands: ["sudo apt-get update", "sudo apt-get install texlive-full"],
      },
      {
        title: "Install Editor (pilih salah satu)",
        commands: [
          "# TeXstudio",
          "sudo apt-get install texstudio",
          "",
          "# VS Code",
          "sudo snap install code --classic",
        ],
      },
      {
        title: "Clone & Compile",
        commands: [
          "git clone [repository-url]",
          "cd Project/",
          "./compile.sh",
        ],
      },
    ],
  },
  overleaf: {
    steps: [
      {
        title: "Download Template",
        notes: "Unduh file ZIP template dari repositori GitHub.",
      },
      {
        title: "Upload ke Overleaf",
        notes: 'Login ke Overleaf, klik "New Project" → "Upload Project", lalu upload file ZIP.',
        link: { label: "Buka Overleaf", url: "https://www.overleaf.com" },
      },
      {
        title: "Set Main Document",
        notes: "Di menu Overleaf, set main document ke laporan.tex.",
      },
      {
        title: "Compile",
        notes: "Klik tombol Compile (hijau) untuk melihat hasilnya.",
      },
    ],
  },
};

interface UsageModalProps {
  open: boolean;
  onClose: () => void;
  templateTitle: string;
}

function CodeBlock({ lines }: { lines: string[] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg bg-muted/60 border border-border mt-2 group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        title="Copy"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <pre className="text-xs p-4 pr-10 overflow-x-auto font-mono leading-relaxed">
        {lines.filter((l) => l !== "").map((line, i) =>
          line.startsWith("#") ? (
            <span key={i} className="text-muted-foreground block">
              {line}{"\n"}
            </span>
          ) : (
            <span key={i} className="text-primary block">
              {line}{"\n"}
            </span>
          )
        )}
      </pre>
    </div>
  );
}

export default function UsageModal({ open, onClose, templateTitle }: UsageModalProps) {
  const [activeOS, setActiveOS] = useState<OS>("windows");

  if (!open) return null;

  const { steps } = guide[activeOS];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-bold text-foreground">Cara Penggunaan</h2>
            <p className="text-sm text-muted-foreground mt-0.5">{templateTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* OS Tabs */}
        <div className="flex gap-1 p-4 pb-0">
          {osOptions.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveOS(id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeOS === id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Steps */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              {/* Step number */}
              <div className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold mt-0.5">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{step.title}</p>
                {step.notes && (
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.notes}</p>
                )}
                {step.commands && <CodeBlock lines={step.commands} />}
                {step.link && (
                  <a
                    href={step.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs text-primary hover:underline underline-offset-2"
                  >
                    → {step.link.label}
                  </a>
                )}
              </div>
            </div>
          ))}

          {activeOS === "overleaf" && (
            <p className="text-xs text-muted-foreground bg-secondary/50 rounded-lg p-3 border border-border">
              ⚠️ Script <code className="font-mono">compile.sh</code> tidak tersedia di Overleaf. Gunakan compiler bawaan Overleaf.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 pt-0">
          <Button
            variant="heroOutline"
            size="sm"
            className="w-full"
            onClick={onClose}
          >
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
}
