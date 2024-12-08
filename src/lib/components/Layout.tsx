import { css, Style } from 'hono/css'
import { buildTokensFromConfig } from '../config/css';
import { Footer } from './Footer';
import { Header } from './Header'

type LayoutProps = {
  children: any;
  description: string;
  iconUrl: string;
  title: string;
}

export const Layout = ({ children, description, iconUrl, title }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href={iconUrl} rel="icon" />
        <title>{title}</title>
        <meta name="description" content={description}/>
        <style></style>
        <Style />
      </head>
      <body class={_body}>
        <Header title={title} description={description}/>
        <main class={_main}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}


const _body = css`
  :-hono-global {
    body {
      ${buildTokensFromConfig()}
      margin: 0;
      padding: 0;
      background-color: var(--background);
      color: var(--text-primary);
      font-family: var(--paragraph-family);
    }
    h1 {
      font-family: var(--h1-family);
      font-size: var(--h1-size);
      font-weight: var(--h1-weight);
    }
    
    h2 {
      font-family: var(--h2-family);
      font-size: var(--h2-size);
      font-weight: var(--h2-weight);
    }

    p { 
      font-family: var(--paragraph-family);
      font-size: var(--paragraph-size);
      font-weight: var(--paragraph-weight);
    }

    a {
      color: var(--link);
      text-decoration: var(--link-decoration);
    }
  }
`

const _main = css`
  margin: auto;
  width: 90vw;
  max-width: 700px;
`
