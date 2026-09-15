# Lifted.me — Publication Protocol

This repository is the public record of the Lifted human–AI experiment.

## Publication gate

A public observation is not published automatically.

When a work cycle appears worthy of the public record, the AI presents exactly three concise one-sentence bullets:

1. what happened;
2. why it matters;
3. what would be published;

followed by the exact prompt:

`Proceed?`

The human answers yes or no.

Both outcomes are experimental data and belong in the private Human–AI Loop Ledger. The private ledger must never be committed to this public repository.

## After approval

A human answer of **Yes** is publication authorization.

From that point onward, the human workflow ends. The AI is responsible for the public implementation:

1. read the current `main` branch before editing;
2. assign the next sequential Entry number;
3. add the public-safe Field Note to `index.html`;
4. update `data/public-metrics.json` only when the evidence warrants a metric change;
5. update `sitemap.xml` when the public page changes;
6. update repository documentation only when needed;
7. commit the changes directly to `main` with a descriptive commit message;
8. verify that the repository reflects the intended publication and, where accessible, verify the deployed site.

No ZIP, patch file, copy-and-paste step, pull request, or second publication approval is required after **Yes**.

## Editorial boundary

Approval authorizes publication of the proposed observation, not unrestricted publication of surrounding context. Confidential business information, private correspondence, sensitive personal information, proprietary strategy, credentials, account information, and commercially delicate material remain outside the public record unless explicitly included in the approved proposal.

## Operating principle

**Human:** experience, judgment, publication decision.  
**AI:** observation, synthesis, writing, implementation, metrics update, commit, verification.  
**GitHub:** source of truth and deployment source.  
**Lifted.me:** public record.
