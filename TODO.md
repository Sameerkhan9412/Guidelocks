# Disable caching - TODO

- [ ] Update `next.config.ts` to disable request/fetch caching where supported.
- [ ] Update all `app/api/**/route.ts` endpoints to send `Cache-Control: no-store` headers.
- [ ] (If needed) Add `export const dynamic = "force-dynamic"` / `dynamic = "force-dynamic"` to remaining pages that fetch data.
- [ ] Run `npm run lint` and `npm run build` to ensure no regressions.

