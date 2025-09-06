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
                            hash_transaccion: data.hashContrato,
                            direccion_contrato:"0xaAe2E8b80E9eDFf62E8D1B7127249aBbed43daE0",
                            fecha_despliegue: data.fechaContratacion,
                            estado: "Activo",
                            monto: data.montoAsegurado || data.total || 25000,
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
