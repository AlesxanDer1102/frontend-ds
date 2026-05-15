import Link from "next/link";
import { obtenerIncidencia, urlImagen } from "@/lib/api";
import { ETIQUETA_CATEGORIA, type Incidencia } from "@/lib/types";
import EstadoBadge from "@/components/EstadoBadge";

export default async function PaginaDetalle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let incidencia: Incidencia | null = null;
  let error: string | null = null;

  try {
    incidencia = await obtenerIncidencia(Number(id));
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "No se pudo cargar la incidencia.";
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12">
      <Link href="/" className="text-sm text-zinc-600">
        Volver al listado
      </Link>

      {error && (
        <div className="mt-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      )}

      {incidencia && (
        <article className="mt-4 flex flex-col gap-4">
          <img
            src={urlImagen(incidencia.imagen_url)}
            alt={`Evidencia de la incidencia ${incidencia.id}`}
            className="w-full rounded-lg border border-zinc-200 object-contain"
          />

          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-zinc-900">
              Incidencia #{incidencia.id}
            </h1>
            <EstadoBadge estado={incidencia.estado} />
          </div>

          <dl className="grid gap-3 text-sm">
            <div>
              <dt className="font-medium text-zinc-500">Categoria</dt>
              <dd className="text-zinc-800">
                {ETIQUETA_CATEGORIA[incidencia.categoria]}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-500">Descripcion</dt>
              <dd className="text-zinc-800">{incidencia.descripcion}</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-500">Ubicacion</dt>
              <dd className="text-zinc-800">{incidencia.ubicacion}</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-500">Fecha de reporte</dt>
              <dd className="text-zinc-800">
                {new Date(incidencia.creada_en).toLocaleString()}
              </dd>
            </div>
          </dl>
        </article>
      )}
    </main>
  );
}
