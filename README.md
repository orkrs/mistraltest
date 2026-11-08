# Mistral Chat App

Minimal web app that calls the Mistral API with the official TypeScript SDK (`@mistralai/mistralai`) using the `mistral-small-latest` model. The API key stays on the server and is never exposed to the browser.

## Setup

```bash
npm install
cp .env.example .env
# then edit .env and set your MISTRAL_API_KEY
```

## Run locally

```bash
# development (auto-reload)
npm run dev

# or plain start
npm start
```

Then open http://localhost:3000 and chat.

## Type check

```bash
npm run build
```

## How it works

- `src/server.ts` — Express server. Loads `MISTRAL_API_KEY` from `.env`, serves `public/`, and exposes `POST /api/chat`, which forwards the conversation to `client.chat.complete({ model: "mistral-small-latest", messages })`.
- `public/index.html` — simple chat UI that sends the conversation history to `/api/chat` and renders replies.
