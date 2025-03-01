import { css } from "hono/css"
import kebabCase from "just-kebab-case"
import { config } from "../../moleskin"

const getLightColors = () => Object.entries(config.css?.colors.light).map(([k,v]) => {
  return buildCssVariable(k, v) 
})

const getDarkColors = () => {
  return css`@media (prefers-color-scheme: dark) {
    & {
      ${Object.entries(config.css?.colors.dark).map(([k,v]) => buildCssVariable(k, v))}
    }
  }`
}

const getButtons = () => Object.entries(config.css.typography.buttons).map(([k,v]) => {
  return buildCssVariable(`button-${k}`, v.toString())
})

const getHeadings = () => Object.entries(config.css.typography.headings).map(([k,v]) => {
  return Object.entries(v).map(([innerKey,innerValue]) => {
    return buildCssVariable(`${k}-${innerKey}`, innerValue.toString())
  })
}).flat()

const getLinks = () => Object.entries(config.css.typography.links).map(([k,v]) => {
  return buildCssVariable(`link-${k}`, v)
})

const getParagraphs = () => Object.entries(config.css.typography.paragraphs).map(([k,v]) => {
  return buildCssVariable(`paragraph-${k}`, v.toString())
})

const getSubtext = () => Object.entries(config.css.typography.subtext).map(([k,v]) => {
  return buildCssVariable(`subtext-${k}`, v.toString())
})

const getVisualBox = () => [
  ...Object.entries(config.css.visual.box).map(([k,v]) => {
    const value = typeof v === "number" ? `${v}px` : v
    return buildCssVariable(`box-${k}`, value) 
  }), 
  css`--box-border: var(--box-border-size) var(--box-border-style) var(--accent);`, 
  css`--box-box-shadow: var(--box-box-shadow-x) var(--box-box-shadow-y) var(--box-box-shadow-spread) var(--shadow)`,
]

const getVisualControls = () => [
  ...Object.entries(config.css.visual.controls).map(([k,v]) => {
    const value = typeof v === "number" ? `${v}px` : v
    return buildCssVariable(`control-${k}`, value) 
  }),
  css`--control-border: var(--control-border-size) var(--control-border-style) var(--accent);`, 
  css`--control-box-shadow: var(--control-box-shadow-x) var(--control-box-shadow-y) var(--control-box-shadow-spread) var(--shadow)`,
]


function buildCssVariable(k: string, v: string) {
  return css`--${kebabCase(k)}: ${v};`
}

export function buildTokensFromConfig() {
  return [
    getLightColors(),
    getDarkColors(),
    getButtons(),
    getHeadings(),
    getLinks(),
    getParagraphs(),
    getSubtext(),
    getVisualBox(),
    getVisualControls(),
  ].flat()
}
