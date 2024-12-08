import { css } from "hono/css";
import { JournalEntry } from './JournalEntry'

export const JournalList = ({ entries }: JournalListProps) => {
  return (
    <div class={_list}>
      {entries.map(entry => <JournalEntry entry={entry}/>)}
    </div>
  )
}

const _list = css`
  padding: 1rem 0;
`

type Entry = {
  id: string;
  content: Content;
  date: string;
}

type Content = {
  title: string;
  content: string;
}

type JournalListProps = {
  entries: Entry[];
}
