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
  descripcion?: string;
  localidades?: Localidades[];
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

interface ConfigEdad {
  id: number;
  nombre: string;
  minima: number;
  maxima: number;
  descuento: number;
  ganancia: number;
  recargo: number;
  activo: boolean;
}

interface ConfigAntiguedad {
  id: number;
  nombre: string;
  minima: number;
  maxima: number;
  descuento: number;
  ganancia: number;
  recargo: number;
  activo: boolean;
}

export interface ConfigLocalidad {
  id: number;
  nombre: string;
  descuento: number;
  ganancia: number;
  recargo: number;
  activo: boolean;
  localidad?: Localidades;
}

interface Cotizacion {
  id_cotizacion: number;
  fecha_creacion: string;
  fecha_vencimiento: string;
  config_edad: ConfigEdad;
  config_antiguedad: ConfigAntiguedad;
  config_localidad: ConfigLocalidad;
  lineas: LineaCotizacion[];
}

interface LINEA_COTIZACION {
  monto: number;
  cotizacion: Cotizacion;
  cobertura: Cobertura;
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

interface allConfigs {
  config_antiguedad?: ConfigAntiguedad[];
  config_edad?: ConfigEdad[];
  config_localidad?: ConfigLocalidad[];
}
