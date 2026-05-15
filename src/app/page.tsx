import Link from "next/link";
import { listarIncidencias } from "@/lib/api";
import type { Incidencia } from "@/lib/types";
import TarjetaIncidencia from "@/components/TarjetaIncidencia";

export default async function PaginaIncidencias() {
  let incidencias: Incidencia[] = [];
  let error: string | null = null;

  try {
    incidencias = await listarIncidencias();
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "No se pudieron cargar las incidencias.";
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900">
          Incidencias reportadas
        </h1>
        <Link
          href="/reportar"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
        >
          Reportar
        </Link>
      </div>

      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      )}

      {!error && incidencias.length === 0 && (
        <p className="text-sm text-zinc-600">
          Aun no hay incidencias reportadas.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {incidencias.map((incidencia) => (
          <TarjetaIncidencia key={incidencia.id} incidencia={incidencia} />
        ))}
      </div>
    </main>
  );
}
