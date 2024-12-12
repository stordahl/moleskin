import { css } from "hono/css";
import { JournalEntryCard } from './JournalEntryCard'
import type { Entry } from './types'

export const JournalList = ({ entries }: JournalListProps) => {
  return (
      <div class={_list} id="search-results">
        {entries.map(entry => <JournalEntryCard entry={entry}/>)}
      </div>
  )
}

const _list = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows: auto;
  gap: 1rem;
`

type JournalListProps = {
  entries: Entry[];
}
