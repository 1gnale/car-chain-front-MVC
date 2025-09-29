// useFormValidationModelo.ts
import { useState, useEffect } from "react";

interface ErrorModelo {
  nombre?: string;
  descripcion?: string;
  marca?: string;
}

interface UseFormValidationReturn {
  errors: ErrorModelo;
  isValid: boolean;
  validateField: (fieldName: keyof ErrorModelo, value: string) => void;
  validateForm: (formData: Record<keyof ErrorModelo, any>) => boolean;
  clearErrors: () => void;
  clearFieldError: (fieldName: keyof ErrorModelo) => void;
}

const useFormValidationModelo = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<ErrorModelo>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  // Patrones de validación
  const patterns = {
    nombre: /^.{2,50}$/, // 2 a 50 caracteres
    descripcion: /^.{2,100}$/, // 2 a 100 caracteres
    marca: /^.{2,50}$/, // 2 a 50 caracteres (obligatoria)
  };

  const validateField = (fieldName: keyof ErrorModelo, value: string): void => {
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

      case "marca": {
        const v = value.trim();
        if (!v) {
          newErrors.marca = "La marca es requerida";
        } else if (!patterns.marca.test(v)) {
          newErrors.marca = "La marca debe tener entre 2 y 50 caracteres";
        } else {
          delete newErrors.marca;
        }
        break;
      }

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = (formData: Record<keyof ErrorModelo, any>): boolean => {
    const newErrors: ErrorModelo = {};

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

    // Marca
    if (!formData.marca?.trim()) {
      newErrors.marca = "La marca es requerida";
    } else if (!patterns.marca.test(formData.marca)) {
      newErrors.marca = "La marca debe tener entre 2 y 50 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = (): void => {
    setErrors({});
  };

  const clearFieldError = (fieldName: keyof ErrorModelo): void => {
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

export default useFormValidationModelo;
