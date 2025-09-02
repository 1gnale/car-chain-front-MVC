import Spinner from "../views/components/GeneralComponents/SpinnerLoader";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ControladorProcesandoPago = () => {
    const { numero_poliza, pagoId, idTipoContratacion, idPeriodoPago } = useParams();
    const navigate = useNavigate();

    useEffect( () => {
        const fetchData = async () => {
            try{
                const response = await fetch(`http://localhost:3000/api/pago/sucess/${numero_poliza}/${pagoId}/${idTipoContratacion}/${idPeriodoPago}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log(data);
                
                // Redirección inmediata al obtener respuesta exitosa con los datos del contrato
                navigate('/pago-exitoso', { 
                    state: { 
                        contratoData: {
                            numero_poliza: numero_poliza,
                            hash_transaccion: data.hash_transaccion || data.transactionHash || "0xf4d2b1a8c7e9f3d2b1a8c7e9f3d2b1a8c7e9f3d2b1a8c7e9f3d2b1a8c7e9f3d2",
                            direccion_contrato: data.direccion_contrato || data.contractAddress || "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
                            fecha_despliegue: new Date().toLocaleDateString('es-AR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            }),
                            estado: data.estado || "Activo",
                            monto: data.monto || data.total || 25000,
                            cobertura: data.cobertura || "Cobertura Total Premium",
                            cliente: {
                                nombre: data.cliente?.nombre || data.payer_name || "Cliente",
                                email: data.cliente?.email || data.payer_email || "cliente@email.com"
                            },
                            vehiculo: {
                                marca: data.vehiculo?.marca || "Toyota",
                                modelo: data.vehiculo?.modelo || "Corolla",
                                año: data.vehiculo?.año || 2022,
                                patente: data.vehiculo?.patente || "ABC-123"
                            }
                        }
                    } 
                });
                
            } catch (error) {
                console.error("Error fetching payment data:", error);
                
                // Redirección inmediata al obtener error del servidor
                navigate('/pago-error'); // Cambia esta ruta por la que necesites
            }
        };
        
        fetchData();
    }, [numero_poliza, pagoId, idTipoContratacion, idPeriodoPago, navigate]);

    return (
    <Spinner />
  )
}

export default ControladorProcesandoPago;
