import { css } from "hono/css";
import { _visuallyHidden } from "./shared";

export const Toggle = ({ id, label }: ToggleProps) => {
  return (
    <div class={_div}>
      <label for={id} class={_label}>{label}</label>
      <input type="checkbox" id={id} class={_input}/>
    </div>
  )
}

type ToggleProps = {
  id: string;
  label: string;
}

const _label = css`
	cursor: pointer;
	text-indent: -9999px;
	width: var(--toggle-width);
	height: var(--toggle-height);
	background: var(--background);
  border: var(--control-border);
	display: block;
	border-radius: var(--control-border-radius);
	position: relative;
  grid-area: stack;

  &:after { 
	  content: "\\2637";
	  position: absolute;
	  top: var(--toggle-padding);
	  left: var(--toggle-padding);
	  width: var(--toggle-inner-size);
	  height: var(--toggle-inner-size);
  	background: var(--accent);
	  border-radius: calc(var(--control-border-radius) - 2.5px);
	  transition: 0.3s;
    color: var(--background);
    text-indent: 0;
    text-align: center;
    font-size: calc(var(--toggle-inner-size) - 4px);
    line-height: 1;
  }
`

const _input = css `
	height: 0;
	width: 0;
  grid-area: stack;
`

const _div = css`
  --toggle-inner-size: 20px;
  --toggle-padding: 2.5px;
  --toggle-width: 50px;
  --toggle-height: calc(var(--toggle-inner-size) + calc(var(--toggle-padding) * 2));
  display: grid;
  grid-template-areas: "stack";

  &:has(input:checked) label:after {
    content: "\\2630";
	  left: calc(100% - var(--toggle-padding));
	  transform: translateX(-100%);
  }

  &:has(input:focus) label {
    outline: var(--control-border);
    outline-offset: 2px;
  }
`



