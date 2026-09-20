import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

type AppStatus = "active" | "soon";
type AppAccess = "enabled" | "disabled" | "soon";
type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

type AppLink = {
  id: string;
  name: string;
  label: string;
  description: string;
  href: string;
  permissionCode: string;
  logo: string;
  status: AppStatus;
  accentText: string;
  accentBorder: string;
  accentBg: string;
  buttonClass: string;
  glowClass: string;
};

type ResolvedAppLink = AppLink & { access: AppAccess };

const CANONICAL_APPS: AppLink[] = [
  { id: "shell", name: "Vento OS", label: "Hub", description: "Launcher central del ecosistema Vento OS.", href: "https://os.ventogroup.co", permissionCode: "shell.access", logo: "/icon.svg", status: "active", accentText: "text-zinc-700", accentBorder: "border-zinc-200", accentBg: "bg-zinc-50", buttonClass: "bg-zinc-800 hover:bg-zinc-900 shadow-zinc-500/20", glowClass: "group-hover:shadow-zinc-500/18" },
  { id: "anima", name: "ANIMA", label: "Personas y asistencia", description: "Jornadas, asistencia y contexto laboral.", href: "https://anima.ventogroup.co", permissionCode: "anima.access", logo: "/logos/anima.svg", status: "active", accentText: "text-teal-700", accentBorder: "border-teal-200", accentBg: "bg-teal-50", buttonClass: "bg-teal-600 hover:bg-teal-700 shadow-teal-500/20", glowClass: "group-hover:shadow-teal-500/18" },
  { id: "viso", name: "VISO", label: "Gerencia y auditoria", description: "Gestion centralizada de equipo, sedes, permisos y vision ejecutiva.", href: "https://viso.ventogroup.co", permissionCode: "viso.access", logo: "/logos/viso.svg", status: "active", accentText: "text-violet-700", accentBorder: "border-violet-200", accentBg: "bg-violet-50", buttonClass: "bg-violet-600 hover:bg-violet-700 shadow-violet-500/20", glowClass: "group-hover:shadow-violet-500/18" },
  { id: "nexo", name: "NEXO", label: "Inventario y logistica", description: "Control operativo de stock, remisiones, ubicaciones y abastecimiento.", href: "https://nexo.ventogroup.co", permissionCode: "nexo.access", logo: "/logos/nexo.svg", status: "active", accentText: "text-amber-700", accentBorder: "border-amber-200", accentBg: "bg-amber-50", buttonClass: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20", glowClass: "group-hover:shadow-amber-500/18" },
  { id: "fogo", name: "FOGO", label: "Produccion", description: "Recetas, preparaciones, lotes y trazabilidad de produccion.", href: "https://fogo.ventogroup.co", permissionCode: "fogo.access", logo: "/logos/fogo.svg", status: "active", accentText: "text-orange-700", accentBorder: "border-orange-200", accentBg: "bg-orange-50", buttonClass: "bg-orange-600 hover:bg-orange-700 shadow-orange-500/20", glowClass: "group-hover:shadow-orange-500/18" },
  { id: "origo", name: "ORIGO", label: "Compras", description: "Ordenes de compra, proveedores, recepcion y abastecimiento externo.", href: "https://origo.ventogroup.co", permissionCode: "origo.access", logo: "/logos/origo.svg", status: "active", accentText: "text-emerald-700", accentBorder: "border-emerald-200", accentBg: "bg-emerald-50", buttonClass: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20", glowClass: "group-hover:shadow-emerald-500/18" },
  { id: "pulso", name: "PULSO", label: "POS y experiencia", description: "Clientes, redenciones, salon, pedidos y operacion en punto de venta.", href: "https://pulso.ventogroup.co", permissionCode: "pulso.access", logo: "/logos/pulso.svg", status: "active", accentText: "text-cyan-700", accentBorder: "border-cyan-200", accentBg: "bg-cyan-50", buttonClass: "bg-cyan-500 hover:bg-cyan-600 shadow-cyan-500/20", glowClass: "group-hover:shadow-cyan-500/18" },
  { id: "numera", name: "NUMERA", label: "Finanzas", description: "Economia, costos y rentabilidad.", href: "https://numera.ventogroup.co", permissionCode: "numera.access", logo: "/icon.svg", status: "active", accentText: "text-blue-700", accentBorder: "border-blue-200", accentBg: "bg-blue-50", buttonClass: "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20", glowClass: "group-hover:shadow-blue-500/18" },
  { id: "aura", name: "AURA", label: "Marketing y contenido", description: "Identidad canonica reservada; producto web no disponible en el roadmap actual.", href: "", permissionCode: "aura.access", logo: "/logos/aura.svg", status: "soon", accentText: "text-fuchsia-700", accentBorder: "border-fuchsia-200", accentBg: "bg-fuchsia-50", buttonClass: "bg-fuchsia-600", glowClass: "" },
  { id: "pass", name: "Vento Pass", label: "Clientes", description: "Identidad canonica de cliente sin destino web aprobado.", href: "", permissionCode: "pass.access", logo: "/icon.svg", status: "soon", accentText: "text-teal-700", accentBorder: "border-teal-200", accentBg: "bg-teal-50", buttonClass: "bg-teal-600", glowClass: "" },
];

const INTERNAL_APPS: AppLink[] = CANONICAL_APPS.filter((app) => app.id !== "shell");

function splitPermissionCode(permissionCode: string) {
  const normalized = permissionCode.trim();
  const dotIndex = normalized.indexOf(".");

  if (dotIndex === -1) {
    return {
      appId: normalized,
      code: "access",
    };
  }

  return {
    appId: normalized.slice(0, dotIndex),
    code: normalized.slice(dotIndex + 1),
  };
}

async function resolveAccess(
  supabase: SupabaseClient,
  app: AppLink
): Promise<AppAccess> {
  if (app.status === "soon" || !app.href) return "soon";
  if (app.id === "shell") return "enabled";

  const { data: fullCodeResult, error: fullCodeError } = await supabase.rpc(
    "has_permission",
    {
      p_permission_code: app.permissionCode,
      p_site_id: null,
      p_area_id: null,
    }
  );

  if (!fullCodeError) {
    return fullCodeResult ? "enabled" : "disabled";
  }

  const { appId, code } = splitPermissionCode(app.permissionCode);

  const { data: splitCodeResult, error: splitCodeError } = await supabase.rpc(
    "has_permission",
    {
      p_app_id: appId,
      p_code: code,
      p_site_id: null,
      p_area_id: null,
    }
  );

  if (splitCodeError) return "disabled";

  return splitCodeResult ? "enabled" : "disabled";
}

async function resolveApps(supabase: SupabaseClient): Promise<ResolvedAppLink[]> {
  const accessResults = await Promise.all(
    INTERNAL_APPS.map((app) => resolveAccess(supabase, app))
  );

  return INTERNAL_APPS.map((app, index) => ({
    ...app,
    access: accessResults[index],
  }));
}

function initialsFromEmail(email: string) {
  if (!email) return "US";

  return (
    email
      .split("@")[0]
      .split(/[._-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "US"
  );
}

function AppCard({ app }: { app: ResolvedAppLink }) {
  const isEnabled = app.access === "enabled";

  return (
    <article
      className={`group flex min-h-[360px] flex-col rounded-[28px] border border-zinc-200/80 bg-white/88 p-6 shadow-xl shadow-zinc-900/6 ring-1 ring-white/80 backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:shadow-2xl ${app.glowClass}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-3xl border ${app.accentBorder} ${app.accentBg} shadow-sm`}
        >
          <Image src={app.logo} alt={`${app.name} logo`} width={38} height={38} />
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            isEnabled
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-zinc-200 bg-zinc-100 text-zinc-500"
          }`}
        >
          {isEnabled ? "Disponible" : app.access === "soon" ? "Proximamente" : "Sin acceso"}
        </span>
      </div>

      <div className="mt-7 flex-1">
        <h3 className="text-3xl font-semibold tracking-[-0.035em] text-zinc-950">
          {app.name}
        </h3>

        <p className={`mt-1 text-sm font-semibold ${app.accentText}`}>
          {app.label}
        </p>

        <p className="mt-5 text-sm leading-7 text-zinc-600">
          {app.description}
        </p>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4 border-t border-zinc-200/70 pt-5">
        <span className={`h-1.5 flex-1 rounded-full ${app.accentBg}`} />

        {isEnabled ? (
          <a
            href={app.href}
            className={`inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 ${app.buttonClass}`}
          >
            Abrir
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex h-11 cursor-not-allowed items-center justify-center rounded-2xl bg-zinc-100 px-5 text-sm font-semibold text-zinc-400"
            aria-disabled="true"
          >
            {app.access === "soon" ? "Proximamente" : "Bloqueada"}
          </button>
        )}
      </div>
    </article>
  );
}

function AppLogoRail({ apps }: { apps: ResolvedAppLink[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {apps.map((app) => (
        <div
          key={app.id}
          className={`flex h-12 w-12 items-center justify-center rounded-2xl border bg-white/85 shadow-sm ${
            app.access === "enabled"
              ? `${app.accentBorder}`
              : "border-zinc-200 opacity-45 grayscale"
          }`}
          title={app.name}
        >
          <Image src={app.logo} alt={`${app.name} logo`} width={28} height={28} />
        </div>
      ))}
    </div>
  );
}

export default async function Home() {
  const supabase = await createClient();
  const { data: userRes } = await supabase.auth.getUser();
  const user = userRes.user;

  if (!user) {
    redirect("/login?returnTo=/");
  }

  async function signOutAction() {
    "use server";

    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login?returnTo=/");
  }

  const apps = await resolveApps(supabase);
  const accessibleApps = apps.filter((app) => app.access === "enabled");
  const blockedApps = apps.filter((app) => app.access !== "enabled");

  const userEmail = user.email ?? "";
  const userInitials = initialsFromEmail(userEmail);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8F6F1] text-zinc-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-18rem] top-[-18rem] h-[46rem] w-[46rem] rounded-full bg-amber-100/65 blur-3xl" />
        <div className="absolute right-[-18rem] top-[-16rem] h-[44rem] w-[44rem] rounded-full bg-cyan-100/70 blur-3xl" />
        <div className="absolute bottom-[-22rem] left-[26%] h-[40rem] w-[40rem] rounded-full bg-violet-100/45 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.26)_42%,rgba(255,255,255,0.46)_100%)]" />
      </div>

      <header className="relative z-10 border-b border-white/70 bg-white/72 backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <Image src="/apps/hub.png" alt="Vento OS logo" width={30} height={30} />
            </div>

            <div>
              <div className="text-base font-semibold tracking-tight text-zinc-950">
                Vento OS
              </div>
              <div className="text-xs font-medium text-zinc-500">
                Workspace
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-sm font-medium text-zinc-500 md:block">
              ventogroup.co
            </div>

            <details className="group relative">
              <summary className="list-none">
                <span className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 bg-white/90 px-3 py-2 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-white">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">
                    {userInitials}
                  </span>
                  <span className="hidden sm:inline">Usuario</span>
                </span>
              </summary>

              <div className="absolute right-0 z-30 mt-2 w-72 overflow-hidden rounded-3xl border border-zinc-200 bg-white/96 p-2 shadow-2xl shadow-zinc-900/12 backdrop-blur-xl">
                <div className="rounded-2xl px-3 py-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    Sesión activa
                  </div>
                  <div className="mt-1 truncate text-sm font-semibold text-zinc-800">
                    {userEmail || "-"}
                  </div>
                </div>

                <Link
                  href="/"
                  className="mt-1 block rounded-2xl px-3 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
                >
                  Mi perfil
                </Link>

                <Link
                  href="/"
                  className="mt-1 block rounded-2xl px-3 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
                >
                  Configuración de usuario
                </Link>

                <form action={signOutAction} className="mt-1">
                  <button
                    type="submit"
                    className="block w-full rounded-2xl px-3 py-2.5 text-left text-sm font-semibold text-red-700 transition hover:bg-red-50"
                  >
                    Cerrar sesión
                  </button>
                </form>
              </div>
            </details>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <div className="overflow-hidden rounded-[34px] border border-zinc-200/70 bg-white/82 p-8 shadow-2xl shadow-zinc-900/8 backdrop-blur-2xl sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 shadow-sm">
              Centro de aplicaciones
            </div>

            <h1 className="mt-7 max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-zinc-950 sm:text-6xl">
              Vento OS
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              Acceso centralizado a los módulos web internos de Vento Group.
              Entra a cada aplicación según tus permisos operativos.
            </p>

            <div className="mt-8">
              <AppLogoRail apps={apps} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[28px] border border-zinc-200/70 bg-white/82 p-6 shadow-xl shadow-zinc-900/6 backdrop-blur-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                Disponibles
              </div>
              <div className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
                {accessibleApps.length}
              </div>
            </div>

            <div className="rounded-[28px] border border-zinc-200/70 bg-white/82 p-6 shadow-xl shadow-zinc-900/6 backdrop-blur-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                Sin acceso
              </div>
              <div className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
                {blockedApps.length}
              </div>
            </div>

            <div className="rounded-[28px] border border-zinc-200/70 bg-white/82 p-6 shadow-xl shadow-zinc-900/6 backdrop-blur-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                Apps web
              </div>
              <div className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
                {apps.length}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                Aplicaciones
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Ecosistema web operativo de Vento Group.
              </p>
            </div>

            <div className="text-sm font-medium text-zinc-500">
              VISO · NEXO · FOGO · ORIGO · PULSO
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {apps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>

        <footer className="mt-10 border-t border-zinc-200/70 py-6 text-sm text-zinc-500">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>Vento OS</div>
            <div>ventogroup.co</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
