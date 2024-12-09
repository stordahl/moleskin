![Moleskin: your personal web journal](https://github.com/user-attachments/assets/e6486833-83ed-42e6-93fa-08432ccacc2d#gh-dark-mode-only)
![Moleskin: your personal web journal](https://github.com/user-attachments/assets/60fa1695-a90e-410f-8583-abbb56d14289#gh-light-mode-only)

## Overview

Moleskin is a self-hosted journal app that you deploy in your own [Cloudflare](https://cloudflare.com) Account. Moleskin is designed to be extremely small, extendable, and customizable.

> [!WARNING]
> Note that Moleskin is still in early development and things will likely change. Make sure to pull changes into your instance and update accordingly 

## Features

- Basic/HTTP Single User Auth - this makes your journal secure, private, and accessible from any web browser
- Simple storage in Cloudflare KV
- Zod validated configuration 
- Ships with a few pre-built color themes, catppuccin, cobalt2, and solarized

## Setup & Deployment

To setup your own Moleskin instance, run the following commands to clone the repo, install dependencies, and create a Cloudflare KV namespace.

```
git clone https://github.com/stordahl/moleskin.git
pnpm install
pnpm dlx wrangler kv namespace create MOLESKIN_KV
```
Then clone `wrangler.example.toml` to `wrangler.toml` and add your kv namespace id.

### Auth

Moleskin uses Hono's basic auth middleware with Cloudflare env variables to set a username and password. You can create these via the Cloudflare Dashboard or via Wrangler. You can also store them in your wrangler.toml, but make sure you remove the file from git before doing so. You'll need to create two variables - `MOLESKIN_USERNAME` `MOLESKIN_PASSWORD`. You will then be able to log into your journal in the browser.

Consult [the docs](https://developers.cloudflare.com/workers/configuration/environment-variables/#_top) for more info on creating and managing env variables in Cloudflare. 

### Deploy

If you are authenticated with Wrangler, you can simply run the deploy command.
```
pnpm run deploy
```

