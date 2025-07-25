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
