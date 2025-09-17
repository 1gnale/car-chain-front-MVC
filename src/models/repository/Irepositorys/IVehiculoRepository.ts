interface VehicleCreatePayload {
  matricula?: string;
  chasis?: string;
  añoFabricacion?: number;
  numeroMotor?: string;
  gnc?: boolean;
  version_id?: number;
  cliente_id?: number;
}

export default interface IVehiculoRepository {
  createVehicle(vehiculo: VehicleCreatePayload, authToken?: string): Promise<Vehiculo>;
}