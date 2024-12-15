import { css } from "hono/css";
import { _visuallyHidden } from "./shared";

export const Toggle = ({ id }: ToggleProps) => {
  return (
    <div class={_div}>
      <label for={id} class={_label}>Toggle View</label>
      <input type="checkbox" id={id} class={_input}/>
    </div>
  )
}

type ToggleProps = {
  id: string;
}

const _label = css`
	cursor: pointer;
	text-indent: -9999px;
	width: 60px;
	height: 31px;
	background: var(--background);
  border: var(--control-border);
	display: block;
	border-radius: var(--control-border-radius);
	position: relative;
  grid-area: stack;

  &:after { 
	  content: "\\2637";
	  position: absolute;
	  top: 3px;
	  left: 3px;
	  width: 25px;
	  height: 25px;
  	background: var(--accent);
	  border-radius: calc(var(--control-border-radius) - 2.5px);
	  transition: 0.3s;
    color: var(--background);
    text-indent: 0;
    text-align: center;
    font-size: 20px;
    line-height: 1;
  }
`

const _input = css `
	height: 0;
	width: 0;
  grid-area: stack;
`

const _div = css`
  display: grid;
  grid-template-areas: "stack";

  &:has(input:checked) label:after {
    content: "\\2630";
	  left: calc(100% - 2.5px);
	  transform: translateX(-100%);
  }

  &:has(input:focus) label {
    outline: var(--control-border);
    outline-offset: 2px;
  }
`



