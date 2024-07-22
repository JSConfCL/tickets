import { useLocalStorage } from "@uidotdev/usehooks";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { getDefaultThemeKey } from "~/rootHelpers";

export function ThemeSwitcher() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">(
    "theme",
    getDefaultThemeKey(),
  );

  const themes = [
    {
      name: "Light",
      type: "light" as const,
    },
    {
      name: "Dark",
      type: "dark" as const,
    },
  ];

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <DropdownMenu>
      <Button
        variant="ghost"
        size="icon"
        onClick={(el) => {
          el.preventDefault();
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        {theme === "dark" && (
          <Moon className="size-[1.2rem] text-foreground transition-all" />
        )}
        {theme === "light" && (
          <Sun className="size-[1.2rem] text-foreground transition-all" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
      <DropdownMenuContent align="end">
        {themes.map(({ name, type }) => (
          <DropdownMenuItem
            key={name}
            className="cursor-pointer"
            onClick={() => {
              setTheme(type);
            }}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
