# collecte-2026 — Instructions pour Claude

## Contexte du projet

Application de gestion des collectes alimentaires pour les Restos du Cœur.
Monorepo Nx 22.7.5 · pnpm · TypeScript strict · Architecture hexagonale · DDD

## Stack technique

- Backend : NestJS (packages/api)
- Frontend : Angular (packages/web)
- Tests unitaires : Vitest + TDD
- Tests intégration : Testcontainers + PostgreSQL
- ORM : Prisma
- CI/CD : GitHub Actions + nx affected

## Structure des packages

- packages/shared/kernel → value objects partagés (scope:shared, type:util)
- packages/collectes/domain → agrégats, entités, ports (scope:collectes, type:domain)
- packages/collectes/application → use cases (scope:collectes, type:application)
- packages/collectes/infrastructure → adapters, repos (scope:collectes, type:infrastructure)
- packages/benevolat/domain → (scope:benevolat, type:domain)
- packages/benevolat/application → (scope:benevolat, type:application)
- packages/benevolat/infrastructure → (scope:benevolat, type:infrastructure)
- packages/api → app NestJS (scope:api, type:app)
- packages/web → app Angular (scope:web, type:app)

## Conventions

- Code domaine en français (Bénévole, Collecte, Centre...)
- Commits : conventional commits (feat, fix, chore, test, docs)
- Toujours préfixer les commandes Nx avec pnpm : `pnpm nx ...`
- Tests avant implémentation (TDD)
- Ne jamais importer une infrastructure depuis le domaine

## Règles de boundaries (enforce-module-boundaries)

- type:app → peut importer type:domain, type:application, type:util
- type:application → peut importer type:domain, type:util
- type:domain → peut importer type:util uniquement
- type:util → n'importe rien
- scope:collectes ↔ scope:benevolat : isolation totale
  <!-- nx configuration start-->
  <!-- Leave the start & end comments to automatically receive updates. -->

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->
