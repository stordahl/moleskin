import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { cors } from 'hono/cors'
import { z } from 'zod'
import { JournalForm, JournalList, Layout } from './lib/components'
import { Controls } from './lib/components/Controls'
import { JournalEntry } from './lib/components/JournalEntry'
import { JournalEntryCard } from './lib/components/JournalEntryCard'
import { Storage } from './lib/storage'
import { config } from './moleskin'

type Env = {
  Bindings: {
    MOLESKIN_KV: KVNamespace
    MOLESKIN_USERNAME: string
    MOLESKIN_PASSWORD: string
  }
}

const { description, iconUrl, title } = config.info

const app = new Hono<Env>()

app.use('*', cors())
app.use('*', (c, next) => {
  const auth = basicAuth({
    username: c.env.MOLESKIN_USERNAME,
    password: c.env.MOLESKIN_PASSWORD,
  })
  return auth(c, next)
})

app.post('/new', async (c) => {
  try {
    const formData = await c.req.formData()
    const title = formData.get("title") as string
    const content = formData.get("entry") as string
    if (!content) throw Error("No content field found")

    await Storage.createEntry(c, { title, content })

    return c.redirect('/')
  } catch (error) {
    // In case of error, we'll pass it to the template
    const entries = await Storage.getEntries(c)

    return c.html(
      <Layout description={description} iconUrl={iconUrl} title={title}>
        <JournalForm error={error instanceof z.ZodError ? error.errors[0].message : 'Failed to create entry'} />
        <JournalList entries={entries} />
      </Layout>
    )
  }
})

app.post('/delete/:id', async (c) => {
  await Storage.deleteEntry(c)
  return c.redirect('/')
})

app.get('/', async (c) => {
  const entries = await Storage.getEntries(c)
  return c.html(
    <Layout description={description} iconUrl={iconUrl} title={title}>
      <Controls />
      {entries.length ? 
        <JournalList entries={entries} /> :
        <p>No Entries Found</p>}
    </Layout>
  )
})

app.get('/entry/:id', async (c) => {
  const id = c.req.param('id')
  if(!id) throw Error("no id found")
  const entry = await Storage.getEntry(c, id)
  if (!entry) throw Error("No entry found")
  return c.html(
    <Layout description={description} iconUrl={iconUrl} title={title}>
        <JournalEntry entry={entry} /> 
    </Layout>
  )
})

app.get('/new', async (c) => { 
  return c.html(
    <Layout description={description} iconUrl={iconUrl} title={title}>
      <JournalForm />
    </Layout>
  )
})

app.post('/search', async (c) => {
  const data = await c.req.formData();
  const searchTerm = data.get("search") as string;
  const entries = await Storage.getEntries(c)
  const filtered = entries.filter(e => {
    return (
      e.content.title?.toLowerCase().includes(searchTerm) ||
      e.content.content?.toLowerCase().includes(searchTerm)
    )
  })
  return c.html(
    <>
      {filtered.length ? 
        filtered.map(entry => <JournalEntryCard entry={entry}/>):
        <p>No Entries Found</p>}
    </>
  )
})

export default app
