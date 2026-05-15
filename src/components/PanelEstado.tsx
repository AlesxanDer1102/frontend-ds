"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { actualizarEstado } from "@/lib/api";
import { ETIQUETA_ESTADO, type EstadoIncidencia } from "@/lib/types";
import { transicionesValidas } from "@/lib/workflow";

export default function PanelEstado({
  id,
  estado,
}: {
  id: number;
  estado: EstadoIncidencia;
}) {
  const router = useRouter();
  const opciones = transicionesValidas(estado);
  const [seleccion, setSeleccion] = useState<EstadoIncidencia | "">("");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function aplicar() {
    if (!seleccion) return;
    setError(null);
    setGuardando(true);
    try {
      await actualizarEstado(id, seleccion);
      setSeleccion("");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo actualizar el estado.",
      );
    } finally {
      setGuardando(false);
    }
  }

  if (opciones.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        Esta incidencia esta en un estado final y no admite cambios.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4">
      <span className="text-sm font-medium text-zinc-700">
        Cambiar estado (autoridad)
      </span>

      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <select
          value={seleccion}
          onChange={(e) => setSeleccion(e.target.value as EstadoIncidencia)}
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
        >
          <option value="">Selecciona un nuevo estado</option>
          {opciones.map((op) => (
            <option key={op} value={op}>
              {ETIQUETA_ESTADO[op]}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={aplicar}
          disabled={!seleccion || guardando}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {guardando ? "Guardando..." : "Aplicar"}
        </button>
      </div>
    </div>
  );
}
