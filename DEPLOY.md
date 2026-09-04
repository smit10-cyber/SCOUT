# SCOUT — launch checklist

SCOUT is a Next.js app. The opportunity catalog is currently static and focused on students in New York's Capital Region.

## 1. Create Supabase authentication

Create a Supabase project, then enable Email authentication.

Hosted Supabase projects normally require email confirmation. After creating the project, set:

- **Site URL:** your eventual live SCOUT URL
- **Redirect URL:** your live SCOUT URL followed by `/auth/callback`

The app uses the public/publishable Supabase key in the browser. Never expose a service-role key.

## 2. Configure SCOUT

Copy `.env.example` to `.env.local` and fill in:

```text
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

## 3. Test locally

```bash
npm install
npm run dev
```

Then test this flow:

1. Open `/sign-up`.
2. Create an account with an email you can access.
3. Confirm the email.
4. SCOUT should finish the confirmation at `/auth/callback` and send you to `/profile`.
5. Save a profile.
6. Sign out.
7. Sign back in at `/sign-in`.
8. Confirm the profile is restored from the account.
9. Save an opportunity and confirm the saved item remains associated with that account on the same browser.

## 4. Deploy to Vercel

Import the `scout` folder into Vercel. Add the two `NEXT_PUBLIC_...` environment variables in the Vercel project settings, then deploy.

After Vercel gives you the production URL, update Supabase Auth URL Configuration so the production URL and `/auth/callback` are allowed.

## Important before a public launch

- The public opportunity catalog is intentionally small and should be reviewed regularly.
- The Admin pages are still a prototype and are **not** server-side role protected. Do not give real administrator access to those routes until server-side authorization is implemented.
- Saved opportunities and application-tracker data are currently browser-local. Accounts work for authentication and profile syncing, but those items are not yet a cross-device database.
