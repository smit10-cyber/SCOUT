const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const SESSION_KEY = "scout:auth-session";

export interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  user: AuthUser;
}

interface AuthResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  expires_at?: number;
  user?: AuthUser;
  msg?: string;
  message?: string;
  error_description?: string;
  error?: string;
}

function configured() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

function headers(accessToken?: string): HeadersInit {
  return {
    apikey: SUPABASE_KEY ?? "",
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
}

async function request(path: string, options: RequestInit = {}) {
  if (!configured()) {
    throw new Error(
      "SCOUT authentication is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: { ...headers(), ...(options.headers ?? {}) },
  });
  const data = (await response.json().catch(() => ({}))) as AuthResponse;
  if (!response.ok) {
    throw new Error(data.error_description || data.msg || data.message || data.error || "Authentication request failed.");
  }
  return data;
}

export function saveAuthSession(session: AuthSession | null) {
  if (typeof window === "undefined") return;
  if (session) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }
  window.dispatchEvent(new Event("scout-auth-change"));
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AuthSession;
    if (!session.access_token || !session.user) return null;
    return session;
  } catch {
    return null;
  }
}


export async function sessionFromAccessToken(accessToken: string, refreshToken: string, expiresIn?: number, expiresAt?: number) {
  if (!configured()) throw new Error("SCOUT authentication is not configured.");
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: headers(accessToken),
  });
  const user = (await response.json().catch(() => null)) as AuthUser | null;
  if (!response.ok || !user?.id) throw new Error("Your confirmation link could not be completed. Please sign in again.");
  const session: AuthSession = {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: expiresAt ?? (expiresIn ? Math.floor(Date.now() / 1000) + expiresIn : undefined),
    user,
  };
  saveAuthSession(session);
  return session;
}

export async function signUp(email: string, password: string, displayName: string, scoutProfile?: Record<string, unknown>) {
  const data = await request("/auth/v1/signup", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      options: {
        data: { displayName, ...(scoutProfile ? { scoutProfile } : {}) },
        emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined,
      },
    }),
  });

  const session = data.access_token && data.refresh_token && data.user
    ? {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at: data.expires_at ?? (data.expires_in ? Math.floor(Date.now() / 1000) + data.expires_in : undefined),
        user: data.user,
      }
    : null;

  saveAuthSession(session);
  return { user: data.user ?? null, session };
}

export async function signIn(email: string, password: string) {
  const data = await request("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!data.access_token || !data.refresh_token || !data.user) {
    throw new Error("SCOUT could not create a sign-in session.");
  }

  const session: AuthSession = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: data.expires_at ?? (data.expires_in ? Math.floor(Date.now() / 1000) + data.expires_in : undefined),
    user: data.user,
  };
  saveAuthSession(session);
  return session;
}

export async function signOut() {
  const session = getAuthSession();
  if (session) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: headers(session.access_token),
    }).catch(() => undefined);
  }
  saveAuthSession(null);
}

export async function updateAuthMetadata(metadata: Record<string, unknown>) {
  const session = getAuthSession();
  if (!session) return null;

  const data = await request("/auth/v1/user", {
    method: "PUT",
    headers: { Authorization: `Bearer ${session.access_token}` },
    body: JSON.stringify({ data: metadata }),
  });

  const updatedSession = {
    ...session,
    user: data.user ?? {
      ...session.user,
      user_metadata: { ...(session.user.user_metadata ?? {}), ...metadata },
    },
  };
  saveAuthSession(updatedSession);
  return updatedSession.user;
}
