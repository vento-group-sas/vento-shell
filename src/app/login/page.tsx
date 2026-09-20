import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/features/auth/login-form";
import { createClient } from "@/lib/supabase/server";

type SearchParams = { returnTo?: string; email?: string };

type CanonicalAppCode = "shell" | "anima" | "viso" | "nexo" | "fogo" | "origo" | "pulso" | "numera" | "aura" | "pass";
type AppMetadata = { appCode: CanonicalAppCode; label: string; description: string; icon: string };
type CanonicalLoginApp = AppMetadata & { host: string | null; webAvailable: boolean };

const CANONICAL_LOGIN_APPS: readonly CanonicalLoginApp[] = [
  { appCode: "shell", label: "Vento OS", description: "Centro de aplicaciones de Vento Group.", icon: "/icon.svg", host: "os.ventogroup.co", webAvailable: true },
  { appCode: "anima", label: "ANIMA", description: "Gestion de personas y asistencia.", icon: "/logos/anima.svg", host: "anima.ventogroup.co", webAvailable: true },
  { appCode: "viso", label: "VISO", description: "Analitica y control operativo.", icon: "/logos/viso.svg", host: "viso.ventogroup.co", webAvailable: true },
  { appCode: "nexo", label: "NEXO", description: "Logistica e inventario operativo.", icon: "/logos/nexo.svg", host: "nexo.ventogroup.co", webAvailable: true },
  { appCode: "fogo", label: "FOGO", description: "Produccion y cocina operativa.", icon: "/logos/fogo.svg", host: "fogo.ventogroup.co", webAvailable: true },
  { appCode: "origo", label: "ORIGO", description: "Ordenes de compra y proveedores.", icon: "/logos/origo.svg", host: "origo.ventogroup.co", webAvailable: true },
  { appCode: "pulso", label: "PULSO", description: "Gestion y seguimiento operativo.", icon: "/logos/pulso.svg", host: "pulso.ventogroup.co", webAvailable: true },
  { appCode: "numera", label: "NUMERA", description: "Economia, costos y rentabilidad.", icon: "/icon.svg", host: "numera.ventogroup.co", webAvailable: true },
  { appCode: "aura", label: "AURA", description: "Identidad canonica diferida; producto web no disponible.", icon: "/logos/aura.svg", host: null, webAvailable: false },
  { appCode: "pass", label: "Vento Pass", description: "Identidad canonica de cliente sin destino web aprobado.", icon: "/icon.svg", host: null, webAvailable: false },
];

const APP_METADATA_BY_HOST: Record<string, AppMetadata> = Object.fromEntries(
  CANONICAL_LOGIN_APPS
    .filter((entry) => entry.webAvailable && entry.host)
    .map((entry) => [String(entry.host), { appCode: entry.appCode, label: entry.label, description: entry.description, icon: entry.icon }])
);

function safeReturnTo(value?: string) {
  const v = (value ?? "").trim();
  if (!v) return "/";
  if (v.startsWith("http://") || v.startsWith("https://")) return v;
  if (!v.startsWith("/")) return "/";
  return v;
}

function appMetadataFromReturnTo(returnTo: string) {
  try {
    const url = new URL(returnTo);
    return APP_METADATA_BY_HOST[url.hostname.toLowerCase()] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}): Promise<Metadata> {
  const sp = (await searchParams) ?? {};
  const appMetadata = appMetadataFromReturnTo(safeReturnTo(sp.returnTo));

  if (!appMetadata) {
    return {
      title: "Vento OS - Hub",
      description: "Centro de aplicaciones de Vento Group.",
      icons: {
        icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
        apple: "/icon.svg",
      },
    };
  }

  return {
    title: `Vento OS - ${appMetadata.label}`,
    description: appMetadata.description,
    applicationName: `Vento ${appMetadata.label}`,
    icons: {
      icon: [{ url: appMetadata.icon, type: "image/svg+xml" }],
      apple: appMetadata.icon,
    },
  };
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const sp = (await searchParams) ?? {};
  const returnTo = safeReturnTo(sp.returnTo);
  const defaultEmail = sp.email ? decodeURIComponent(sp.email) : "";

  const supabase = await createClient();
  const { data: userRes } = await supabase.auth.getUser();
  if (userRes.user) {
    redirect(returnTo || "/");
  }

  return (
    <div className="relative min-h-dvh overflow-y-auto bg-slate-50 text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 -top-24 h-[28rem] w-[28rem] rounded-full bg-amber-300/45 blur-[95px]" />
        <div className="absolute -right-24 top-12 h-96 w-96 rounded-full bg-cyan-300/35 blur-[95px]" />
        <div className="absolute -bottom-24 left-[42%] h-96 w-[34rem] -translate-x-1/2 rounded-full bg-indigo-300/35 blur-[95px]" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(14,165,233,0.12),transparent_42%),radial-gradient(circle_at_84%_18%,rgba(79,70,229,0.1),transparent_36%),radial-gradient(circle_at_50%_88%,rgba(245,158,11,0.1),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#94a3b8_0.5px,transparent_0.5px),linear-gradient(to_bottom,#94a3b8_0.5px,transparent_0.5px)] bg-[size:3.5rem_3.5rem] opacity-[0.05]" />
      </div>

      <div className="relative mx-auto grid min-h-dvh w-full max-w-6xl content-center gap-6 px-4 py-6 sm:px-6 lg:gap-10 lg:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <section className="hidden lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Vento OS Access
          </div>

          <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 lg:text-[3.45rem] lg:leading-[1.03]">
            Un solo acceso para
            <span className="block bg-gradient-to-r from-slate-900 via-indigo-700 to-cyan-700 bg-clip-text text-transparent">
              todo el ecosistema
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            Inicia sesion una vez y entra directo a tus modulos operativos. El acceso respeta tus permisos,
            sede activa y rol de trabajo.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-white/90 p-5 shadow-lg shadow-slate-200/40 backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-wide text-sky-700">Seguridad</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Sesion centralizada, trazabilidad y control de acceso por permisos.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-white/90 p-5 shadow-lg shadow-slate-200/40 backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">Continuidad</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Mismo usuario para Hub, Nexo, Origo, Viso, Fogo y el resto de apps.
              </p>
            </article>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <article className="rounded-xl border border-slate-200/80 bg-white/90 p-4 text-center shadow-lg shadow-slate-200/30 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Apps</p>
              <p className="mt-1 text-xl font-bold text-slate-900">10+</p>
            </article>
            <article className="rounded-xl border border-slate-200/80 bg-white/90 p-4 text-center shadow-lg shadow-slate-200/30 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Sesion</p>
              <p className="mt-1 text-xl font-bold text-slate-900">SSO</p>
            </article>
            <article className="rounded-xl border border-slate-200/80 bg-white/90 p-4 text-center shadow-lg shadow-slate-200/30 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Permisos</p>
              <p className="mt-1 text-xl font-bold text-slate-900">RBAC</p>
            </article>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-lg shadow-slate-200/40 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Apps conectadas
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-cyan-700">NEXO</span>
              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-indigo-700">ORIGO</span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700">PULSO</span>
              <span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-orange-700">FOGO</span>
              <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-violet-700">VISO</span>
              <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-700">AURA</span>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Acceso unificado y experiencia consistente en todo Vento OS.
            </p>
          </div>
        </section>

        <section className="relative w-full max-w-md justify-self-center lg:justify-self-end">
          <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-200/35 via-indigo-200/25 to-amber-200/35 blur-2xl" />
          <div className="relative mb-4 text-center lg:hidden">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Vento OS</div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Acceso operativo</h1>
          </div>
          <LoginForm returnTo={returnTo} defaultEmail={defaultEmail || undefined} />
          <p className="mt-4 text-center text-xs text-slate-500">
            Vento OS · {new Date().getFullYear()} · Acceso corporativo
          </p>
        </section>
      </div>
    </div>
  );
}
