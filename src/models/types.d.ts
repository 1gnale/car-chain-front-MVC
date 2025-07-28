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
  fechaNacimiento?: Date;
  tipoDocumento?: string;
  documento?: string;
  domicilio?: string;
  correo?: string;
  telefono?: string;
  sexo?: string;
  contraseña?: string;
  localidad: Localidad;
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
  id: number;
  nombre?: string;
  minima?: number;
  maxima?: number;
  descuento?: number;
  ganancia?: number;
  recargo?: number;
  activo?: boolean;
}

interface ConfigAntiguedad {
  id: number;
  nombre?: string;
  minima?: number;
  maxima?: number;
  descuento?: number;
  ganancia?: number;
  recargo?: number;
  activo?: boolean;
}

interface ConfigLocalidad {
  id: number;
  nombre?: string;
  descuento?: number;
  ganancia?: number;
  recargo?: number;
  activo?: boolean;
  localidad: Localidad;
}

interface Cotizacion {
  fechaCreacion?: Date;
  fechaVencimiento?: Date;
  vehiculo?: Vehiculo;
  configuaracionLocalidad?: ConfigLocalidad;
  configudacionEdad?: ConfigEdad;
  configuracionAntiguedad?: ConfigAntiguedad;
}

interface Linea_Cotizacion {
  id?: number;
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
}

interface Documentacion {
  //NO SE QUE HACER
}

interface Pago {
  id: number;
  total?: number;
  fecha?: Date;
  hora?: string;
  poliza: Poliza;
}

interface Siniesto {
  id: number;
  fechaSiniestro?: Date;
  horaSiniestro?: string;
  usuario: Usuario;
  estado?: string;
  //fotoDenuncia?=
  //fotoVehiculo?=
}

interface Revision {
  id: number;
  fecha?: Date;
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
  numero_poliza: number;
  precioPolziaActual?: number;
  montoAsegurado?: number;
  fechaContratacion?: Date;
  horaContratacion?: string;
  fechaVencimiento?: Date;
  fechaCancelacion?: Date;
  renovacionAutomatica?: boolean;
  usuario: Usuario;
  documentacion: Documentacion;
  lineaContizacion: Linea_Cotizacion;
  periodoPago: PeriodoPago;
  tipoContratacion: TipoContratacion;
}
