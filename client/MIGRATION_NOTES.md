# Migration Notes

## TypeScript

- Keep `allowJs` enabled while migrating one layer at a time.
- Prefer converting shared utilities and API contracts before contexts and pages.
- Tighten `strict` after core domain types are in place.

## Performance Follow-Ups

- Review font loading after the TypeScript migration. The current variable fonts are among the largest built assets, so consider limiting weights/styles, preloading only the primary font, or serving a smaller subset.
- Add route-level code splitting with `React.lazy` and `Suspense` once the page modules are converted. The production bundle is currently loaded mostly as one large app chunk.
