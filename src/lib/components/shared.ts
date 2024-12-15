import { css, keyframes } from "hono/css";

export const _button = css`
  color: var(--text-primary);
  text-decoration: none;
  border: var(--control-border);
  border-radius: var(--control-border-radius);
  box-shadow: var(--control-box-shadow);
  background: none;
  padding: 5px 10px;
  width: max-content;
  font-family: var(--button-family);
  font-size: var(--button-size);
`

export const _fadeInUpAnimation = keyframes`
  0% {
    transform: translateY(10%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
`

export const _fadeInUp = css`
  animation-name: ${_fadeInUpAnimation};
  animation-duration: 0.5s;
`

export const _visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`
