import { css } from "hono/css";
import { _visuallyHidden } from "./shared";

export const Search = ({ target = "#search-results" }: SearchProps) => {
  return (
    <div class={_searchContainer}>
      <label class={_visuallyHidden} htmlFor="search-input">
        Search Journal Entries 
      </label>
      <input 
        type="search" 
        id="search-input"
        name="search" 
        class={_input}
        placeholder="Search Journal Entries..."
        aria-label="Search Entries"
        hx-post="/search" 
        hx-trigger="input changed delay:500ms, search" 
        hx-target={target} 
        hx-swap="innerHtml"
      />
    </div>
  )
}



type SearchProps = {
  target?: string;
}

const _searchContainer = css`
  flex-grow: 1;
`

const _input = css`
  width: 100%;
`
