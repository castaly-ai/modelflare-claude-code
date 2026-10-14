---
name: modelflare-media
description: Generate and edit images and generate videos with any image or video model on Modelflare through its OpenAI-compatible API. Use when the user asks to create, edit, upscale or animate pictures or videos, wants to compare media models or prices, or mentions Modelflare, Castaly or MODELFLARE_API_KEY.
version: 1.0
metadata:
  generated_at: 2026-10-14T04:30:22Z
  source: https://modelflare.dev/skills/modelflare-media/claude-code/SKILL.md
  image_models: 14
  video_models: 28
---

# Modelflare Media Skill

Modelflare is an API gateway that exposes OpenAI-compatible image/video routes and a native Gemini image route behind one base URL. This file does not describe the models: it tells you where the live catalog and the per-model request contract are, so read those and call the API with your own HTTP client. Text models are out of scope: use whatever model you already run on.

## Authentication

- The key comes from the environment variable `MODELFLARE_API_KEY`, or from the user when they hand it to you directly; in that case put it into the environment you run commands in (macOS/Linux: `export MODELFLARE_API_KEY=...`; Windows PowerShell: `$env:MODELFLARE_API_KEY="..."`) rather than into a file. Never print it and never write it into files, prompts or code. If there is no key at all, ask the user to create one at https://modelflare.dev/keys. Do not guess a key.
- Base URL `https://modelflare.dev`. Every request carries `Authorization: Bearer $MODELFLARE_API_KEY`, `Content-Type: application/json` and `X-Modelflare-Skill: modelflare-claude-code/1.0` (the last one lets the user's usage logs show this skill).
- Generation calls are billed from the user's Modelflare balance by actual usage. The exact charge appears in the usage logs at https://modelflare.dev/usage-logs.

## Find a model

```bash
curl -s https://modelflare.dev/api/pricing
```

Every entry carries `model_name`, `supported_endpoint_types`, `enable_groups` and its price fields. Image prices are USD per image for a given `size` and `quality`; video prices are USD per second for a given `resolution`, and feature rows add modes such as image-to-video or audio with their own minimum billed length. A model is callable only if one of its `enable_groups` is unlocked on the user's account; the default Modelflare key routes across unlocked groups automatically.

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
- `model_not_found`, `model_unavailable`, `unsupported_endpoint` or a group error: the key is valid, but that model or endpoint is not available to this account.
- Any other `4xx`/`5xx` or a failed video task: the response carries a message and a request id.

Latest version: https://modelflare.dev/skills/modelflare-media/claude-code/SKILL.md. This copy ships inside the Modelflare plugin for Claude Code; update the plugin to get a newer version.
