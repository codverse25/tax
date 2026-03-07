// app/components/ThemeToggle.tsx
import { useTheme } from "~/providers/theme";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { toggleTheme, resolvedTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className="h-9 w-9 animate-pulse rounded-md bg-muted" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary text-secondary-foreground ring-offset-background transition-all hover:bg-muted hover:glow-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun
        className={`absolute h-4 w-4 transition-all ${
          resolvedTheme === "dark"
            ? "scale-0 rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all ${
          resolvedTheme === "dark"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}

export function ThemeSwitch() {
  const { toggleTheme, resolvedTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className="h-6 w-11 animate-pulse rounded-full bg-muted" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2${
        resolvedTheme === "dark" ? "bg-primary" : "bg-input"
      }`}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
          resolvedTheme === "dark" ? "translate-x-6" : "translate-x-1"
        }`}
      >
        {resolvedTheme === "dark" ? (
          <Moon className="h-4 w-4 p-0.5 text-primary" />
        ) : (
          <Sun className="h-4 w-4 p-0.5 text-muted-foreground" />
        )}
      </span>
    </button>
  );
}
