import type { EstadoIncidencia, Incidencia } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export function urlImagen(ruta: string): string {
  return `${API_URL}${ruta}`;
}

async function leerError(respuesta: Response): Promise<string> {
  try {
    const datos = await respuesta.json();
    if (typeof datos?.detail === "string") {
      return datos.detail;
    }
    return "Ocurrio un error en la solicitud";
  } catch {
    return "Ocurrio un error en la solicitud";
  }
}

export async function listarIncidencias(): Promise<Incidencia[]> {
  const respuesta = await fetch(`${API_URL}/incidencias`, { cache: "no-store" });
  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta));
  }
  return respuesta.json();
}

export async function obtenerIncidencia(id: number): Promise<Incidencia> {
  const respuesta = await fetch(`${API_URL}/incidencias/${id}`, {
    cache: "no-store",
  });
  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta));
  }
  return respuesta.json();
}

export async function crearIncidencia(datos: FormData): Promise<Incidencia> {
  const respuesta = await fetch(`${API_URL}/incidencias`, {
    method: "POST",
    body: datos,
  });
  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta));
  }
  return respuesta.json();
}

export async function actualizarEstado(
  id: number,
  estado: EstadoIncidencia,
): Promise<Incidencia> {
  const respuesta = await fetch(`${API_URL}/incidencias/${id}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado }),
  });
  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta));
  }
  return respuesta.json();
}
