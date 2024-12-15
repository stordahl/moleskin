import { css } from "hono/css"
import { _fadeInUp } from './shared'
import type { Entry } from "./types"

export const JournalEntryCard = async ({ entry }: JournalEntryCardProps) => {
  return (
    <article key={entry.id} class={_article}>
        <a href={`/entry/${entry.id}`}></a>
        <h2>{entry.content.title}</h2>
        <small>{new Date(entry.date).toLocaleString()}</small>
    </article>
  )
}

const _article = css`
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.8rem 1rem 1rem;
  border-radius: var(--box-border-radius);
  box-shadow: var(--box-box-shadow);
  position: relative;
  transition: transform 0.2s ease-in-out 0s;

  &:not(.list *) {
    aspect-ratio: 1;
  }

  ${_fadeInUp};

  &:hover { 
    transform: scale(1.02);
  }

  a {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  h2 { 
    margin: 10px 0;
  }  
`

type JournalEntryCardProps = {
  entry: Entry;
}


