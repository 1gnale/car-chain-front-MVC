import { useState, useEffect } from "react";

interface errorDetalle {
  nombre?: string;
  cantidadMeses?: string;
  descuento?: string;
}

interface UseFormValidationReturn {
  errors: errorDetalle;
  isValid: boolean;
  validateField: (
    fieldName: keyof errorDetalle,
    value: string | boolean
  ) => void;
  validateForm: (formData: errorDetalle) => boolean;
  clearErrors: () => void;
  clearFieldError: (fieldName: keyof errorDetalle) => void;
}

const usePayementPeriodsValidation = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<errorDetalle>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  // Patrones de validación
  const patterns = {
    // Nombre y descripción: letras y números
    nombre: /^.{2,50}$/,
    descripcion: /^.{5,100}$/,

    // descuento: entre 0 y 10 (incluye 0 y 10)
    descuento: /^(?:10(?:\.0+)?|[0-9](?:\.[0-9]+)?)$/,
    // cantidadMeses: numero grande
    cantidadMeses: /^\d{1,20}(\.\d{1,2})?$/,
  };

  // VER PARA VALIDAR FECHA

  const validateField = (
    fieldName: keyof errorDetalle,
    value: string | boolean
  ): void => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "nombre":
        const nombreValue = value as string;
        if (!nombreValue.trim()) {
          newErrors.nombre = "El nombre es requerido";
        } else if (!patterns.nombre.test(nombreValue.toUpperCase())) {
          newErrors.nombre = "El nombre debe ser mayor a 2 caracteres";
        } else {
          delete newErrors.nombre;
        }
        break;

      case "descuento":
        const porcentajeValue = value as string;
        if (!porcentajeValue.trim()) {
          newErrors.descuento = "El descuento es requerido";
        } else if (!patterns.descuento.test(porcentajeValue.toUpperCase())) {
          newErrors.descuento = "El descuento debe ser un numero del 0 al 10";
        } else {
          delete newErrors.descuento;
        }
        break;

      case "cantidadMeses":
        const montoValue = value as string;
        if (!montoValue.trim()) {
          newErrors.cantidadMeses = "La catidad de meses es requerido";
        } else if (!patterns.cantidadMeses.test(montoValue.toUpperCase())) {
          newErrors.cantidadMeses =
            "La catidad de meses debe ser un numero mayor a 0";
        } else {
          delete newErrors.cantidadMeses;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = (formData: errorDetalle): boolean => {
    const newErrors: errorDetalle = {};

    // Validar nombre
    if (!formData.nombre!.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (!patterns.nombre.test(formData.nombre!.toUpperCase())) {
      newErrors.nombre = "El nombre debe ser mayor a 2 letras";
    }

    // Validar cantidadMeses
    if (!formData.cantidadMeses!.trim()) {
      newErrors.cantidadMeses! = "El cantidadMeses! es requerido";
    } else if (
      !patterns.cantidadMeses!.test(formData.cantidadMeses!.toUpperCase())
    ) {
      newErrors.cantidadMeses! = "El cantidadMeses! debe ser mayor a 2 letras";
    }

    // Validar procentaje en miles
    if (!formData.descuento!.trim()) {
      newErrors.descuento! = "El descuento es requerido";
    } else if (!patterns.descuento!.test(formData.descuento!.toUpperCase())) {
      newErrors.descuento! = "El descuento debe un numero entre 0 y 10";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = (): void => {
    setErrors({});
  };

  const clearFieldError = (fieldName: keyof errorDetalle): void => {
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

export default usePayementPeriodsValidation;
