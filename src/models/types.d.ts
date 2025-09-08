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
  activo?: boolean;
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
  activo?: boolean;
}

interface Modelo {
  id: number;
  nombre?: string;
  descripcion?: string;
  marca: Marca;
  activo?: boolean;
}

interface Version {
  id: number;
  nombre?: string;
  descripcion?: string;
  precio_mercado: number;
  precio_mercado_gnc?: number;
  modelo: Modelo;
  activo?: boolean;
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
  activo?: boolean;
}

interface Linea_Cotizacion {
  id: number;
  monto?: number;
  cotizacion?: Cotizacion;
  cobertura?: Cobertura;
  activo?: boolean;
}

interface Cobertura {
  id: number;
  nombre?: string;
  descripcion?: string;
  recargoPorAtraso?: number;
  activo?: boolean;
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
  activo?: boolean;
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

  // Campos de MercadoPago
  mp_payment_id?: string;
  mp_status?: string;
  mp_status_detail?: string;
  mp_external_reference?: string;
  mp_payment_method_id?: string;
  mp_payment_type_id?: string;
  mp_preference_id?: string;
}

interface Siniesto {
  id: number;
  fechaSiniestro?: string;
  horaSiniestro?: string;
  usuario: Usuario;
  estado?: string;
  //fotoDenuncia?=
  //fotoVehiculo?=

  activo?: boolean;
}

interface Revision {
  id: number;
  fecha?: string;
  hora?: string;
  estado?: string;
  usuario: Usuario;
  poliza: Poliza;

  activo?: boolean;
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
