import Link from "next/link";
import { urlImagen } from "@/lib/api";
import { ETIQUETA_CATEGORIA, type Incidencia } from "@/lib/types";
import EstadoBadge from "@/components/EstadoBadge";

export default function TarjetaIncidencia({
  incidencia,
}: {
  incidencia: Incidencia;
}) {
  return (
    <Link
      href={`/incidencias/${incidencia.id}`}
      className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow hover:shadow-md"
    >
      <img
        src={urlImagen(incidencia.imagen_url)}
        alt={`Evidencia de la incidencia ${incidencia.id}`}
        className="h-40 w-full object-cover"
      />
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-900">
            {ETIQUETA_CATEGORIA[incidencia.categoria]}
          </span>
          <EstadoBadge estado={incidencia.estado} />
        </div>
        <p className="line-clamp-2 text-sm text-zinc-600">
          {incidencia.descripcion}
        </p>
        <span className="text-xs text-zinc-500">{incidencia.ubicacion}</span>
      </div>
    </Link>
  );
}
