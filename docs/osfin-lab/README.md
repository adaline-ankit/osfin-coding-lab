# Osfin coding-agent lab

This fork is an independent **synthetic engineering simulation** based on [Atomic CRM](https://github.com/marmelab/atomic-crm), under its existing MIT license. It is not an Osfin production repository, bank deployment, or customer incident corpus.

## Current scope

Establish a reproducible app, test suite and reviewable PR before connecting a coding workflow. Native Foundry will coordinate issue intake, applicable knowledge, skills, coding sessions and approvals. Changes belong in this app fork; the Foundry codebase is outside scope.

Upstream baseline: `1d96561688f9b371ee54dae2bd8ed7860430b69c`. Respect `.nvmrc`, `package-lock.json`, `.npmrc` and upstream `AGENTS.md`. No production/customer credentials are needed for the browser demo.

```sh
npm ci
npx playwright install chromium-headless-shell
npm run typecheck
CI=1 npm run test:unit:app -- --run --maxWorkers=2
NODE_ENV=CI npm run build:demo
npm run dev:demo -- --host 127.0.0.1 --port 5188
```

The demo uses **FakeRest in the browser** and generated CRM data. It does not prove backend persistence, authenticated bank isolation, Supabase RLS or customer-system access. Never enter real customer data or credentials. A real Supabase backend is a separate setup and verification step.

## CI and deployment boundaries

- `.github/workflows/osfin-lab.yml` runs typecheck, upstream app/function/harness tests and the demo build with a read-only GitHub token. Actions are pinned to immutable revisions.
- Upstream automatic check, deployment and Claude workflows are preserved under `upstream-workflows/`, outside GitHub's executable workflow directory. The fork does not inherit their write/deployment/model automation.
- No deployment token, model credential or Foundry token belongs in this fork or browser environment.
- Bootstrap and issue patches use feature branches and reviewable PRs. A passing check does not authorize merge or production deployment.
- Future approvals must identify the exact PR head/base, checks and target environment. Changed code invalidates earlier approval.

## Planned incident workflow

1. Receive a synthetic issue/screenshot in an isolated test channel.
2. Confirm bank/environment/release/repository mapping; uncertain OCR stays uncertain.
3. Retrieve reviewed applicable knowledge and debugging skills.
4. Reproduce a controlled lab defect on an isolated app branch.
5. Propose a bounded patch, preserve independent checks and show before/after results.
6. Obtain patch approval, open a draft PR, read real CI and verify the matching preview.
7. Request explicit exact-head approval for merge/deployment; report the verified result or blocker.

Per-bank scenarios, native machine grants, real Wiki retrieval, previews and Slack execution are later gates. This bootstrap alone does not implement them. No employee performance assessment is included in this app experiment.

On the separate `lab/scenarios` branch, see [synthetic deployment scenarios](scenarios.md) for the healthy/broken bank fixtures. This branch does not merge the bootstrap PR or establish a native coding-agent connection.
