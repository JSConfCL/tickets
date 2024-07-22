export const getDefaultThemeKey = () => {
  let theme = "dark" as "light" | "dark";

  if (typeof window !== "undefined" && window.localStorage.theme) {
    try {
      theme = JSON.parse(window.localStorage.getItem("theme") || "light") as
        | "light"
        | "dark";
    } catch (error) {
      console.error("Error getting theme from localStorage", error);
    }
  } else if (typeof window !== "undefined") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return theme;
};
