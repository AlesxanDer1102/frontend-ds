export type Categoria =
  | "bache"
  | "alumbrado"
  | "basura"
  | "seguridad"
  | "emergencia";

export type EstadoIncidencia =
  | "reportada"
  | "en_revision"
  | "en_proceso"
  | "resuelta"
  | "rechazada";

export interface Incidencia {
  id: number;
  categoria: Categoria;
  descripcion: string;
  ubicacion: string;
  estado: EstadoIncidencia;
  imagen_url: string;
  creada_en: string;
  actualizada_en: string;
}

export const CATEGORIAS: Categoria[] = [
  "bache",
  "alumbrado",
  "basura",
  "seguridad",
  "emergencia",
];

export const ETIQUETA_CATEGORIA: Record<Categoria, string> = {
  bache: "Bache",
  alumbrado: "Alumbrado",
  basura: "Basura",
  seguridad: "Seguridad ciudadana",
  emergencia: "Emergencia",
};

export const ETIQUETA_ESTADO: Record<EstadoIncidencia, string> = {
  reportada: "Reportada",
  en_revision: "En revision",
  en_proceso: "En proceso",
  resuelta: "Resuelta",
  rechazada: "Rechazada",
};
