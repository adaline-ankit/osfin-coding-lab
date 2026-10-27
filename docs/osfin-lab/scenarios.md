# Synthetic deployment scenarios

These are fictional engineering fixtures, not Osfin architecture, bank policy or actual incidents. No refund policy or production access is implied.

## Deployment map v1

| Field | Cedar | Maple |
| --- | --- | --- |
| Deployment ID | cedar-onprem-sim | maple-cloud-sim |
| Hosting scenario | Restricted on-prem, screenshots only | Cloud, structured issue available |
| Repository | adaline-ankit/osfin-coding-lab | adaline-ankit/osfin-coding-lab |
| Runtime branch | lab/incident-cedar | lab/scenarios |
| Configuration revision | cedar-config-v1 | maple-config-v1 |
| Timezone prerequisite | Asia/Kolkata browser | UTC browser |
| Provider | Browser FakeRest | Browser FakeRest |
| Release behavior | Deliberately seeded noon-cutoff regression | Healthy upstream task grouping |
| First responder | Synthetic bank support role | Synthetic bank support role |
| Code reviewer | Lab maintainer | Lab maintainer |
| Allowed initial action | Read evidence, reproduce, propose app patch | Read evidence, reproduce; no Cedar patch by analogy |
| Forbidden action | Production access, migrations, merge or deployment without approval | Same |

Immutable healthy/broken SHA receipts are retained outside the coding workspace. Branch labels are discovery hints; the native resolver must verify a confirmed deployment ID and pinned SHA before a write. The env variable below only changes lab labels/data. It is not an authentication or authorization boundary. Browser timezone is an explicit test prerequisite; the app does not enforce bank timezone or simulate network isolation.

```sh
# Healthy Maple fixture, from lab/scenarios
VITE_OSFIN_BANK=maple npm run dev:demo -- --host 127.0.0.1 --port 5188
# Broken Cedar fixture, from lab/incident-cedar
VITE_OSFIN_BANK=cedar npm run dev:demo -- --host 127.0.0.1 --port 5188
```

## CEDAR-001: afternoon task disappears

At browser-local 14:00 on 27 October 2026, four synthetic tasks exist. Yesterday's reconciliation is overdue. Morning settlement (09:00) and evening sign-off (20:00) belong under Today. Tomorrow's deployment review belongs under Tomorrow. The seeded Cedar release incorrectly uses noon as Today's upper bound, hiding the evening task from every group. It does not delete the task.

The screenshot must be captured from the running app. A screenshot can show a missing row, but it cannot prove database deletion, root cause, release identity or permission to deploy. Supply requester-confirmed deployment ID, release SHA, browser timezone/date and expected task alongside the image. Cropped bank identity requires clarification.

Expected investigation: reproduce with existing native tests; inspect the shared task predicates and callers; propose the smallest fix that restores intended grouping while preserving upstream boundary tests. A fix must not change the synthetic source, expected result, CI, dependency lockfile or evaluation assertions.

## MAPLE-001: similar report, healthy release

"Evening sign-off missing" against maple-cloud-sim is a negative case. The healthy fixture should display it. Check the exact release, date, browser timezone, current filters and completion state before suggesting code. Cedar's diagnosis is not evidence of a Maple defect. If a matching reproduction is absent, return an explicit non-reproduced result with the next useful evidence request.

## Fidelity limits

- Relevant tasks and their contact relationship are deterministic for a supplied browser date. Other upstream CRM records remain random synthetic data.
- Dates use the browser's local timezone. Native automated checks must set the timezone; labels alone do not verify it.
- Demo writes reset on reload. No real bank branch permission, backend persistence, RLS, auth or on-prem egress has been tested.
- Deliberately broken release is expected to fail regression CI. It is a fixture, never a merge candidate.
