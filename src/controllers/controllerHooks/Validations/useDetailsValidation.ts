import { useState, useEffect } from "react";

interface errorDetalle {
  nombre?: string;
  descripcion?: string;
  porcentaje_miles?: string;
  monto_fijo?: string;
  activo?: boolean;
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

const useFormValidationDetail = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<errorDetalle>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  // Patrones de validación
  const patterns = {
    // Nombre y descripción: letras y números
    nombre: /^[A-Za-z0-9\s]{2,50}$/,
    descripcion: /^[A-Za-z0-9\s]{5,100}$/,

    // Porcentaje en miles: entero entre 0 y 10 (incluye 0 y 10)
    porcentaje_miles: /^(?:[0-9]|10)$/,

    // Monto fijo: entero grande
    monto_fijo: /^\d{1,20}$/,
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

      case "descripcion":
        const descripcionValue = value as string;
        if (!descripcionValue.trim()) {
          newErrors.descripcion = "La descripcion es requerido";
        } else if (!patterns.descripcion.test(descripcionValue.toUpperCase())) {
          newErrors.descripcion =
            "El descripcion debe tener un minimo de 5 caracteres";
        } else {
          delete newErrors.descripcion;
        }
        break;

      case "porcentaje_miles":
        const porcentajeValue = value as string;
        if (!porcentajeValue.trim()) {
          newErrors.porcentaje_miles = "El porcentaje en miles es requerido";
        } else if (
          !patterns.porcentaje_miles.test(porcentajeValue.toUpperCase())
        ) {
          newErrors.porcentaje_miles =
            "El porcentaje debe ser un numero del 0 al 10";
        } else {
          delete newErrors.porcentaje_miles;
        }
        break;

      case "monto_fijo":
        const montoValue = value as string;
        if (!montoValue.trim()) {
          newErrors.monto_fijo = "El monto fijo es requerido";
        } else if (!patterns.monto_fijo.test(montoValue.toUpperCase())) {
          newErrors.monto_fijo = "El monto fijo debe ser un numero mayor a 1";
        } else {
          delete newErrors.monto_fijo;
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

    // Validar descripcion
    if (!formData.descripcion!.trim()) {
      newErrors.descripcion! = "El descripcion! es requerido";
    } else if (
      !patterns.descripcion!.test(formData.descripcion!.toUpperCase())
    ) {
      newErrors.descripcion! = "El descripcion! debe ser mayor a 2 letras";
    }

    // Validar procentaje en miles
    if (!formData.porcentaje_miles!.trim()) {
      newErrors.porcentaje_miles! = "El porcentaje en miles es requerido";
    } else if (
      !patterns.porcentaje_miles!.test(formData.porcentaje_miles!.toUpperCase())
    ) {
      newErrors.porcentaje_miles! =
        "El porcentaje en miles debe un numero entre 0 y 10";
    }

    // Validar monto fijo
    if (!formData.monto_fijo!.trim()) {
      newErrors.monto_fijo! = "El monto fijo es requerido";
    } else if (!patterns.monto_fijo!.test(formData.monto_fijo!.toUpperCase())) {
      newErrors.monto_fijo! = "El monto fijo debe ser mayor a 1";
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

export default useFormValidationDetail;
