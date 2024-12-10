import { z } from "zod"
import { deepmerge } from "deepmerge-ts"
import type { PartialDeep } from "type-fest"
import * as schemas from "./schemas"
import { getDefaults } from "./utils"

const MoleskinConfigSchema = z.object({
  info: schemas.InfoConfigSchema,
  css: schemas.CssConfigSchema,
})

export type MoleskinConfig = z.infer<typeof MoleskinConfigSchema>;

export function defineConfig(config: PartialDeep<MoleskinConfig> = {}): MoleskinConfig {
  const mergedConfig = deepmerge(getDefaults(MoleskinConfigSchema), config);
  return MoleskinConfigSchema.parse(mergedConfig)
}


