import { FC } from 'hono/jsx'
import { css } from 'hono/css'
import { _button } from './shared'

export const Footer: FC = () => {
  return (
    <footer class={_footer}> 
      <span>Moleskin | <a href="https://github.com/stordahl/moleskin">View Source</a></span>
    </footer>
  )
}

const _footer = css`
  height: var(--footer-height);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`


