import type { ColorTheme } from "./schemas"

export const catppuccin: ColorTheme = {
  // mocha
  dark: {
    accent: "#6c7086", // overlay 0
    background: "#1e1e2e", // base
    link: "#89b4fa", // blue 
    textPrimary: "#cdd6f4", // text
    textSecondary: "#bac2de", // sub text 1
  },
  // latte
  light: {
    accent: "#9ca0b0", // overlay 0
    background: "#eff1f5", // base
    link: "#1e66f5", //blue
    textPrimary: "#4c4f69", // text
    textSecondary: "#6c6f85", // sub text 0
  },
} 

const cobalt2_colors = {
  accent: "#ffc600",
  background: "#193549",
  link: "#0088ff", 
  textPrimary: "#FDFCFF", 
  textSecondary: "#aaa", 
}

export const cobalt2: ColorTheme = {
  dark: cobalt2_colors,
  light: cobalt2_colors,
}

export const solarized: ColorTheme = {
  dark: {
    accent: "#657b83", // base 00
    background: "#002b36", // base 03
    link: "#268bd2", // blue
    textPrimary: "#93a1a1", // base 1
    textSecondary: "#839496", // base 0
  },
  light: {
    accent: "#93a1a1", // base 1 
    background: "#fdf6e3", // base 3
    link: "#268bd2", // blue
    textPrimary: "#586e75", // base 01
    textSecondary: "#839496", // base 0
  },
}
