# Lifted — Entry 001 repo update

This package contains the approved public update for ENTRY 001.

## Apply

From the repository root:

```bash
git apply lifted-entry-001.patch
```

Then review:

```bash
git diff
```

The patch makes three changes:

1. Changes the Evidence intro from "Day Zero contains no result" to "Day Zero began with no result."
2. Adds ENTRY 001 immediately after ENTRY 000.
3. Updates `data/public-metrics.json` to:
   - recordedCycles: 1
   - dominantBottleneck: L
   - newCapabilities: 0

No CSS, JavaScript, dependencies, or private ledger data are changed.

`entry-001.md` is included only as a clean editorial copy of the published note; it does not need to be committed unless you want it in the repo.
