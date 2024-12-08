import { defineConfig } from "./lib/config"

/**
 * @example
 * ```typescript
 * export const config = defineConfig({
 *  css: {
 *    colors: catppuccin,
 *    typography: {
 *      headings: {
 *        h2: {
 *           family: "monospace"
 *        }
 *      },
 *      paragraphs: {
 *        family: "monospace"
 *      },
 *    }
 *  }
 * })
 * ```
 */
export const config = defineConfig();
