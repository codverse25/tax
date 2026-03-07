import { useState } from "react";
import { Link } from "react-router";
import {
    Monitor,
    Apple,
    Terminal,
    Globe,
    Copy,
    Check,
    ArrowLeft,
    ExternalLink,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/panduan.install";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Panduan Instalasi — TAX" },
        {
            name: "description",
            content:
                "Panduan instalasi dan penggunaan template LaTeX TAX untuk Windows, macOS, Linux, dan Overleaf.",
        },
    ];
}

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

const guide: Record<OS, { editor: string; steps: Step[] }> = {
    windows: {
        editor: "MikTeX + TeXstudio",
        steps: [
            {
                title: "Install MikTeX",
                notes:
                    'Pilih "For All Users" saat instalasi dan aktifkan opsi "Always install missing packages" agar package LaTeX terunduh otomatis.',
                link: { label: "Download MikTeX →", url: "https://miktex.org/download" },
            },
            {
                title: "Install TeXstudio",
                notes: "TeXstudio adalah editor LaTeX yang mudah digunakan di Windows.",
                link: {
                    label: "Download TeXstudio →",
                    url: "https://www.texstudio.org/",
                },
            },
            {
                title: "Update MikTeX",
                notes:
                    "Buka MikTeX Console dari Start Menu, lalu klik Check for updates dan install semua update yang tersedia.",
            },
            {
                title: "Clone atau Download Template",
                commands: [
                    "git clone <url-repository-template>",
                    "cd <nama-folder-template>",
                ],
                notes: "Atau download file ZIP langsung dari halaman GitHub.",
            },
            {
                title: "Buka & Compile",
                notes:
                    "Buka file laporan.tex di TeXstudio, lalu klik tombol Build & View (F5) untuk menghasilkan laporan.pdf.",
            },
        ],
    },
    macos: {
        editor: "MacTeX + VS Code",
        steps: [
            {
                title: "Install MacTeX",
                commands: ["brew install --cask mactex"],
                notes: "Atau download installer manual dari situs MacTeX.",
                link: {
                    label: "Download MacTeX →",
                    url: "https://www.tug.org/mactex/",
                },
            },
            {
                title: "Install VS Code",
                link: {
                    label: "Download VS Code →",
                    url: "https://code.visualstudio.com/",
                },
            },
            {
                title: "Install Ekstensi LaTeX Workshop",
                notes:
                    "Di VS Code, buka Extensions (Cmd+Shift+X), cari LaTeX Workshop, lalu klik Install.",
            },
            {
                title: "Clone Template",
                commands: [
                    "git clone <url-repository-template>",
                    "cd <nama-folder-template>",
                ],
            },
            {
                title: "Compile",
                commands: ["cd Project/", "./compile.sh"],
                notes: "Atau gunakan shortcut Ctrl+Alt+B di dalam VS Code.",
            },
        ],
    },
    linux: {
        editor: "TeX Live + TeXstudio / VS Code",
        steps: [
            {
                title: "Install TeX Live",
                commands: [
                    "sudo apt-get update",
                    "sudo apt-get install texlive-full",
                ],
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
                title: "Clone Template",
                commands: [
                    "git clone <url-repository-template>",
                    "cd <nama-folder-template>",
                ],
            },
            {
                title: "Compile",
                commands: ["cd Project/", "./compile.sh"],
                notes: "Script compile.sh akan menghasilkan laporan.pdf secara otomatis.",
            },
        ],
    },
    overleaf: {
        editor: "Browser (tanpa instalasi)",
        steps: [
            {
                title: "Download Template",
                notes:
                    "Unduh file ZIP template dari tombol Download di halaman Template.",
            },
            {
                title: "Upload ke Overleaf",
                notes:
                    'Login ke Overleaf, klik New Project → Upload Project, lalu upload file ZIP yang sudah didownload.',
                link: { label: "Buka Overleaf →", url: "https://www.overleaf.com" },
            },
            {
                title: "Set Main Document",
                notes:
                    "Di panel kiri Overleaf, klik kanan laporan.tex lalu pilih Set as Main File.",
            },
            {
                title: "Compile",
                notes:
                    "Klik tombol Compile (hijau) di pojok kiri atas untuk melihat hasilnya.",
            },
        ],
    },
};

function CodeBlock({ lines }: { lines: string[] }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const text = lines.filter((l) => !l.startsWith("#") && l !== "").join("\n");
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative rounded-xl bg-muted/60 border border-border mt-3 group">
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                title="Copy perintah"
            >
                {copied ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                ) : (
                    <Copy className="h-3.5 w-3.5" />
                )}
            </button>
            <pre className="text-sm p-4 pr-10 overflow-x-auto font-mono leading-relaxed">
                {lines.map((line, i) =>
                    line.startsWith("#") ? (
                        <span key={i} className="text-muted-foreground/60 block">
                            {line}
                            {"\n"}
                        </span>
                    ) : line === "" ? (
                        <span key={i} className="block">
                            {"\n"}
                        </span>
                    ) : (
                        <span key={i} className="text-primary block">
                            {line}
                            {"\n"}
                        </span>
                    )
                )}
            </pre>
        </div>
    );
}

export default function PanduanInstall() {
    const [activeOS, setActiveOS] = useState<OS>("windows");
    const { editor, steps } = guide[activeOS];

    return (
        <div className="min-h-screen bg-background">
            {/* Top bar */}
            <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="mx-auto max-w-4xl px-6 py-4 flex items-center gap-4">
                    <Link to="/">
                        <Button variant="heroOutline" size="sm" className="gap-2">
                            <ArrowLeft className="h-3.5 w-3.5" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-sm font-semibold text-foreground">
                            Panduan Instalasi
                        </h1>
                        <p className="text-xs text-muted-foreground">TAX — Template Academic Xpress</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-6 py-12 space-y-10">
                {/* Header */}
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-foreground">
                        Cara <span className="text-gradient">Penggunaan</span> Template
                    </h2>
                    <p className="text-muted-foreground max-w-2xl leading-relaxed">
                        Panduan instalasi ini berlaku untuk semua template TAX (Laporan KP
                        maupun Skripsi). Langkah-langkahnya sama — yang berbeda hanya
                        template yang digunakan.
                    </p>
                </div>

                {/* OS Switcher */}
                <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Pilih sistem operasi / platform
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {osOptions.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveOS(id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${activeOS === id
                                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                        : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground hover:border-primary/30"
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                {label}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Editor yang direkomendasikan:{" "}
                        <span className="text-foreground font-medium">{editor}</span>
                    </p>
                </div>

                {/* Steps */}
                <div className="space-y-6">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="flex gap-5 p-6 rounded-2xl border border-border bg-card hover:border-primary/20 transition-colors"
                        >
                            {/* Number */}
                            <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm font-mono">
                                {String(i + 1).padStart(2, "0")}
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                                <h3 className="font-semibold text-foreground">{step.title}</h3>
                                {step.notes && (
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {step.notes}
                                    </p>
                                )}
                                {step.commands && <CodeBlock lines={step.commands} />}
                                {step.link && (
                                    <a
                                        href={step.link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline underline-offset-2"
                                    >
                                        {step.link.label}
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Overleaf note */}
                {activeOS === "overleaf" && (
                    <div className="rounded-xl border border-border bg-secondary/30 p-4 text-sm text-muted-foreground">
                        ⚠️ Script{" "}
                        <code className="font-mono text-foreground bg-muted px-1.5 py-0.5 rounded">
                            compile.sh
                        </code>{" "}
                        tidak tersedia di Overleaf. Gunakan compiler bawaan Overleaf yang
                        sudah terintegrasi langsung di browser.
                    </div>
                )}

                {/* Back to templates CTA */}
                <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <p className="font-semibold text-foreground">Siap mulai?</p>
                        <p className="text-sm text-muted-foreground">
                            Download template yang kamu butuhkan dari halaman utama.
                        </p>
                    </div>
                    <Link to="/#templates">
                        <Button variant="hero" size="sm" className="gap-2 shrink-0">
                            Lihat Template
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
