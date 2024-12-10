import { z } from "zod"

const ColorThemeSchema = z.object({
  accent: z.string(),
  background: z.string(),
  link: z.string(),
  textPrimary: z.string(),
  textSecondary: z.string(),
});

const ColorSchema = z.object({
  dark: ColorThemeSchema.default({
    accent: "#F1F3F6",
    background: "#191B20",
    link: "#a2a2ff",
    textPrimary: "#FFFFFF",
    textSecondary: "#B7B9BE",
  }),
  light: ColorThemeSchema.default({
    accent: "#B7B9BE",
    background: "#FFFFFF",
    link: "#4242ff",
    textPrimary: "#2A2E38",
    textSecondary: "#91969e",
  }),
})

const TypographySubSchema = z.object({
  family: z.string(),
  size: z.string(),
  weight: z.optional(z.number()),
})

const LinkSchema = z.object({
  decoration: z.enum(["underline", "none"]).default("underline")
})

const TypographySchema = z.object({
  buttons: TypographySubSchema.default({        
    family: "sans-serif",
    size: "clamp(0.8rem, calc(.5vw + 0.8rem), 1rem)",
  }),
  headings: z.object({
    h1: TypographySubSchema.default({
      family: "sans-serif",
      size: "clamp(1.5rem, calc(.5vw + 1.5rem), 1.5rem)",
      weight: 500,
    }),
    h2: TypographySubSchema.default({
      family: "Georgia, serif",
      size: "clamp(1.25rem, calc(.5vw + 1.25rem), 1.5rem)",
      weight: 500,
    }),
  }),
  links: LinkSchema,
  paragraphs: TypographySubSchema.default({
    family: "Georgia, serif",
    size: "clamp(0.9rem, calc(.5vw + 0.9rem), 1.1rem)",
    weight: 500,
  }), 
  subtext: TypographySubSchema.default({
    family: "sans-serif",
    size: "smaller",
    weight: 300,
  }),
})

const VisualSchema = z.object({
  borderRadius: z.number().default(5),
  borderSize: z.number().default(0),
  borderStyle: z.enum(["dashed", "dotted", "solid", "unset"]).default("unset"),
})

export const CssConfigSchema = z.object({
  colors: ColorSchema,
  typography: TypographySchema,
  visual: VisualSchema,
})

export const InfoConfigSchema = z.object({
  description: z.string().default("Your personal web journal"),
  iconUrl: z.string().default("https://em-content.zobj.net/source/apple/391/pencil_270f-fe0f.png"),
  title: z.string().default("Moleskin"),
})

export type ColorTheme = z.infer<typeof ColorSchema>

