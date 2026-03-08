import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Send,
  User,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { useInView } from "~/lib/use-in-view";
import { useToast } from "~/components/Toaster";

const API = "/api/feedback";

interface Feedback {
  timestamp: string;
  nama: string;
  pesan: string;
}

function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins || 1} menit lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} hari lalu`;
  return new Date(isoString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function FeedbackCard({
  feedback,
  index,
  inView,
}: {
  feedback: Feedback;
  index: number;
  inView: boolean;
}) {
  return (
    <div
      className="rounded-xl border border-border bg-card p-5 space-y-3"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.4s ease ${index * 80}ms, transform 0.4s ease ${index * 80}ms`,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 shrink-0">
            <User className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground">
            {feedback.nama}
          </span>
        </div>
        <span className="text-xs text-muted-foreground shrink-0">
          {timeAgo(feedback.timestamp)}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        "{feedback.pesan}"
      </p>
    </div>
  );
}

const FeedbackSection = () => {
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [fetchError, setFetchError] = useState(false);
  const { ref: sectionRef, inView } = useInView<HTMLDivElement>();
  const { showToast } = useToast();
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!inView || fetchedRef.current) return;
    fetchedRef.current = true;

    fetch(API)
      .then((r) => r.json())
      .then((json: { ok: boolean; feedbacks?: Feedback[] }) => {
        if (json.ok && json.feedbacks) setFeedbacks(json.feedbacks);
        else setFetchError(true);
      })
      .catch(() => setFetchError(true));
  }, [inView]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pesan.trim() || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama: nama.trim(), pesan: pesan.trim() }),
      });
      const json = (await res.json()) as { ok: boolean };
      if (json.ok) {
        setStatus("success");
        setNama("");
        setPesan("");
        showToast("Feedback terkirim! Terima kasih 🙏");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section
      id="feedback"
      className="py-16 sm:py-24 px-4 sm:px-6 border-t border-border"
    >
      <div ref={sectionRef} className="mx-auto max-w-4xl">
        {/* Header */}
        <div
          className="text-center mb-10 sm:mb-14 space-y-3"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs text-muted-foreground">
            <MessageSquare className="h-3.5 w-3.5 text-primary" />
            Feedback & Saran
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Apa kata <span className="text-gradient">pengguna</span>?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Punya saran atau masukan? Tuliskan di sini kami baca semuanya.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* ── Form ── */}
          <div
            className="space-y-4"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="feedback-nama"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Nama{" "}
                  <span className="text-muted-foreground/50 normal-case font-normal">
                    (opsional)
                  </span>
                </label>
                <input
                  id="feedback-nama"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Anonim"
                  maxLength={60}
                  className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="feedback-pesan"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Pesan <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="feedback-pesan"
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  placeholder="Tulis feedback atau saran kamu di sini..."
                  rows={4}
                  maxLength={500}
                  required
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
                <p className="text-xs text-muted-foreground/60 text-right tabular-nums">
                  {pesan.length}/500
                </p>
              </div>

              <Button
                type="submit"
                variant="hero"
                className="w-full gap-2"
                disabled={status === "loading" || !pesan.trim()}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Mengirim...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle className="h-4 w-4" /> Terkirim!
                  </>
                ) : status === "error" ? (
                  <>
                    <AlertCircle className="h-4 w-4" /> Gagal. Coba lagi
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Kirim Feedback
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground/60 text-center">
              Feedback akan ditampilkan setelah moderasi oleh tim kami.
            </p>
          </div>

          {/* ── Feedback List ── */}
          <div className="space-y-4">
            {fetchError ? (
              <div className="rounded-xl border border-border bg-card/50 p-6 text-center text-sm text-muted-foreground">
                Gagal memuat feedback. Coba refresh halaman.
              </div>
            ) : feedbacks.length === 0 ? (
              <div
                className="rounded-xl border border-border bg-card/50 p-8 text-center space-y-2"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: "opacity 0.5s ease 0.2s",
                }}
              >
                <MessageSquare className="h-8 w-8 text-muted-foreground/40 mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Belum ada feedback yang tampil.
                </p>
                <p className="text-xs text-muted-foreground/60">
                  Jadilah yang pertama! →
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-120 overflow-y-auto custom-scrollbar pr-1">
                {feedbacks.map((fb, i) => (
                  <FeedbackCard
                    key={`${fb.timestamp}-${i}`}
                    feedback={fb}
                    index={i}
                    inView={inView}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
