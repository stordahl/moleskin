import { css } from "hono/css";
import { marked } from "marked";
import { _fadeInUp } from "./shared";
import type { Entry } from "./types"

export const JournalEntry = async ({ entry }: JournalEntryProps) => {
  const content = await marked(entry.content.content)
  return (
    <article key={entry.id} class={_article}>
      <div class={_controls}>
        <a href="/">Back</a>
        <form method="post" action={`/delete/${entry.id}`}>
          <button 
            type="submit"
            onclick="return confirm('Are you sure you want to delete this entry?')"
          >
            Delete
          </button>
        </form>
      </div>
      <header>  
        <h2>{entry.content.title}</h2>
        <small>{new Date(entry.date).toLocaleString()}</small>
      </header>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </article>
  )
}

const _article = css`
  border: var(--border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin-block-end: 1rem;

  ${_fadeInUp};

  h2 { 
    margin: 10px 0;
  }
  
  small { 
    color: var(--text-secondary);
    font-family: var(--subtext-family);
  }

  img {
    max-width: 85%;
    margin: auto;
    display: block;
  }
`

const _controls = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  button, a { 
    color: var(--text-secondary);
    background: none;
    border: none;
    font-family: var(--button-family);
    font-size: 0.9rem;
    text-decoration: none;
    &:hover { 
      cursor: pointer;
      text-decoration: underline;
    }
  }

  form { 
    margin: 0;
  }
`

type JournalEntryProps = {
  entry: Entry;
}

