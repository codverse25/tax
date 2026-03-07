import { data } from "react-router";
import type { Route } from "./+types/api.feedback";

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL ?? "";

/** Apps Script mengembalikan 302 redirect setelah menerima POST.
 *  Redirect pertama diikuti dengan GET (HTTP standar untuk 302),
 *  karena Apps Script memproses POST sebelum redirect. */
async function appsScriptFetch(
    url: string,
    init?: RequestInit,
    depth = 0
): Promise<Response> {
    if (depth > 5) throw new Error("Too many redirects");
    const res = await fetch(url, { ...init, redirect: "manual" });
    if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get("location");
        if (!location) throw new Error("Redirect tanpa Location header");
        // Setelah redirect, gunakan GET tanpa body (standar 302)
        return appsScriptFetch(location, { method: "GET" }, depth + 1);
    }
    return res;
}

async function parseJson(res: Response): Promise<unknown> {
    const text = await res.text();
    try {
        return JSON.parse(text);
    } catch {
        throw new Error(`Apps Script tidak mengembalikan JSON. Status: ${res.status}. Body: ${text.slice(0, 200)}`);
    }
}

// ── GET /api/feedback ─────────────────────────────────────────────────────────
export async function loader(_args: Route.LoaderArgs) {
    if (!APPS_SCRIPT_URL) {
        return data(
            { ok: false, error: "APPS_SCRIPT_URL belum di-set di .env", feedbacks: [] },
            { status: 503 }
        );
    }

    try {
        const res = await appsScriptFetch(APPS_SCRIPT_URL, { method: "GET" });
        const json = (await parseJson(res)) as { ok: boolean; data?: unknown[]; error?: string };

        if (!json.ok) {
            return data(
                { ok: false, error: json.error ?? "Apps Script error", feedbacks: [] },
                { status: 502 }
            );
        }

        return data({ ok: true, feedbacks: json.data ?? [] });
    } catch (err) {
        console.error("[api/feedback GET]", err);
        return data({ ok: false, error: String(err), feedbacks: [] }, { status: 502 });
    }
}

// ── POST /api/feedback ────────────────────────────────────────────────────────
export async function action({ request }: Route.ActionArgs) {
    if (!APPS_SCRIPT_URL) {
        return data(
            { ok: false, error: "APPS_SCRIPT_URL belum di-set di .env" },
            { status: 503 }
        );
    }

    try {
        const body = (await request.json()) as { nama?: string; pesan?: string };
        const pesan = (body.pesan ?? "").trim();

        if (!pesan) {
            return data({ ok: false, error: "Pesan tidak boleh kosong." }, { status: 400 });
        }

        // Kirim ke Apps Script — ia akan memproses doPost lalu redirect 302.
        // Jika tidak ada exception, data sudah tersimpan di Sheet.
        await appsScriptFetch(APPS_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nama: (body.nama ?? "").trim(), pesan }),
        });

        // Data tersimpan — langsung kembalikan success tanpa parsing redirect response
        return data({ ok: true });
    } catch (err) {
        console.error("[api/feedback POST]", err);
        return data({ ok: false, error: String(err) }, { status: 500 });
    }
}
