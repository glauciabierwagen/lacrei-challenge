export const theme = {
  colors: {
    primary: "#087b6b",
    primaryHover: "#006554",
    text: "#101010",
    muted: "#575757",
    surface: "#fafbeb",
    white: "#fefefe",
    border: "#c5d8ce",
    accent: "#c8d533",
    focus: "#7b3600",
  },
  space: { xs: "0.5rem", sm: "0.75rem", md: "1rem", lg: "1.5rem", xl: "2rem", xxl: "3rem", section: "5rem" },
  radii: { sm: "0.75rem", md: "1.5rem", lg: "2.5rem", pill: "999px" },
  breakpoints: { tablet: "48rem", desktop: "64rem" },
  layout: { maxWidth: "78rem", target: "3rem" },
  fonts: { body: '"Nunito", Arial, Helvetica, sans-serif', heading: '"Poppins", "Nunito", sans-serif' },
} as const;

export type AppTheme = typeof theme;