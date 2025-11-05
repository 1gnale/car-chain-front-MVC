// frontend/components/CheckoutButton

const ControladorPruebaPago = () => {
  return <CheckoutButton />;
};

export default ControladorPruebaPago;

const CheckoutButton = () => {
  const baseURL = import.meta.env.BASE_URL;
  const handleBuy = async () => {
    try {
      const res = await fetch(`${baseURL}/api/pago/crearPrimerPago`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          poliza_numero: 1,
          total: 150,
          descripcion: "Seguro automotor - cobertura total",
          payer_email: "test_user_1900602670@testuser.com",
          payer_name: "Juan",
          payer_surname: "Pérez",
          payer_phone: "+385555555",
          payer_identification: "12345678",
          back_urls: {
            //   success: "https://4bb0c22b9817.ngrok-free.app/sucess",
            //   failure: "https://4bb0c22b9817.ngrok-free.app/failure",
            //   pending: "https://4bb0c22b9817.ngrok-free.app/pending",
          },
          external_reference: "REF-12345",
          idTipoContratacion: 1,
          idPeriodoPago: 1,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const initPoint = data.init_point;
      window.location.href = initPoint; // Redirige al Checkout Pro
      //("Pago exitoso");
    } catch (error) {
      console.error("Error iniciando pago:", error);
    }
  };

  return <button onClick={handleBuy}>Comprar ahora</button>;
};
