---
name: modelflare-media
description: Generate and edit images and generate videos with any image or video model on Modelflare through its OpenAI-compatible API. Use when the user asks to create, edit, upscale or animate pictures or videos, wants to compare media models or prices, or mentions Modelflare, Castaly or MODELFLARE_API_KEY.
version: 1.1
metadata:
  generated_at: 2026-10-23T18:57:41Z
  source: https://modelflare.dev/skills/modelflare-media/claude-code/SKILL.md
  image_models: 14
  video_models: 28
---

# Modelflare Media Skill

Modelflare is an API gateway that exposes OpenAI-compatible image/video routes and a native Gemini image route behind one base URL. This file does not describe the models: it tells you where the live catalog and the per-model request contract are, so read those and call the API with your own HTTP client. Text models are out of scope: use whatever model you already run on.

## Authentication

- The key comes from the environment variable `MODELFLARE_API_KEY`, or from the user when they hand it to you directly; in that case put it into the environment you run commands in (macOS/Linux: `export MODELFLARE_API_KEY=...`; Windows PowerShell: `$env:MODELFLARE_API_KEY="..."`) rather than into a file. Never print it and never write it into files, prompts or code. If there is no key at all, ask the user to create one at https://modelflare.dev/keys. Do not guess a key.
- API base URL comes from `MODELFLARE_BASE_URL`; use `https://modelflare.dev/v1` by default or `https://origin.modelflare.dev/v1` for the China entry. Every request carries `Authorization: Bearer $MODELFLARE_API_KEY`, `Content-Type: application/json` and `X-Modelflare-Skill: modelflare-claude-code/1.1` (the last one lets the user's usage logs show this skill).
- Generation calls are billed from the user's Modelflare balance by actual usage. The exact charge appears in the usage logs at https://modelflare.dev/usage-logs.

## Find a model

First read the key-scoped list; it is the authority for what this account can call:

```bash
API_BASE="${MODELFLARE_BASE_URL:-https://modelflare.dev/v1}"
curl -s "$API_BASE/models?scope=authorized" -H "Authorization: Bearer $MODELFLARE_API_KEY" -H "X-Modelflare-Skill: modelflare-claude-code/1.1"
```

Each returned model includes `kind` and, for image models, `image_route`. Use those fields instead of guessing from the name. Read `https://modelflare.dev/api/pricing` only for public price/request metadata, and intersect it with the IDs returned by the key-scoped list. A Smart API Key routes across public groups plus the groups unlocked on the account.

## Read the model's request contract

Every published model has its own documentation page with the exact request body, a parameter table, input and output limits and a working curl example. The path is the model ID lowercased with dots replaced by dashes, under `image` or `video` according to its endpoint type:

```bash
curl -s https://docs.modelflare.dev/models/video/kling-3-0-turbo/    # kling-3.0-turbo
curl -s https://docs.modelflare.dev/models/image/wan2-7-image-pro/   # wan2.7-image-pro
```

Read that page before building a request: families differ in where the model ID goes, how reference images are attached and which fields are nested. `https://docs.modelflare.dev/llms.txt` indexes the site, `https://docs.modelflare.dev/llms-full.txt` is every page in one file, `https://docs.modelflare.dev/guides/endpoints/` covers the endpoint families and the asynchronous video flow, and Chinese pages live under `/zh/`.

## What the error codes mean

- `401`: the key is missing or wrong.
- `403` with code `insufficient_user_quota`: the account balance is empty. Top-ups are at https://modelflare.dev/billing.
- `429`: rate limited. The response carries `Retry-After` in seconds.
- `model_not_found`, `unsupported_endpoint` or a group error: the key is valid, but that model or endpoint is not available to this account.
- Any other `4xx`/`5xx` or a failed video task: the response carries a message and a request id.

Latest version: https://modelflare.dev/skills/modelflare-media/claude-code/SKILL.md. This copy ships inside the Modelflare plugin for Claude Code; update the plugin to get a newer version.
