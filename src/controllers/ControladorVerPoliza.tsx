import { useParams } from "react-router-dom";
import useGetPricing from "./controllerHooks/Fetchs/useGetPricingHook";

const ControladorVerCotizacion = () => {

    const { id } = useParams<{ id: string }>();
    const { loading, error, pricing } = useGetPricing(String(id));

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading pricing information.</div>;
    }
    if (!pricing) {
        return <div>No pricing data found.</div>;
    }
    return (
        <div>
            <h1>Cotización {id}</h1>
            <p>Modelo: {pricing.id}</p>
            <p>Versión: {pricing.cobertura?.descripcion}</p>
            <p>Precio: ${pricing.monto}</p>
        </div>
    );
};


export default ControladorVerCotizacion;

