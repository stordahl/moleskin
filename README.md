![Moleskin: your personal web journal](https://github.com/user-attachments/assets/e6486833-83ed-42e6-93fa-08432ccacc2d#gh-dark-mode-only)
![Moleskin: your personal web journal](https://github.com/user-attachments/assets/60fa1695-a90e-410f-8583-abbb56d14289#gh-light-mode-only)

## Overview

Moleskin is a self-hosted journal app that you deploy in your own [Cloudflare](https://cloudflare.com) Account. Moleskin is designed to be extremely small, extendable, and customizable.
The application is a [Hypermedia](https://en.wikipedia.org/wiki/Hypermedia) based web server implemented in [Hono](https://hono.dev/), with a sprinkling of [HTMX](https://htmx.org/) and client side Javascript for interactivity.

> [!WARNING]
> Note that Moleskin is still in early development and things will likely change. Make sure to pull changes into your instance and update accordingly 

## Features

- Basic/HTTP Single User Auth - this makes your journal secure, private, and accessible from any web browser
- Simple storage in Cloudflare KV
- Zod validated configuration 
- Ships with a few pre-built color themes, catppuccin, cobalt2, and solarized
- Built in support for Google Fonts
- Basic Markdown support

## Prerequisites

- [pnpm](https://pnpm.io/)
- [wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

## Setup & Deployment

To setup your own Moleskin instance, run the following commands to clone the repo, install dependencies, and create a Cloudflare KV namespace.

```sh
git clone https://github.com/stordahl/moleskin.git
pnpm install
pnpm dlx wrangler kv namespace create MOLESKIN_KV
```
Then copy `wrangler.example.toml` to `wrangler.toml` and add your kv namespace id.

### Auth

Moleskin uses Hono's basic auth middleware with Cloudflare env variables to set a username and password. You can create these via the Cloudflare Dashboard or via Wrangler. You can also store them in your wrangler.toml, but make sure you remove the file from git before doing so. You'll need to create two variables - `MOLESKIN_USERNAME` `MOLESKIN_PASSWORD`. You will then be able to log into your journal in the browser.

Consult [the docs](https://developers.cloudflare.com/workers/configuration/environment-variables/#_top) for more info on creating and managing env variables in Cloudflare. 

### Deploy

If you are authenticated with Wrangler, you can simply run the deploy command.
```
pnpm run deploy
```

## Configuration

To configure Moleskin, edit `src/moleskin.ts`. Moleskin provides a `defineConfig` function that will merge any partial config you provide with the defaults. Moleskin ships with a few built in color themes which can be imported into `moleskin.ts` from `src/config/themes.ts` and assigned to the `css.colors` field of your config.

Below shows the full configuration object (including default values) as a Zod schema. To explore the config implementation, browse [/src/lib/config](/src/lib/config).

```typescript
const MoleskinConfigSchema = z.object({
  info: z.object({
    description: z.string().default("Your personal web journal"),
    iconUrl: z.string().default("https://fav.farm/%E2%9C%8F%EF%B8%8F"),
    title: z.string().default("Moleskin"),
  }),
  css: z.object({
    colors: z.object({
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
    }),
    typography: z.object({
      buttons: TypographySubSchema.default({        
        family: "Roboto, sans-serif",
        size: "clamp(0.8rem, calc(.5vw + 0.8rem), 1rem)",
      }),
      fonts: z.object({
        google: z.array(GoogleFontSchema).default([
          { name: "Instrument Serif", styles: ["italic"] },
          { name: "Roboto" }
        ]), 
      }),
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
      links: z.object({
        decoration: z.enum(["underline", "none"]).default("underline")
      }),
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
    }),
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
  }),
});
```
