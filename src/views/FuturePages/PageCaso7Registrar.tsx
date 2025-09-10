"use client"

import { useState } from "react"
import Input from "../components/GeneralComponents/Input"
import SelectForm from "../components/GeneralComponents/SelectForm"


const PersonRegistrationCard = () => {
  // Opciones para los selects
  const sexoOptions = [
    { id: 1, name: "Masculino" },
    { id: 2, name: "Femenino" },
    { id: 3, name: "Otro" }
  ];

  const tipoDocumentoOptions = [
    { id: 1, name: "DNI" },
    { id: 2, name: "Pasaporte" },
    { id: 3, name: "Cédula" }
  ];

  // Mapeo de IDs a valores string
  const sexoMap: {[key: number]: string} = { 1: "masculino", 2: "femenino", 3: "otro" };
  const tipoDocumentoMap: {[key: number]: string} = { 1: "DNI", 2: "pasaporte", 3: "cedula" };

  // Función para obtener ID por valor
  const getSexoId = (value: string): number => {
    return parseInt(Object.keys(sexoMap).find(key => sexoMap[parseInt(key)] === value) || "0");
  };
  const getTipoDocumentoId = (value: string): number => {
    return parseInt(Object.keys(tipoDocumentoMap).find(key => tipoDocumentoMap[parseInt(key)] === value) || "1");
  };

  // Handlers para los selects
  const handleSexoChange = (id: number) => {
    handleInputChange("sexo", sexoMap[id] || "");
  };

  const handleTipoDocumentoChange = (id: number) => {
    handleInputChange("tipoDocumento", tipoDocumentoMap[id] || "DNI");
  };

  const [formData, setFormData] = useState<Persona>({
    id: 0,
    correo: "",
    telefono: "",
    nombres: "",
    apellido: "",
    sexo: "",
    localidad: undefined,
    domicilio: "",
    tipoDocumento: "DNI",
    documento: "",
    fechaNacimiento: ""
  })

  const [errors, setErrors] = useState<Partial<Persona>>({})

  const handleInputChange = (field: keyof Persona, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }

    // Validación especial para fecha de nacimiento
    if (field === "fechaNacimiento" && value) {
      const selectedDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - selectedDate.getFullYear();
      const monthDiff = today.getMonth() - selectedDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
        age--;
      }

      if (selectedDate > today) {
        setErrors((prev) => ({
          ...prev,
          fechaNacimiento: "La fecha de nacimiento no puede ser en el futuro",
        }))
      } else if (age < 18) {
        setErrors((prev) => ({
          ...prev,
          fechaNacimiento: "Debe ser mayor de 18 años",
        }))
      } else if (age > 120) {
        setErrors((prev) => ({
          ...prev,
          fechaNacimiento: "Por favor ingrese una fecha válida",
        }))
      }
    }
  }

  const validateForm = () => {
    const newErrors: Partial<Persona> = {};
    
    // Validaciones básicas
    if (!formData.nombres?.trim()) newErrors.nombres = "Los nombres son requeridos";
    if (!formData.apellido?.trim()) newErrors.apellido = "El apellido es requerido";
    if (!formData.correo?.trim()) newErrors.correo = "El email es requerido";
    if (!formData.documento?.trim()) newErrors.documento = "El documento es requerido";
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
    
    // Validación de email
    if (formData.correo && !/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "El email no es válido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Datos del formulario:", formData)
      alert("Persona registrada exitosamente")
    }
  }

  const handleCancel = () => {
    setFormData({
      id: 0,
      correo: "",
      telefono: "",
      nombres: "",
      apellido: "",
      sexo: "",
      localidad: undefined,
      domicilio: "",
      tipoDocumento: "DNI",
      documento: "",
      fechaNacimiento: ""
    })
    setErrors({})
  }

  return (
    <div className="container-fluid p-4">
      <div className="card shadow-sm">
        <div className="card-header bg-secondary text-white">
          <h4 className="mb-0">Registro de Persona</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="row g-3">
              {/* Primera fila: Email y Teléfono */}
              <div className="col-md-6">
                <Input
                  title="Email"
                  place="Ingrese su email"
                  value={formData.correo}
                  onChange={(value) => handleInputChange("correo", value)}
                  error={errors.correo}
                />
              </div>
              <div className="col-md-6">
                <Input
                  title="Teléfono"
                  place="Ingrese su teléfono"
                  value={formData.telefono}
                  onChange={(value) => handleInputChange("telefono", value)}
                  error={errors.telefono}
                />
              </div>

              {/* Segunda fila: Contraseña (si es necesaria) */}
              <div className="col-md-6">
                <Input
                  title="Contraseña"
                  place="Ingrese su contraseña"
                  value={formData.contraseña || ""}
                  onChange={(value) => handleInputChange("contraseña", value)}
                  error={errors.contraseña}
                />
              </div>

              {/* Tercera fila: Nombres y Apellidos */}
              <div className="col-md-6">
                <Input
                  title="Nombre/s"
                  place="Ingrese sus nombres"
                  value={formData.nombres}
                  onChange={(value) => handleInputChange("nombres", value)}
                  error={errors.nombres}
                />
              </div>
              <div className="col-md-6">
                <Input
                  title="Apellido/s"
                  place="Ingrese sus apellidos"
                  value={formData.apellido}
                  onChange={(value) => handleInputChange("apellido", value)}
                  error={errors.apellido}
                />
              </div>

              {/* Cuarta fila: Sexo y Fecha de Nacimiento */}
              <div className="col-md-6">
                <SelectForm
                  title="Sexo"
                  items={sexoOptions}
                  onChange={handleSexoChange}
                  status={true}
                  value={getSexoId(formData.sexo || "")}
                  error={errors.sexo}
                />
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    <i className="bi bi-calendar-date me-2"></i>
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    className={`form-control ${errors.fechaNacimiento ? 'is-invalid' : ''}`}
                    value={formData.fechaNacimiento}
                    onChange={(e) => handleInputChange("fechaNacimiento", e.target.value)}
                    max={new Date().toISOString().split('T')[0]} // No permite fechas futuras
                    min="1900-01-01" // Fecha mínima razonable
                  />
                  {errors.fechaNacimiento && (
                    <div className="invalid-feedback">
                      {errors.fechaNacimiento}
                    </div>
                  )}
                  <div className="form-text">
                    Seleccione su fecha de nacimiento usando el calendario
                  </div>
                </div>
              </div>

              {/* Quinta fila: Domicilio */}
              <div className="col-md-6">
                <Input
                  title="Domicilio"
                  place="Ingrese su domicilio completo"
                  value={formData.domicilio}
                  onChange={(value) => handleInputChange("domicilio", value)}
                  error={errors.domicilio}
                />
              </div>

              {/* Sexta fila: Tipo de Documento y Documento */}
              <div className="col-md-6">
                <SelectForm
                  title="Tipo de Documento"
                  items={tipoDocumentoOptions}
                  onChange={handleTipoDocumentoChange}
                  status={true}
                  value={getTipoDocumentoId(formData.tipoDocumento || "DNI")}
                  error={errors.tipoDocumento}
                />
              </div>
              <div className="col-md-6">
                <Input
                  title="Documento"
                  place="Ingrese su número de documento"
                  value={formData.documento}
                  onChange={(value) => handleInputChange("documento", value)}
                  error={errors.documento}
                />
              </div>
            </div>

            {/* Botones */}
            <div className="d-flex justify-content-end gap-3 mt-4">
              <button type="button" className="btn btn-secondary px-4" onClick={handleCancel}>
                Cancelar
              </button>
              <button type="button" className="btn btn-secondary px-4" onClick={handleSubmit}>
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PersonRegistrationCard
