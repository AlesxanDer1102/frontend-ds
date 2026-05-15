"use client";

import { useEffect, useRef, useState } from "react";
import { crearIncidencia } from "@/lib/api";
import {
  CATEGORIAS,
  ETIQUETA_CATEGORIA,
  type Categoria,
  type Incidencia,
} from "@/lib/types";

const TIPOS_IMAGEN = "image/jpeg,image/png,image/webp";

export default function FormularioReporte() {
  const [categoria, setCategoria] = useState<Categoria>("bache");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creada, setCreada] = useState<Incidencia | null>(null);
  const inputArchivo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  function seleccionarImagen(evento: React.ChangeEvent<HTMLInputElement>) {
    const archivo = evento.target.files?.[0] ?? null;
    setImagen(archivo);
    setPreview(archivo ? URL.createObjectURL(archivo) : null);
  }

  function limpiar() {
    setCategoria("bache");
    setDescripcion("");
    setUbicacion("");
    setImagen(null);
    setPreview(null);
    if (inputArchivo.current) {
      inputArchivo.current.value = "";
    }
  }

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setError(null);
    setCreada(null);

    if (!imagen) {
      setError("Selecciona una imagen como evidencia.");
      return;
    }

    const datos = new FormData();
    datos.append("categoria", categoria);
    datos.append("descripcion", descripcion);
    datos.append("ubicacion", ubicacion);
    datos.append("imagen", imagen);

    setEnviando(true);
    try {
      const incidencia = await crearIncidencia(datos);
      setCreada(incidencia);
      limpiar();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo registrar la incidencia.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="flex flex-col gap-5">
      {creada && (
        <div className="rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
          Incidencia #{creada.id} registrada correctamente con estado{" "}
          {creada.estado}.
        </div>
      )}

      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-zinc-700">Categoria</span>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value as Categoria)}
          className="rounded-md border border-zinc-300 px-3 py-2"
        >
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>
              {ETIQUETA_CATEGORIA[c]}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-zinc-700">Descripcion</span>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          minLength={5}
          maxLength={1000}
          rows={4}
          placeholder="Describe el problema"
          className="rounded-md border border-zinc-300 px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-zinc-700">Ubicacion</span>
        <input
          type="text"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          required
          minLength={3}
          maxLength={255}
          placeholder="Calle, colonia o punto de referencia"
          className="rounded-md border border-zinc-300 px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-zinc-700">Imagen de evidencia</span>
        <input
          ref={inputArchivo}
          type="file"
          accept={TIPOS_IMAGEN}
          onChange={seleccionarImagen}
          className="text-sm"
        />
      </label>

      {preview && (
        <img
          src={preview}
          alt="Vista previa de la evidencia"
          className="max-h-64 w-full rounded-md border border-zinc-200 object-contain"
        />
      )}

      <button
        type="submit"
        disabled={enviando}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {enviando ? "Enviando..." : "Registrar incidencia"}
      </button>
    </form>
  );
}
