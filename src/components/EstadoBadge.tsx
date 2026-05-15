import { ETIQUETA_ESTADO, type EstadoIncidencia } from "@/lib/types";

const COLOR_ESTADO: Record<EstadoIncidencia, string> = {
  reportada: "bg-amber-100 text-amber-800",
  en_revision: "bg-blue-100 text-blue-800",
  en_proceso: "bg-indigo-100 text-indigo-800",
  resuelta: "bg-green-100 text-green-800",
  rechazada: "bg-zinc-200 text-zinc-700",
};

export default function EstadoBadge({ estado }: { estado: EstadoIncidencia }) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${COLOR_ESTADO[estado]}`}
    >
      {ETIQUETA_ESTADO[estado]}
    </span>
  );
}
