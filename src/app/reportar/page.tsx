import type { Metadata } from "next";
import FormularioReporte from "@/components/FormularioReporte";

export const metadata: Metadata = {
  title: "Reportar incidencia",
};

export default function PaginaReportar() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-zinc-900">
        Reportar incidencia
      </h1>
      <p className="mt-1 mb-8 text-sm text-zinc-600">
        Completa el formulario y adjunta una fotografia como evidencia.
      </p>
      <FormularioReporte />
    </main>
  );
}
