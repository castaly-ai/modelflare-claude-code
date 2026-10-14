# Modelflare for Claude Code

Generate and edit images and generate videos in Claude Code with one Modelflare **Smart API Key** for every image and video model available to your account.

在 Claude Code 里用一个 Modelflare **Smart API Key** 调用你账号可用的全部图像和视频模型。

## Get a Smart API Key / 获取 Smart API Key

1. Sign up / 注册: https://modelflare.dev/sign-up?utm_source=claude-code&utm_medium=plugin&utm_campaign=integrations
2. Console → API Keys → **Create Smart API Key**, and pick a routing strategy (Balanced / Stability first / Low price first).

   控制台 API Keys →「Create Smart API Key」，选择路由策略（均衡 / 稳定优先 / 低价优先）。

## Install / 安装

```bash
claude plugin marketplace add castaly-ai/modelflare-claude-code
claude plugin install modelflare@modelflare
```

Then set the key in the environment Claude Code runs in / 然后在 Claude Code 的运行环境里设置 Key:

```bash
export MODELFLARE_API_KEY="<your Smart API Key>"
```

On Windows PowerShell: `setx MODELFLARE_API_KEY "<your Smart API Key>"`.

## Use / 使用

Ask Claude Code as usual, for example "Generate a 16:9 poster of a coastal observatory at dusk with gpt-image-2". The skill reads the live catalog and each model's docs page, calls the API and saves the result. Calls are billed to your Modelflare balance by actual usage; see https://modelflare.dev/usage-logs.

Update with `claude plugin update modelflare@modelflare`.

## Links

Docs: https://docs.modelflare.dev/guides/clients/media-skill/ · Pricing: https://modelflare.dev/pricing

## License

MIT © Havenbyte LLC
