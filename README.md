# SignalTrail

Connect failed sign-ins, successful access, privilege changes, and exports into an evidence-led sequence.

**Field:** Security analytics & investigation  
**Relevant roles:** Security Analyst I · Junior Detection Engineer  
**Status:** working prototype, published on GitHub and Vercel.

[**Open the live interactive lab**](https://signaltrail.vercel.app/)

The hosted lab runs synthetic exercises in your browser. See the scope below for local integration exercises and limitations.

## Run

Requires Node.js 22 or newer. The core prototype has no npm dependencies.

```sh
npm test
npm run build
npm start
```

Open `http://127.0.0.1:8767`. Use `PORT=8770 npm start` for another port.
To run analysis without a browser:

```sh
npm run analyze
node run.mjs input.json
```

## Explore

1. Investigate Alice. Three failures precede a success, a role change, and an export.
2. Switch to Bob. A benign lookalike has fewer failures and no follow-up sequence.
3. Record an analyst disposition and a supporting note in JSON. A rule match and an analyst conclusion stay separate.

## What is implemented

- A project-specific analysis engine shared by the browser and CLI.
- Guided controls plus editable/importable JSON input (maximum 1 MB).
- Computed decisions, supporting records, explicit empty/error states, and
  downloadable evidence containing the input and limitations.
- Individual visual identity: Oxblood investigation ledger, with self-hosted IBM Plex Sans and Source Code Pro, a custom masthead, readable type, visible keyboard focus, and responsive data views.
- Independent boundary and regression tests in `tests/`.

## Scope and limitations

Events are synthetic and correlation is bounded to a selected actor and time window. A matched sequence is an investigation lead, not proof of compromise.

All bundled identities, documents, logs, and advisories are fictional. Browser
inputs are visitor-controlled; this public demo is not a trusted security
boundary. Do not use it with private production data. Local enforcement or
provider runners, where provided, have their own documented setup and limits.
Do not report fixture outcomes as production results or live-model findings.

## Publish independently

This directory is a complete, separate GitHub/Vercel project. After creating a
repository, push this directory as its root. Import that repository in Vercel:
framework **Other**, build command **npm run build**, output **public**.
There are no required secrets for the public demo. Do not include `public/`,
`.env`, provider credentials, or actual investigation evidence in Git.

## Structure

- `web/engine.js`: domain-specific analysis and validation
- `web/runtime.js`: input validation, canonicalization, and hashing utilities
- `web/app.js`: accessible controls, result views, imports, and exports
- `tests/`: independently asserted security and behavior tests
- `docs/THREAT-MODEL.md`: trust boundaries and claims
- `scripts/`: optional local integrations, if applicable

## Validation

Run `npm test` for current results. Browser viewport checks and performance
metrics must be measured separately; passing engine tests does not establish
visual accessibility or production readiness.

Font notices are included in `web/fonts/`. Source code is MIT licensed.

## Visual identity

See [DESIGN.md](DESIGN.md) for this project’s typography, palette, header, and composition.
