// useFormValidationMarca
import { useState, useEffect } from "react";

interface ErrorMarca {
  nombre?: string;
  descripcion?: string;
}

interface UseFormValidationReturn {
  errors: ErrorMarca;
  isValid: boolean;
  validateField: (fieldName: keyof ErrorMarca, value: string) => void;
  validateForm: (formData: Record<keyof ErrorMarca, any>) => boolean;
  clearErrors: () => void;
  clearFieldError: (fieldName: keyof ErrorMarca) => void;
}

const useFormValidationMarca = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<ErrorMarca>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  // Patrones de validación
  const patterns = {
    nombre: /^.{2,50}$/, // 2 a 50 caracteres
    descripcion: /^.{2,100}$/, // 2 a 100 caracteres
  };

  const validateField = (fieldName: keyof ErrorMarca, value: string): void => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "nombre": {
        const v = value.trim();
        if (!v) {
          newErrors.nombre = "El nombre es requerido";
        } else if (!patterns.nombre.test(v)) {
          newErrors.nombre = "El nombre debe tener entre 2 y 50 caracteres";
        } else {
          delete newErrors.nombre;
        }
        break;
      }

      case "descripcion": {
        const v = value.trim();
        if (!v) {
          newErrors.descripcion = "La descripción es requerida";
        } else if (!patterns.descripcion.test(v)) {
          newErrors.descripcion =
            "La descripción debe tener entre 2 y 100 caracteres";
        } else {
          delete newErrors.descripcion;
        }
        break;
      }

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = (formData: Record<keyof ErrorMarca, any>): boolean => {
    const newErrors: ErrorMarca = {};

    // Nombre
    if (!formData.nombre?.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (!patterns.nombre.test(formData.nombre)) {
      newErrors.nombre = "El nombre debe tener entre 2 y 50 caracteres";
    }

    // Descripción
    if (!formData.descripcion?.trim()) {
      newErrors.descripcion = "La descripción es requerida";
    } else if (!patterns.descripcion.test(formData.descripcion)) {
      newErrors.descripcion =
        "La descripción debe tener entre 2 y 100 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = (): void => {
    setErrors({});
  };

  const clearFieldError = (fieldName: keyof ErrorMarca): void => {
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

export default useFormValidationMarca;
