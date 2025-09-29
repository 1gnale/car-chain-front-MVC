import { useState, useEffect } from "react";

interface errorCobertura {
  nombre?: string;
  descripcion?: string;
  recargoPorAtraso?: string;
}

interface UseFormValidationReturn {
  errors: errorCobertura;
  isValid: boolean;
  validateField: (
    fieldName: keyof errorCobertura,
    value: string | boolean
  ) => void;
  validateForm: (formData: errorCobertura) => boolean;
  clearErrors: () => void;
  clearFieldError: (fieldName: keyof errorCobertura) => void;
}

const useFormValidationCoverages = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<errorCobertura>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  // Patrones de validación
  const patterns = {
    // Nombre y descripción: letras y números
    nombre: /^.{2,50}$/,
    descripcion: /^.{5,100}$/,

    // recargoPorAtraso: entre 0 y 10 (incluye 0 y 10)
    recargoPorAtraso: /^(?:10(?:\.0+)?|[0-9](?:\.[0-9]+)?)$/,
  };

  // VER PARA VALIDAR FECHA

  const validateField = (
    fieldName: keyof errorCobertura,
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

      case "recargoPorAtraso":
        const porcentajeValue = value as string;
        if (!porcentajeValue.trim()) {
          newErrors.recargoPorAtraso = "El recargo por atraso es requerido";
        } else if (
          !patterns.recargoPorAtraso.test(porcentajeValue.toUpperCase())
        ) {
          newErrors.recargoPorAtraso =
            "El porcentaje debe ser un numero del 0 al 10";
        } else {
          delete newErrors.recargoPorAtraso;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = (formData: errorCobertura): boolean => {
    const newErrors: errorCobertura = {};

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

    // Validar recargo por atraso
    if (!formData.recargoPorAtraso!.trim()) {
      newErrors.recargoPorAtraso! = "El recargo por atraso es requerido";
    } else if (
      !patterns.recargoPorAtraso!.test(formData.recargoPorAtraso!.toUpperCase())
    ) {
      newErrors.recargoPorAtraso! =
        "El recargo por atraso debe un numero entre 0 y 10";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = (): void => {
    setErrors({});
  };

  const clearFieldError = (fieldName: keyof errorCobertura): void => {
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

export default useFormValidationCoverages;
