import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm">
            {new Date().getFullYear()} TAX — Template Academic Xpress UNIRA
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Dibuat oleh{" "}
          <a
            href="https://dcnunira.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            DCN UNIRA
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
