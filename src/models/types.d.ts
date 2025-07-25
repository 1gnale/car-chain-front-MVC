interface Brand {
  id: number;
  nombre: string;
  descripcion: string;
  modelos: Modelo[];
}

interface Modelo {
  id: number;
  nombre: string;
  descripcion: string;
  versiones: Version[];
}

interface Version {
  id: number;
  nombre: string;
  descripcion: string;
  precio_mercado: number;
  precio_mercado_gnc: number;
}

interface Provincias {
  id: number;
  descripcion: string;
  localidades: Localidades[];
}

interface Localidades {
  id: number;
  descripcion: string;
  codigoPostal: string;
}

interface Cobertura {
  id_cobertura: number;
  nombre: string;
  descripcion: string;
  recargo_por_atraso: number;
}

interface Cobertura_Detalle {
  cobertura: Cobertura;
  detalle: Detalle;
  aplica: boolean;
}

interface Detalle {
  id_detalle: number;
  nombre: string;
  descripcion: string;
  porcentaje_miles: number | null;
  monto_fijo: number | null;
}

// Interfaces pura y exclusivamente usadas para el renderizado rapido
interface Cobertura_AllData {
  id_cobertura: number;
  nombre: string;
  descripcion: string;
  recargo_por_atraso: number;
  detalles: Detalle_Data[];
}

interface Detalle_AllData {
  id_detalle: number;
  nombre: string;
  descripcion: string;
  porcentaje_miles: number | null;
  monto_fijo: number | null;
  aplica: boolean;
}
