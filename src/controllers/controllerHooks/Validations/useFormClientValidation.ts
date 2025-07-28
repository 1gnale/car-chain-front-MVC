import { useState, useEffect } from "react";

interface ClientFormData {
  nombre: string;
  apellido: string;
  tipoDocumento: string;
  documento: string;
  fechaNacimiento: string;
  telefono: string;
  sexo: string;
  provincia: string;
  localidad: string;
  domicilio: string;
}

interface ValidationErrors {
  nombre?: string;
  apellido?: string;
  tipoDocumento?: string;
  documento?: string;
  fechaNacimiento?: string;
  telefono?: string;
  sexo?: string;
  provincia?: string;
  localidad?: string;
  domicilio?: string;
}

interface UseFormValidationReturn {
  errors: ValidationErrors;
  isValid: boolean;
  validateField: (
    fieldName: keyof ValidationErrors,
    value: string | boolean
  ) => void;
  validateForm: (formData: ClientFormData) => boolean;
  clearErrors: () => void;
  clearFieldError: (fieldName: keyof ValidationErrors) => void;
}

const useFormValidation = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  // Patrones de validación
  const patterns = {
    nombre: /^[A-Z]{2,100}$/,
    apellido: /^[A-Z]{2,100}$/,
    documento: /^[A-Z0-9]{5,11}$/,
    telefono: /^\d{5,20}$/,
    domicilio: /^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9°#.\s]{5,100}$/,
    fechaNacimiento: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
  };

  // VER PARA VALIDAR FECHA

  const validateField = (
    fieldName: keyof ValidationErrors,
    value: string | boolean
  ): void => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "nombre":
        const nombreValue = value as string;
        if (!nombreValue.trim()) {
          newErrors.nombre = "El nombre es requerido";
        } else if (!patterns.nombre.test(nombreValue.toUpperCase())) {
          newErrors.nombre = "El nombre debe ser mayor a 2 letras";
        } else {
          delete newErrors.nombre;
        }
        break;

      case "apellido":
        const apellidoValue = value as string;
        if (!apellidoValue.trim()) {
          newErrors.apellido = "El apellido es requerido";
        } else if (!patterns.apellido.test(apellidoValue.toUpperCase())) {
          newErrors.apellido = "El apellido debe ser mayor a 2 letras";
        } else {
          delete newErrors.apellido;
        }
        break;

      case "tipoDocumento":
        if (!value || value === "") {
          newErrors.tipoDocumento = "El tipo de documento es requerido";
        } else {
          delete newErrors.tipoDocumento;
        }
        break;

      case "documento":
        const documentoValue = value as string;
        if (!documentoValue.trim()) {
          newErrors.documento = "El documento es requerido";
        } else if (!patterns.documento.test(documentoValue.toUpperCase())) {
          newErrors.documento =
            "El documento debe ser de minimo 2 caracteres y maximo 11";
        } else {
          delete newErrors.documento;
        }
        break;

      case "telefono":
        const telefonoValue = value as string;
        if (!telefonoValue.trim()) {
          newErrors.telefono = "El telefono es requerido";
        } else if (!patterns.telefono.test(telefonoValue.toUpperCase())) {
          newErrors.telefono =
            "El telefono debe tener un minimo de 5 caracteres";
        } else {
          delete newErrors.telefono;
        }
        break;

      case "sexo":
        console.log("EL SEXO ES: " + value);
        if (!value || value === "") {
          newErrors.sexo = "El tipo de sexo es requerido";
        } else {
          delete newErrors.sexo;
        }
        break;

      case "provincia":
        if (!value || value === "") {
          newErrors.provincia = "La provincia es requerido";
        } else {
          delete newErrors.provincia;
        }
        break;

      case "localidad":
        if (!value || value === "") {
          newErrors.localidad = "La localidad es requerido";
        } else {
          delete newErrors.localidad;
        }
        break;

      case "domicilio":
        const domicilioValue = value as string;
        if (!domicilioValue.trim()) {
          newErrors.domicilio = "El domicilio es requerido";
        } else if (!patterns.domicilio.test(domicilioValue.toUpperCase())) {
          newErrors.domicilio =
            "El domicilio debe contar con una calle y numero";
        } else {
          delete newErrors.domicilio;
        }
        break;

      case "fechaNacimiento":
        const nas = value as string;
        if (!nas.trim()) {
          newErrors.fechaNacimiento = "La fecha de nacimiento es requerido";
        } else if (!patterns.fechaNacimiento.test(nas)) {
          newErrors.fechaNacimiento =
            "La decha de nacimiento debe venir en un formato MM/DD/YYYY";
        } else if (typeof value === "string") {
          const fechaNacimiento = new Date(value);

          if (isNaN(fechaNacimiento.getTime())) {
            newErrors.fechaNacimiento = "La fecha no es válida";
          } else if (fechaNacimiento.getFullYear() < 1900) {
            newErrors.fechaNacimiento = "El año no es válida";
          } else {
            const hoy = new Date();
            const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
            const yaCumplio =
              hoy.getMonth() > fechaNacimiento.getMonth() ||
              (hoy.getMonth() === fechaNacimiento.getMonth() &&
                hoy.getDate() >= fechaNacimiento.getDate());

            const edadReal = yaCumplio ? edad : edad - 1;

            if (edadReal < 18) {
              newErrors.fechaNacimiento =
                "El dueño del vehiculo debe tener al menos 18 años";
            } else {
              delete newErrors.fechaNacimiento;
            }
          }
        } else {
          delete newErrors.fechaNacimiento;
        }

        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = (formData: ClientFormData): boolean => {
    const newErrors: ValidationErrors = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (!patterns.nombre.test(formData.nombre.toUpperCase())) {
      newErrors.nombre = "El nombre debe ser mayor a 2 letras";
    }

    // Validar apellido
    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido";
    } else if (!patterns.apellido.test(formData.apellido.toUpperCase())) {
      newErrors.apellido = "El apellido debe ser mayor a 2 letras";
    }

    // Validar tipoDocumento
    if (!formData.tipoDocumento || formData.tipoDocumento === "") {
      newErrors.tipoDocumento = "El tipo de documento es requerdo";
    }

    // Validar documento
    if (!formData.documento.trim()) {
      newErrors.documento = "El documento es requerido";
    } else if (!patterns.documento.test(formData.documento.toUpperCase())) {
      newErrors.documento =
        "El documento debe ser de minimo 2 caracteres y maximo 11 ";
    }

    // Validar fechaNacimiento
    if (!formData.fechaNacimiento || formData.fechaNacimiento === "") {
      newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
    }

    // Validar telefono
    if (!formData.telefono.trim()) {
      newErrors.telefono = "El número de motor es requerido";
    } else if (!patterns.telefono.test(formData.telefono.toUpperCase())) {
      newErrors.telefono = "El telefono debe tener un minimo de 5 caracteres";
    }

    // Validar sexo
    if (!formData.sexo || formData.sexo === "") {
      newErrors.sexo = "El tipo sexo es requerido-";
    }
    // Validar provincia
    if (!formData.provincia || formData.provincia === "") {
      newErrors.provincia = "La provincia es requerida";
    }
    // Validar localidad
    if (!formData.localidad || formData.localidad === "") {
      newErrors.localidad = "La localidad es requerida";
    }
    // Validar domicilio
    if (!formData.domicilio.trim()) {
      newErrors.domicilio = "El domicilio es requerido";
    } else if (!patterns.domicilio.test(formData.domicilio.toUpperCase())) {
      newErrors.domicilio = "El domicilio debe tener al menos 5 caracteres";
    }

    // Validar fecha nacimiento
    if (!formData.fechaNacimiento.trim()) {
      newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = (): void => {
    setErrors({});
  };

  const clearFieldError = (fieldName: keyof ValidationErrors): void => {
    const newErrors = { ...errors };
    delete newErrors[fieldName];
    setErrors(newErrors);
  };

  // Actualizar isValid cuando cambien los errores
  useEffect(() => {
    setIsValid(Object.keys(errors).length === 0);
  }, [errors]);

  return {
    errors,
    isValid,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError,
  };
};

export default useFormValidation;
