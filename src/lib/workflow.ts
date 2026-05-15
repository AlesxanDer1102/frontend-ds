import type { EstadoIncidencia } from "@/lib/types";

const TRANSICIONES: Record<EstadoIncidencia, EstadoIncidencia[]> = {
  reportada: ["en_revision", "rechazada"],
  en_revision: ["en_proceso", "rechazada"],
  en_proceso: ["resuelta"],
  resuelta: [],
  rechazada: [],
};

export function transicionesValidas(
  estado: EstadoIncidencia,
): EstadoIncidencia[] {
  return TRANSICIONES[estado];
}
