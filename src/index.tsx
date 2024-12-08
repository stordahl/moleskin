import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { cors } from 'hono/cors'
import { z } from 'zod'
import { JournalForm, JournalList, Layout } from './lib/components'
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
      {entries.length ? 
        <JournalList entries={entries} /> :
        <p>No Entries</p>}
    </Layout>
  )
});

app.get('/new', async (c) => { 
  return c.html(
    <Layout description={description} iconUrl={iconUrl} title={title}>
      <JournalForm />
    </Layout>
  )
});

export default app
