import { css } from 'hono/css'
import { FC } from 'hono/jsx'
import { _button } from './shared'

export const JournalForm: FC = () => {
  return (
    <form method="post" id="journal-form" class={_form}>
      <label for="title">Title</label>
      <input type="text" id="title" name="title" placeholder="Title" autofocus/>
      <textarea
        name="entry"
        placeholder="What's on your mind?"
        
        rows={12}
      />
      <button type="submit" class={_button}>Save Entry</button>
    </form>
  )
}

const _form = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    visibility: hidden;
    width: 0;
    height: 0;
  }

  input, textarea {
    border: none;
    padding: 10px;
    border-radius: var(--control-border-radius);
    font-size: 1.3rem;
    background: var(--background);
    border: var(--control-border);
    color: var(--text-primary);
  }

  textarea {
    resize: none;
  }

  button {
    align-self: flex-end;
  }
`
