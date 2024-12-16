import { css } from "hono/css";
import { Toggle } from "./Toggle";
import { Search } from "./Search";

export const Controls = () => {
  return (
    <div class={_controls}>
      <Search />
      <div>
        <Toggle id="list-view" label="Toggle View" />
      </div>
    </div>
  )
}

const _controls = css`
  padding: 0 0 2rem 0; 
  display: flex;
  gap: 10px;
  align-items: center;
`


