import * as z from "zod"

type DefaultValues<T extends z.ZodTypeAny> = T extends z.ZodObject<infer Shape>
  ? {
      [K in keyof Shape]: Shape[K] extends z.ZodDefault<any>
        ? z.infer<Shape[K]>
        : Shape[K] extends z.ZodObject<any>
        ? DefaultValues<Shape[K]>
        : undefined;
    }
  : never;

export function getDefaults<Schema extends z.AnyZodObject>(
  schema: Schema
): DefaultValues<Schema> {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault) {
        return [key, value._def.defaultValue()];
      }
      if (value instanceof z.ZodObject) {
        return [key, getDefaults(value)];
      }
      return [key, undefined];
    })
  ) as DefaultValues<Schema>;
}
