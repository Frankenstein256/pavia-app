# Pavia

A financial super-app for young Ghanaians — savings goals, rent finance, gig work, and certified courses in one place.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/db/src/schema/users.ts` — users table (id, fullName, email, phone, passwordHash, createdAt)
- `lib/api-spec/openapi.yaml` — single source of truth for all API contracts
- `artifacts/api-server/src/routes/auth.ts` — signup, login, me, logout routes
- `artifacts/api-server/src/lib/password.ts` — scrypt password hashing (Node built-in crypto)
- `artifacts/fundi/src/hooks/use-auth.ts` — `useAuth()` and `useLogoutAction()` hooks
- `artifacts/fundi/src/pages/` — signup, login, dashboard pages

## Architecture decisions

- **Password hashing**: Node.js built-in `crypto.scrypt` — no native addon required; `salt:hash` format stored in DB.
- **Sessions**: `express-session` with in-memory store; `SESSION_SECRET` from Replit secret; 7-day cookie.
- **Auth state**: React Query + `useGetMe` — dashboard redirects to `/login` when unauthenticated; session cached in QueryClient on login/signup.
- **CORS**: `credentials: true` + `origin: true` on the API; `credentials: "include"` added to custom fetch for all API calls.
- **Zod schema naming**: Orval generates `SignupBody`/`LoginBody` (not `SignupInput`/`LoginInput`) — always check generated api.ts after codegen.

## Product

- **Auth**: signup with full name, email, Ghanaian phone number, password — stored in PostgreSQL. Login with email + password. Sessions persist 7 days. Dashboard redirects unauthenticated users to login.
- **Save / Rent / Work / Learn**: landing pages with feature previews (backend coming later).

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
