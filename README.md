<p align="center">
  <img src="docs/images/cover.png" alt="Lovcode CLI Cover" width="100%">
</p>

<h1 align="center">Lovcode CLI</h1>

<p align="center">
  <strong>We hacked Claude Code open-source, debugged it from scratch, and made it actually work.</strong><br>
  <sub>macOS / Linux / Windows (WSL)</sub>
</p>

<p align="center">
  <a href="#the-story">The Story</a> &middot;
  <a href="#quick-start">Quick Start</a> &middot;
  <a href="#whats-different">What's Different</a> &middot;
  <a href="#features">Features</a> &middot;
  <a href="#license">License</a>
</p>

---

## The Story

Claude Code is arguably the best AI coding CLI in the world. But it's closed-source.

Then [claude-code-best](https://github.com/claude-code-best/claude-code) did the insane work of decompiling the entire thing — 43 tools, 100+ commands, 5000-line REPL, multi-provider API, MCP protocol, plugin system — all reverse-engineered from the compiled bundle.

**We took that, and actually made it run.**

It wasn't easy. The decompiled code was riddled with landmines:

- **API 500 errors** — The `prompt-caching-scope-2026-01-05` beta header sends `cache_control.scope:"global"` on system prompts. The server rejects this from non-official builds. We had to disable all experimental betas.
- **Empty streaming responses** — Opus returns 200 headers but zero events, triggering a non-streaming fallback that sends `thinking: {"type":"adaptive"}` — which non-streaming doesn't support. We patched `adjustParamsForNonStreaming` to convert adaptive thinking to budget-based.
- **`USER_TYPE: undefined`** — A build-time constant that was never set, causing `User-Agent: (undefined, cli)`. We inject `"external"` at runtime.
- **`Gates is not defined`** — A feature-flagged component referenced but never imported. Even wrapped in `false ? ... : []`, the assignment still evaluated and crashed.
- **Version mismatch** — Attribution header checked `cc_version`, rejecting anything that didn't match the official release.

Every one of these was a dead end until we added file-based debug logging (`/tmp/lovstudio-debug.log`) to capture the exact HTTP request/response cycle — because the TUI swallows all stderr output.

**The moment it finally worked, we literally said "wow".**

Now you can run the full Claude Code experience — with your own API key, your own OAuth, your own branding — completely open.

## Quick Start

```bash
git clone https://github.com/MarkShawn2020/lovcode-cli.git
cd lovcode-cli
bun install
bun run dev
```

That's it. You should see the LOVCODE ASCII art logo and be ready to code.

> Requires [Bun](https://bun.sh/) >= 1.3.11 and an Anthropic API key or Claude Pro subscription.

### Global install

```bash
bun run build
chmod +x lovcode-cli
ln -s "$(pwd)/lovcode-cli" ~/.bun/bin/lovcode-cli

# Now use it anywhere
lovcode-cli
```

## What's Different

| | Official Claude Code | Lovcode CLI |
|---|---|---|
| Source code | Closed | Open |
| Branding | Anthropic | Yours (or ours) |
| API compatibility | Official only | Any Anthropic-compatible endpoint |
| Experimental betas | All enabled | Stable subset only |
| Feature flags | Server-controlled | All `false` (clean, no dead code paths) |
| Customization | None | Full source access — hack everything |

### Key patches we made

```
fix: disable experimental betas (prompt-caching-scope, redact-thinking, context-management)
fix: set USER_TYPE="external" for correct User-Agent
fix: convert adaptive thinking → budget-based for non-streaming fallback
fix: remove Gates component reference crash
fix: match version for attribution header compatibility
```

## Features

Everything from Claude Code, minus the feature-flagged internal stuff:

- **Interactive REPL** — Rich Ink-based terminal UI, streaming responses, vim mode
- **Multi-provider** — Anthropic Direct, AWS Bedrock, Google Vertex, Azure Foundry
- **43 Tools** — File ops, bash, web search/fetch, glob/grep, agents, MCP, LSP
- **100+ Commands** — `/model`, `/compact`, `/doctor`, `/resume`, `/mcp`, `/plugin`...
- **MCP Protocol** — Full client with stdio, SSE, HTTP transports
- **Plugins & Skills** — Extensible with custom commands and automation
- **Smart Context** — Auto git status, CLAUDE.md, memory files, reactive compaction
- **Permissions** — Granular plan/auto/manual tool permission modes
- **Hooks** — Pre/post tool use hooks for custom workflows
- **Sessions** — Resume, export, memory across conversations

## Architecture

```
lovcode-cli/
├── src/
│   ├── entrypoints/cli.tsx    # Bootstrap + runtime polyfills
│   ├── screens/REPL.tsx       # 5000+ line interactive UI
│   ├── services/api/          # Multi-provider API (4 providers)
│   ├── services/mcp/          # MCP client (24 files, 12000+ lines)
│   ├── tools/                 # 43 tool implementations
│   ├── commands/              # 100+ slash commands
│   └── components/            # 146 Ink UI components
├── packages/                  # Internal workspace packages
├── build.ts                   # Code-splitting build (→ ~450 chunks)
└── lovcode-cli                # Launcher script
```

## Contributing

Found a bug? Want to add a feature? PRs welcome.

This project exists because someone was crazy enough to decompile Claude Code, and we were crazy enough to debug it. If that resonates with you — star the repo, fork it, make it yours.

## Acknowledgments

Standing on the shoulders of giants:

- [claude-code-best/claude-code](https://github.com/claude-code-best/claude-code) — The insane decompilation that started it all
- [Anthropic](https://www.anthropic.com/) — For building Claude Code in the first place
- [Lovstudio](https://github.com/MarkShawn2020) — Powered by us, with love

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=MarkShawn2020/lovcode-cli&type=Date)](https://star-history.com/#MarkShawn2020/lovcode-cli&Date)

## License

[Apache-2.0](LICENSE)

---

<p align="center">
  <sub>Powered by Lovstudio. Special thanks to Claude Code.</sub>
</p>
