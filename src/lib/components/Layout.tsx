import { css, Style } from 'hono/css'
import { buildTokensFromConfig } from '../config/css'
import { Footer } from './Footer'
import { Header } from './Header'
import { config } from '../../moleskin'
import { Fonts } from './Fonts'

type LayoutProps = {
  children: any;
  description: string;
  iconUrl: string;
  title: string;
}

const { css: { typography: { fonts: { google } } } } = config

export const Layout = ({ children, description, iconUrl, title }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href={iconUrl} rel="icon" />
        <title>{title}</title>
        <meta name="description" content={description}/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <Fonts google={google}/>
        <Style />
        <script 
          src="https://unpkg.com/htmx.org@2.0.3" 
          integrity="sha384-0895/pl2MU10Hqc6jd4RvrthNlDiE9U1tWmX7WRESftEDRosgxNsQG/Ze9YMRzHq" 
          crossorigin="anonymous"
        ></script>
      </head>
      <body class={_body}>
        <Header title={title} description={description}/>
        <main class={_main} id="main">{children}</main>
        <Footer />
        <script src="/static/index.js" type="module"></script>
      </body>
    </html>
  )
}


const _body = css`
  :-hono-global {
    body {
      ${buildTokensFromConfig()}
      --header-height: 90px;
      --footer-height: 75px;
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

    small { 
      color: var(--text-secondary);
      font-family: var(--subtext-family);
    }

    input, textarea {
      border: none;
      padding: 10px;
      border-radius: var(--control-border-radius);
      font-size: 1.3rem;
      background: var(--background);
      border: var(--control-border);
      color: var(--text-primary);
    }
  }
`

const _main = css`
  margin: 2rem auto 0;
  width: 90vw;
  max-width: 700px;
  min-height: calc(100vh - calc(var(--header-height) + var(--footer-height)));
`
