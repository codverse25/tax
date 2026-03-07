import type { Route } from "./+types/home";
import Welcome from "../welcome/welcome";

export function meta({ }: Route.MetaArgs) {
  const title = "TAX - Template Academic Xpress";
  const description = "Platform template akademik modern untuk mahasiswa UNIRA. Buat laporan, proposal, dan dokumen akademik dengan cepat menggunakan template profesional yang telah terverifikasi.";
  const url = "https://tax.dcnunira.dev";
  const image = "https://tax.dcnunira.dev/og-image.png";

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: "template akademik, UNIRA, laporan, proposal, mahasiswa, akademik, dokumen, TAX, CodeCamp, template laporan, template proposal" },
    { name: "author", content: "Team DCN UNIRA" },
    { name: "robots", content: "index, follow" },
    { name: "theme-color", content: "#8b5cf6" },

    { tagName: "link", rel: "canonical", href: url },

    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:site_name", content: "TAX UNIRA" },
    { property: "og:locale", content: "id_ID" },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: url },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:creator", content: "@dcn.unira" },

    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "apple-mobile-web-app-title", content: "TAX" },
    { name: "msapplication-TileColor", content: "#8b5cf6" },
  ];
}

export default function Home() {
  return <Welcome />;
}
