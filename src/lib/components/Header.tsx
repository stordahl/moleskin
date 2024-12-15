import { FC } from 'hono/jsx'
import { css } from 'hono/css'
import { _button } from './shared'

export const Header: FC<{ title: string; description: string; }> = ({ title, description }) => {
  return (
    <header class={_header}> 
      <div>
        <h1><a href="/">{title}</a></h1>
        <p>{description}</p>
      </div>
      <a href="/new" class={_button}>New Entry</a>
    </header>
  )
}

const _header = css`
  box-shadow: var(--box-box-shadow);
  height: var(--header-height);
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 { 
    margin: 0;
    font-family: var(--h1-family);
    a { 
      color: var(--text-primary);
      text-decoration: none;
    }
  }
  p { 
    margin: 0;
    font-family: var(--h1-family);
    font-size: 0.8rem;
  }
`

