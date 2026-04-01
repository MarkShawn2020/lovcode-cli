<p align="center">
  <img src="docs/images/cover.png" alt="Lovcode CLI Cover" width="100%">
</p>

<h1 align="center">Lovcode CLI</h1>

<p align="center">
  <strong>AI Coding Assistant in the Terminal, Powered by Claude</strong><br>
  <sub>macOS / Linux / Windows (WSL)</sub>
</p>

<p align="center">
  <a href="#features">Features</a> &middot;
  <a href="#quick-start">Quick Start</a> &middot;
  <a href="#usage">Usage</a> &middot;
  <a href="#architecture">Architecture</a> &middot;
  <a href="#license">License</a>
</p>

---

## Features

- **Interactive REPL** — Rich terminal UI (Ink-based) with syntax highlighting, streaming responses, and vim mode
- **Multi-provider API** — Anthropic Direct, AWS Bedrock, Google Vertex, Azure Foundry
- **43 Built-in Tools** — File read/edit/write, bash execution, web search/fetch, glob/grep, agent spawning, MCP integration
- **100+ Slash Commands** — `/model`, `/compact`, `/doctor`, `/resume`, `/mcp`, `/plugin`, `/skills`, and more
- **Plugin & Skill System** — Extensible via plugins and user-defined skills
- **MCP Support** — Full Model Context Protocol client with stdio, SSE, HTTP transports
- **Smart Context** — Auto-loads git status, CLAUDE.md, memory files; reactive compaction keeps context fresh
- **Permission System** — Granular tool permissions with plan/auto/manual modes
- **Hook System** — Pre/post tool use hooks for custom automation
- **Session Management** — Resume conversations, export history, session memory

## Quick Start

### Requirements

- [Bun](https://bun.sh/) >= 1.3.11 (use `bun upgrade` to update)
- An Anthropic API key or Claude Pro/Team subscription (OAuth)

### Install

```bash
git clone https://github.com/MarkShawn2020/lovcode-cli.git
cd lovcode-cli
bun install
```

### Run

```bash
# Development mode
bun run dev

# Build for production
bun run build

# Run built version
./lovcode-cli
```

### Symlink for global access

```bash
chmod +x lovcode-cli
ln -s "$(pwd)/lovcode-cli" ~/.bun/bin/lovcode-cli
```

## Usage

```bash
# Interactive mode
lovcode-cli

# One-shot mode
lovcode-cli -p "explain this function"

# With specific model
lovcode-cli --model claude-sonnet-4-20250514

# Bare mode (API key only, no OAuth)
lovcode-cli --bare
```

### Key Slash Commands

| Command | Description |
|---------|-------------|
| `/model` | Switch model |
| `/compact` | Compress conversation history |
| `/doctor` | Health check |
| `/resume` | Resume previous session |
| `/mcp` | Manage MCP servers |
| `/plugin` | Plugin management |
| `/config` | Edit settings |
| `/vim` | Toggle vim mode |
| `/cost` | Show session cost |
| `/help` | Full command list |

## Architecture

```
lovcode-cli/
├── src/
│   ├── entrypoints/cli.tsx    # Bootstrap with MACRO polyfill
│   ├── main.tsx               # Commander CLI definition
│   ├── screens/REPL.tsx       # Main interactive UI (5000+ lines)
│   ├── services/
│   │   ├── api/               # Multi-provider API client
│   │   ├── mcp/               # MCP client (24 files)
│   │   └── oauth/             # OAuth flow
│   ├── tools/                 # 43 tool implementations
│   ├── commands/              # 100+ slash commands
│   ├── components/            # 146 Ink UI components
│   └── constants/             # Prompts, system config
├── packages/                  # Internal workspace packages
├── build.ts                   # Bun build with code splitting
└── dist/                      # Production output (~450 chunks)
```

### Key Design Decisions

- **Feature flags** via `bun:bundle` — polyfilled to `false` for external builds
- **Experimental betas disabled** — `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1` for compatibility
- **USER_TYPE=external** — Correct User-Agent for non-official builds
- **Version 2.1.52** — Matches upstream for API compatibility

## Acknowledgments

Based on [claude-code-best/claude-code](https://github.com/claude-code-best/claude-code) — a decompilation/restoration of Anthropic's official [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI.

Powered by [Lovstudio](https://github.com/MarkShawn2020). Special thanks to Claude Code.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=MarkShawn2020/lovcode-cli&type=Date)](https://star-history.com/#MarkShawn2020/lovcode-cli&Date)

## License

[Apache-2.0](LICENSE)
