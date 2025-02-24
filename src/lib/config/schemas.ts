import { z } from "zod"

const ColorThemeSchema = z.object({
  accent: z.string(),
  background: z.string(),
  link: z.string(),
  shadow: z.optional(z.string()),
  textPrimary: z.string(),
  textSecondary: z.string(),
});

const ColorSchema = z.object({
  dark: ColorThemeSchema.default({
    accent: "#5b5d62",
    background: "#191B20",
    link: "#a2a2ff",
    shadow: "#ffffff36",
    textPrimary: "#FFFFFF",
    textSecondary: "#5b5d62",
  }),
  light: ColorThemeSchema.default({
    accent: "#B7B9BE",
    background: "#FFFFFF",
    link: "#4242ff",
    shadow: "#0000002e",
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

const GoogleFontSchema = z.object({
  name: z.string(),
  styles: z.optional(z.array(z.enum(["italic", "bold"]))),
})

const FontSchema = z.object({
  google: z.array(GoogleFontSchema).default([
    { name: "Instrument Serif", styles: ["italic"] },
    { name: "Roboto" }
  ]), 
});

export type Font = z.infer<typeof FontSchema>

const TypographySchema = z.object({
  buttons: TypographySubSchema.default({        
    family: "Roboto, sans-serif",
    size: "clamp(0.8rem, calc(.5vw + 0.8rem), 1rem)",
  }),
  fonts: FontSchema,
  headings: z.object({
    h1: TypographySubSchema.default({
      family: "Instrument Serif, serif",
      size: "clamp(1.5rem, calc(.5vw + 1.5rem), 2rem)",
      weight: 500,
    }),
    h2: TypographySubSchema.default({
      family: "Instrument Serif, serif",
      size: "clamp(1.5rem, calc(5cqi + 1.5rem), 3rem)",
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
    family: "Roboto, sans-serif",
    size: "smaller",
    weight: 300,
  }),
})

const VisualSchema = z.object({
  borderRadius: z.number().default(5),
  borderSize: z.number().default(1),
  borderStyle: z.enum(["dashed", "dotted", "solid", "unset"]).default("solid"),
  boxShadowX: z.number().default(0),
  boxShadowY: z.number().default(0),
  boxShadowSpread: z.number().default(5),
})

export const CssConfigSchema = z.object({
  colors: ColorSchema,
  typography: TypographySchema,
  visual: z.object({
    box: VisualSchema.default({
      borderRadius: 5,
      borderSize: 0,
      borderStyle: "unset",
      boxShadowX: 0,
      boxShadowY: 0,
      boxShadowSpread: 5,
    }),
    controls: VisualSchema.default({
      borderRadius: 5,
      borderSize: 1,
      borderStyle: "solid",
      boxShadowX: 0,
      boxShadowY: 0,
      boxShadowSpread: 0,
    }),
  }),
})

export const InfoConfigSchema = z.object({
  description: z.string().default("Your personal web journal"),
  iconUrl: z.string().default("https://fav.farm/%E2%9C%8F%EF%B8%8F"),
  title: z.string().default("Moleskin"),
})

export type ColorTheme = z.infer<typeof ColorSchema>

