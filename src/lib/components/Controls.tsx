import { css } from "hono/css";
import { Filters } from "./Filters";
import { Search } from "./Search";

export const Controls = () => {
  return (
    <div class={_controls}>
      <Search />
      <Filters />
    </div>
  )
}

const _controls = css`
  padding: 0 0 2rem 0; 
  display: flex;
  gap: 10px;
  align-items: center;
`


