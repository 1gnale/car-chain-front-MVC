import { useState, useEffect } from "react";

interface ErrorConfigEdad {
  nombre?: string;
  minima?: string;
  maxima?: string;
  descuento?: string;
  ganancia?: string;
  recargo?: string;
}

interface UseFormValidationReturn {
  errors: ErrorConfigEdad;
  isValid: boolean;
  validateField: (
    fieldName: keyof ErrorConfigEdad,
    value: string | boolean
  ) => void;
  validateForm: (formData: ErrorConfigEdad) => boolean;
  clearErrors: () => void;
  clearFieldError: (fieldName: keyof ErrorConfigEdad) => void;
}

const useFormValidationConfigEdad = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<ErrorConfigEdad>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  // Patrones de validación
  const patterns = {
    nombre: /^.{2,50}$/, // entre 2 y 50 caracteres
    minima: /^[1-9][0-9]*$/, // entero mayor a 0
    maxima: /^[1-9][0-9]*$/, // entero mayor a 0
    descuento: /^(?:0|[1-9]\d*)(?:\.\d+)?$/, // entero mayor a 0
    ganancia: /^(?:0|[1-9]\d*)(?:\.\d+)?$/, // número >= 0
    recargo: /^(?:0|[1-9]\d*)(?:\.\d+)?$/, // número >= 0
  };

  const validateField = (
    fieldName: keyof ErrorConfigEdad,
    value: string | boolean
  ): void => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "nombre":
        if (!(value as string).trim()) {
          newErrors.nombre = "El nombre es requerido";
        } else if (!patterns.nombre.test(value as string)) {
          newErrors.nombre = "El nombre debe tener entre 2 y 50 caracteres";
        } else {
          delete newErrors.nombre;
        }
        break;

      case "minima":
        if (!(value as string).trim()) {
          newErrors.minima = "La edad mínima es requerida";
        } else if (!patterns.minima.test(value as string)) {
          newErrors.minima = "La edad mínima debe ser mayor o igual a 0";
        } else {
          delete newErrors.minima;
        }
        break;

      case "maxima":
        if (!(value as string).trim()) {
          newErrors.maxima = "La edad máxima es requerida";
        } else if (!patterns.maxima.test(value as string)) {
          newErrors.maxima = "La edad máxima debe ser mayor o igual a 0";
        } else {
          delete newErrors.maxima;
        }
        break;

      case "descuento":
        if (!(value as string).trim()) {
          newErrors.descuento = "El descuento es requerido";
        } else if (!patterns.descuento.test(value as string)) {
          newErrors.descuento = "El descuento debe ser mayor o igual a 0";
        } else {
          delete newErrors.descuento;
        }
        break;

      case "ganancia":
        if (!(value as string).trim()) {
          newErrors.ganancia = "La ganancia es requerida";
        } else if (!patterns.ganancia.test(value as string)) {
          newErrors.ganancia =
            "La ganancia debe ser un número mayor o igual a 0";
        } else {
          delete newErrors.ganancia;
        }
        break;

      case "recargo":
        if (!(value as string).trim()) {
          newErrors.recargo = "El recargo es requerido";
        } else if (!patterns.recargo.test(value as string)) {
          newErrors.recargo = "El recargo debe ser un número mayor o igual a 0";
        } else {
          delete newErrors.recargo;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = (formData: ErrorConfigEdad): boolean => {
    const newErrors: ErrorConfigEdad = {};

    if (!formData.nombre?.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (!patterns.nombre.test(formData.nombre)) {
      newErrors.nombre = "El nombre debe tener entre 2 y 50 caracteres";
    }

    if (!formData.minima?.trim()) {
      newErrors.minima = "La edad mínima es requerida";
    } else if (!patterns.minima.test(formData.minima)) {
      newErrors.minima = "La edad mínima debe ser mayor o igual a 0";
    }

    if (!formData.maxima?.trim()) {
      newErrors.maxima = "La edad máxima es requerida";
    } else if (!patterns.maxima.test(formData.maxima)) {
      newErrors.maxima = "La edad máxima debe ser mayor o igual a 0";
    }

    if (!formData.descuento?.trim()) {
      newErrors.descuento = "El descuento es requerido";
    } else if (!patterns.descuento.test(formData.descuento)) {
      newErrors.descuento = "El descuento debe ser mayor a 0";
    }

    if (!formData.ganancia?.trim()) {
      newErrors.ganancia = "La ganancia es requerida";
    } else if (!patterns.ganancia.test(formData.ganancia)) {
      newErrors.ganancia = "La ganancia debe ser un número mayor o igual a 0";
    }

    if (!formData.recargo?.trim()) {
      newErrors.recargo = "El recargo es requerido";
    } else if (!patterns.recargo.test(formData.recargo)) {
      newErrors.recargo = "El recargo debe ser un número mayor o igual a 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = (): void => setErrors({});

  const clearFieldError = (fieldName: keyof ErrorConfigEdad): void => {
    const newErrors = { ...errors };
    delete newErrors[fieldName];
    setErrors(newErrors);
  };

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

export default useFormValidationConfigEdad;
