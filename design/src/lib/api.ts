import { supabase } from "@/lib/supabase";

const config = () => window.__SOCIAL_MARKETING__;

async function authHeaders() {
  const session = (await supabase.auth.getSession()).data.session;
  return session?.access_token
    ? {
        Authorization: `Bearer ${session.access_token}`,
      }
    : {};
}

export async function apiGet<T>(path: string): Promise<T> {
  const base = config()?.apiBase || "/api";
  const response = await fetch(`${base}${path}`, {
    headers: {
      Accept: "application/json",
      ...(await authHeaders()),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((data as any).error || `GET ${path} failed`);
  return data as T;
}

export async function apiSend<T>(path: string, method: string, body?: unknown): Promise<T> {
  const base = config()?.apiBase || "/api";
  const response = await fetch(`${base}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(await authHeaders()),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || data.detail || `${method} ${path} failed`);
  }
  return data as T;
}

export async function apiUpload<T>(path: string, formData: FormData): Promise<T> {
  const base = config()?.apiBase || "/api";
  const response = await fetch(`${base}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...(await authHeaders()),
    },
    body: formData,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || data.detail || `POST ${path} failed`);
  }
  return data as T;
}
