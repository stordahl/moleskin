import { z } from "zod"

const ColorThemeSchema = z.object({
  accent: z.string(),
  background: z.string(),
  link: z.string(),
  textPrimary: z.string(),
  textSecondary: z.string(),
});

const ColorSchema = z.object({
  dark: ColorThemeSchema,
  light: ColorThemeSchema,
})

const TypographySubSchema = z.object({
  family: z.string(),
  size: z.string(),
  weight: z.optional(z.number()),
})

const LinkSchema = z.object({
  decoration: z.enum(["underline", "none"])
})

const TypographySchema = z.object({
  buttons: TypographySubSchema,
  headings: z.object({
    h1: TypographySubSchema,
    h2: TypographySubSchema,
  }),
  links: LinkSchema,
  paragraphs: TypographySubSchema, 
  subtext: TypographySubSchema,
})

const VisualSchema = z.object({
  borderRadius: z.number(),
  borderSize: z.number(),
  borderStyle: z.enum(["dashed", "dotted", "solid"]),
})

export const CssConfigSchema = z.object({
  colors: ColorSchema,
  typography: TypographySchema,
  visual: VisualSchema,
})

export const InfoConfigSchema = z.object({
  description: z.string(),
  iconUrl: z.string(),
  title: z.string(),
})

export type ColorTheme = z.infer<typeof ColorSchema>

