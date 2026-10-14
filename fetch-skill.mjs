// Downloads the Claude Code variant of the Modelflare Media Skill, which the
// main site renders with the modelflare-claude-code attribution. The skill
// text is owned by service/mediaskill; never edit the downloaded copy.
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SOURCE = 'https://modelflare.dev/skills/modelflare-media/claude-code/SKILL.md'
const ATTRIBUTION = 'X-Modelflare-Skill: modelflare-claude-code/'

const root = path.dirname(fileURLToPath(import.meta.url))
const response = await fetch(SOURCE)
if (!response.ok) throw new Error(`GET ${SOURCE} failed with HTTP ${response.status}`)
const skill = await response.text()
if (!skill.startsWith('---\nname: modelflare-media\n') || !skill.includes(ATTRIBUTION)) {
  throw new Error(`${SOURCE} did not return the Claude Code variant of the skill`)
}
const target = path.join(root, 'skills/modelflare-media/SKILL.md')
await mkdir(path.dirname(target), { recursive: true })
await writeFile(target, skill)
console.log(`Wrote ${path.relative(root, target)}`)
