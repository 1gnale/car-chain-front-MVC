import { useState, useEffect } from "react";

interface errorTipoContratacion {
  nombre?: string;
  cantidadMeses?: string;
}

interface UseFormValidationReturn {
  errors: errorTipoContratacion;
  isValid: boolean;
  validateField: (
    fieldName: keyof errorTipoContratacion,
    value: string | boolean
  ) => void;
  validateForm: (formData: errorTipoContratacion) => boolean;
  clearErrors: () => void;
  clearFieldError: (fieldName: keyof errorTipoContratacion) => void;
}

const useHiringTypesValidation = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<errorTipoContratacion>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  // Patrones de validación
  const patterns = {
    // Nombre y descripción: letras y números
    nombre: /^.{2,50}$/,
    descripcion: /^.{5,100}$/,

    // cantidadMeses: numero grande
    cantidadMeses: /^\d{1,20}(\.\d{1,2})?$/,
  };

  // VER PARA VALIDAR FECHA

  const validateField = (
    fieldName: keyof errorTipoContratacion,
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

      case "cantidadMeses":
        const montoValue = value as string;
        if (!montoValue.trim()) {
          newErrors.cantidadMeses = "La cantidad de meses es requerido";
        } else if (!patterns.cantidadMeses.test(montoValue.toUpperCase())) {
          newErrors.cantidadMeses =
            "La cantidad de meses debe ser un numero mayor a 0";
        } else {
          delete newErrors.cantidadMeses;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = (formData: errorTipoContratacion): boolean => {
    const newErrors: errorTipoContratacion = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = (): void => {
    setErrors({});
  };

  const clearFieldError = (fieldName: keyof errorTipoContratacion): void => {
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

export default useHiringTypesValidation;
