import { z } from "zod"
import { deepmerge } from "deepmerge-ts"
import type { PartialDeep } from "type-fest"
import * as schemas from "./schemas"

const MoleskinConfigSchema = z.object({
  info: schemas.InfoConfigSchema,
  css: schemas.CssConfigSchema,
})

export type MoleskinConfig = z.infer<typeof MoleskinConfigSchema>;

const defaultConfig: MoleskinConfig = {
  info: {
    description: "Your personal web journal",
    iconUrl: "https://em-content.zobj.net/source/apple/391/pencil_270f-fe0f.png",
    title: "Moleskin",
  },
  css: {
    colors: {
      dark: {
        accent: "#F1F3F6",
        background: "#191B20",
        link: "#a2a2ff",
        textPrimary: "#FFFFFF",
        textSecondary: "#B7B9BE",
      },
      light: {
        accent: "#B7B9BE",
        background: "#FFFFFF",
        link: "#4242ff",
        textPrimary: "#2A2E38",
        textSecondary: "#91969e",
      },
    },
    typography: {
      buttons: {
        family: "sans-serif",
        size: "clamp(0.8rem, calc(.5vw + 0.8rem), 1rem)",
      },
      headings: {
        h1: {
          family: "sans-serif",
          size: "clamp(1.5rem, calc(.5vw + 1.5rem), 1.5rem)",
          weight: 500,
        },
        h2: {
          family: "Georgia, serif",
          size: "clamp(1.25rem, calc(.5vw + 1.25rem), 1.5rem)",
          weight: 500,
        },
      },
      links: {
        decoration: "underline",
      },
      paragraphs: {
        family: "Georgia, serif",
        size: "clamp(0.9rem, calc(.5vw + 0.9rem), 1.1rem)",
        weight: 500,
      },
      subtext: {
        family: "sans-serif",
        size: "smaller",
        weight: 300,
      },
    },
    visual: {
      borderRadius: 5,
      borderSize: 1,
      borderStyle: "solid",
    }
  },
}

export function defineConfig(config: PartialDeep<MoleskinConfig> = {}): MoleskinConfig {
  const mergedConfig = deepmerge(defaultConfig, config);
  return MoleskinConfigSchema.parse(mergedConfig)
}


