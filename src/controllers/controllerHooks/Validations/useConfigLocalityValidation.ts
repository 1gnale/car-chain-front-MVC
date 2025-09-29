import { useState, useEffect } from "react";

interface ErrorConfigLocalidad {
  nombre?: string;
  provincia?: string;
  localidad?: string;
  descuento?: string;
  ganancia?: string;
  recargo?: string;
}

interface UseFormValidationReturn {
  errors: ErrorConfigLocalidad;
  isValid: boolean;
  validateField: (
    fieldName: keyof ErrorConfigLocalidad,
    value: string | boolean
  ) => void;
  validateForm: (formData: ErrorConfigLocalidad) => boolean;
  clearErrors: () => void;
  clearFieldError: (fieldName: keyof ErrorConfigLocalidad) => void;
}

const useFormValidationConfigLocalidad = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<ErrorConfigLocalidad>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  // Patrones de validación
  const patterns = {
    nombre: /^.{2,50}$/, // entre 2 y 50 caracteres
    descuento: /^(?:0|[1-9]\d*)(?:\.\d+)?$/, // número >= 0
    ganancia: /^(?:0|[1-9]\d*)(?:\.\d+)?$/, // número >= 0
    recargo: /^(?:0|[1-9]\d*)(?:\.\d+)?$/, // número >= 0
    localidad: /^.{0,50}$/, // entre 2 y 50 caracteres
    provincia: /^.{0,50}$/, // entre 2 y 50 caracteres
  };

  const validateField = (
    fieldName: keyof ErrorConfigLocalidad,
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

      case "localidad":
        if (!(value as string).trim()) {
          newErrors.localidad = "El localidad es requerido";
        } else if (!patterns.localidad.test(value as string)) {
          newErrors.localidad =
            "El localidad debe tener entre 0 y 50 caracteres";
        } else {
          delete newErrors.localidad;
        }
        break;

      case "provincia":
        if (!(value as string).trim()) {
          newErrors.provincia = "El provincia es requerido";
        } else if (!patterns.provincia.test(value as string)) {
          newErrors.provincia =
            "El provincia debe tener entre 0 y 50 caracteres";
        } else {
          delete newErrors.provincia;
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

  const validateForm = (formData: ErrorConfigLocalidad): boolean => {
    const newErrors: ErrorConfigLocalidad = {};

    if (!formData.nombre?.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (!patterns.nombre.test(formData.nombre)) {
      newErrors.nombre = "El nombre debe tener entre 2 y 50 caracteres";
    }

    // Validar provincia
    if (!formData.provincia?.trim()) {
      newErrors.provincia = "El provincia es requerido";
    } else if (!patterns.provincia.test(formData.provincia)) {
      newErrors.provincia = "El provincia debe tener entre 0 y 50 caracteres";
    }
    // Validar localidad
    if (!formData.localidad?.trim()) {
      newErrors.localidad = "El localidad es requerido";
    } else if (!patterns.localidad.test(formData.localidad)) {
      newErrors.localidad = "El nombre debe tener entre 0 y 50 caracteres";
    }

    if (!formData.descuento?.trim()) {
      newErrors.descuento = "El descuento es requerido";
    } else if (!patterns.descuento.test(formData.descuento)) {
      newErrors.descuento = "El descuento debe ser mayor o igual a 0";
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

  const clearFieldError = (fieldName: keyof ErrorConfigLocalidad): void => {
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

export default useFormValidationConfigLocalidad;
