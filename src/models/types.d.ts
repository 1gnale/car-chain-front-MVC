interface Provincia {
  id: number;
  descripcion?: string;
}

interface Localidad {
  id: number;
  descripcion?: string;
  codigoPostal?: string; 
  provincia?: Provincia;
}

interface Persona {
  id: number;
  nombres?: string;
  apellido?: string;
  fechaNacimiento?: string;
  tipoDocumento?: string;
  documento?: string;
  domicilio?: string;
  correo?: string;
  telefono?: string;
  sexo?: string;
  contraseña?: string;
  localidad?: Localidad; 
}

interface Cliente extends Persona {
  idClient: number;
}

interface Usuario extends Persona {
  idUsuario: number;
  estado?: string;
  legajo?: string;
  tipoUsuario?: string;
}

interface Vehiculo {
  id: number;
  matricula?: string;
  chasis?: string;
  añoFabricacion?: number;
  numeroMotor?: string;
  gnc?: boolean;
  version: Version;
  cliente?: Cliente;
}

interface Marca {
  id: number;
  nombre?: string;
  descripcion?: string;
}

interface Modelo {
  id: number;
  nombre?: string;
  descripcion?: string;
  marca: Marca;
}

interface Version {
  id: number;
  nombre?: string;
  descripcion?: string;
  precio_mercado: number;
  precio_mercado_gnc?: number;
  modelo: Modelo;
}

interface ConfigEdad {
  id?: number;
  nombre?: string;
  minima?: number;
  maxima?: number;
  descuento?: number;
  ganancia?: number;
  recargo?: number;
  activo?: boolean;
}

interface ConfigAntiguedad {
  id?: number;
  nombre?: string;
  minima?: number;
  maxima?: number;
  descuento?: number;
  ganancia?: number;
  recargo?: number;
  activo?: boolean;
}

interface ConfigLocalidad {
  id?: number;
  nombre?: string;
  descuento?: number;
  ganancia?: number;
  recargo?: number;
  activo?: boolean;
  localidad?: Localidad;
}

interface Cotizacion {
  fechaCreacion?: string;
  fechaVencimiento?: string;
  vehiculo?: Vehiculo;
  configuaracionLocalidad?: ConfigLocalidad;
  configudacionEdad?: ConfigEdad;
  configuracionAntiguedad?: ConfigAntiguedad;
}

interface Linea_Cotizacion {
  id: number;
  monto?: number;
  cotizacion?: Cotizacion;
  cobertura?: Cobertura;
}

interface Cobertura {
  id_cobertura: number;
  nombre?: string;
  descripcion?: string;
  recargoPorAtraso?: number;
}

interface Cobertura_Detalle {
  id: number;
  cobertura: Cobertura;
  detalle: Detalle;
  aplica: boolean;
}

interface Detalle {
  id: number;
  nombre?: string;
  descripcion?: string;
  porcentaje_miles?: number;
  monto_fijo?: number;
  activodetalle?: boolean;
}

interface Documentacion {
  fotoFrontal?: File;
  fotoTrasera?: File;
  fotoLateral1?: File;
  fotoLateral2?: File;
  fotoTecho?: File;
  cedulaVerde?: File;
}

interface Pago {
  id: number;
  total?: number;
  fecha?: string;
  hora?: string;
  poliza: Poliza;
}

interface Siniesto {
  id: number;
  fechaSiniestro?: string;
  horaSiniestro?: string;
  usuario: Usuario;
  estado?: string;
  //fotoDenuncia?=
  //fotoVehiculo?=
}

interface Revision {
  id: number;
  fecha?: string;
  hora?: string;
  estado?: string;
  usuario: Usuario;
  poliza: Poliza;
}

interface PeriodoPago {
  id: number;
  nombre?: string;
  cantidadMesas?: number;
  descuento?: number;
  activo?: boolean;
}

interface TipoContratacion {
  id: number;
  nombre?: string;
  cantidadMeses?: number;
  activo?: boolean;
}

interface Poliza {
  numero_poliza?: number;
  precioPolzaActual?: number;
  montoAsegurado?: number;
  fechaContratacion?: string;
  horaContratacion?: string;
  fechaVencimiento?: string;
  fechaCancelacion?: string;
  renovacionAutomatica?: boolean;
  usuario?: Usuario;
  documentacion?: Documentacion;
  estadoPoliza?: string;
  lineaContizacion?: Linea_Cotizacion;
  periodoPago?: PeriodoPago;
  tipoContratacion?: TipoContratacion;
}
