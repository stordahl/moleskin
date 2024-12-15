import { css } from "hono/css";
import { Toggle } from './Toggle';

export const Filters = () => {
  return (
    <div class={_filters}>
      <Toggle id="list-view" />
    </div>
  )
}

const _filters = css`
`

