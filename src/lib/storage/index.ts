import { Context } from "hono";
import { z } from "zod";
import type { Entry } from "../components/types";

export const JournalEntrySchema = z.object({
  id: z.string().optional(),
  content: z.string().min(1, "Entry cannot be empty"),
  date: z.string().datetime()
})

export type RawEntry = {
  content: string;
  title: string;
}

export class Storage {

  static async createEntry(c: Context, raw: RawEntry): Promise<void> {
    const validatedEntry = this.parseEntry(raw)

    await c.env.MOLESKIN_KV.put(
      validatedEntry.id!, 
      JSON.stringify(validatedEntry)
    )
  }

  static async getEntries(c: Context): Promise<Entry[]> {
    const entries = await c.env.MOLESKIN_KV.list()
    const entriesData = await Promise.all(
      entries.keys.map(async (key: KVNamespaceListKey<unknown>) => {
        const entry = await c.env.MOLESKIN_KV.get(key.name)
        return entry ? JSON.parse(entry) : null
      })
    )

    return entriesData
      .filter(entry => entry !== null)
      .map(entry => ({ ...entry, content: JSON.parse(entry.content) }))
      .sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
  }

  static async getEntry(c: Context, id: string): Promise<Entry | null> {
    const entry = await c.env.MOLESKIN_KV.get(id)
    if (!entry) return null
    
    const parsedEntry = JSON.parse(entry)
    return {
      ...parsedEntry,
      content: JSON.parse(parsedEntry.content)
    }
  }

  static async deleteEntry(c: Context) {
    const id = c.req.param('id')
    await c.env.MOLESKIN_KV.delete(id)
    return c.json({ message: 'Entry deleted' })
  }

  static parseEntry({ title, content }: RawEntry) {
    return JournalEntrySchema.parse({
      id: crypto.randomUUID(),
      content: JSON.stringify({ title, content }),
      date: new Date().toISOString()
    })
  }
}

