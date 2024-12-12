import { css } from "hono/css";
import { _visuallyHidden } from "./shared";

export const Search = ({ target = "#search-results" }: SearchProps) => {
  return (
    <div class={_searchContainer}>
      <label class={_visuallyHidden} htmlFor="search-input">
        Search Users
      </label>
      <input 
        type="search" 
        id="search-input"
        name="search" 
        class={_input}
        placeholder="Begin Typing To Search Users..."
        aria-label="Search Entries"
        hx-post="/search" 
        hx-trigger="input changed delay:500ms, search" 
        hx-target={target} 
        hx-swap="innerHtml"
        hx-indicator=".htmx-indicator"
      />
    </div>
  )
}



type SearchProps = {
  target?: string;
}

const _searchContainer = css`
  padding: 0 0 2rem 0; 
`

const _input = css`
  width: 100%;
`
