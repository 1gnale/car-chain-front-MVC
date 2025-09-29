import { useState, useEffect } from "react";

interface ErrorVersion {
  nombre?: string;
  descripcion?: string;
  precio_mercado?: string;
  precio_mercado_gnc?: string;
  modelo?: string;
  marca?: string;
}

interface UseFormValidationReturn {
  errors: ErrorVersion;
  isValid: boolean;
  validateField: (fieldName: keyof ErrorVersion, value: string) => void;
  validateForm: (formData: Record<keyof ErrorVersion, any>) => boolean;
  clearErrors: () => void;
  clearFieldError: (fieldName: keyof ErrorVersion) => void;
}

const useFormValidationVersion = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<ErrorVersion>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  // Patrones de validación
  const patterns = {
    nombre: /^.{2,50}$/, // 2 a 50 caracteres
    descripcion: /^.{2,100}$/, // 2 a 100 caracteres
    precio_mercado: /^[0-9]+(\.[0-9]+)?$/, // número flotante
    precio_mercado_gnc: /^[0-9]+(\.[0-9]+)?$/, // número flotante
    modelo: /^.{2,100}$/, // 2 a 100 caracteres
    marca: /^.{2,100}$/, // 2 a 100 caracteres
  };

  const validateField = (
    fieldName: keyof ErrorVersion,
    value: string
  ): void => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "nombre": {
        const v = value.trim();
        if (!v) {
          newErrors.nombre = "El nombre de la versión es requerido";
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
          newErrors.descripcion = "La descripción de la versión es requerida";
        } else if (!patterns.descripcion.test(v)) {
          newErrors.descripcion =
            "La descripción debe tener entre 2 y 100 caracteres";
        } else {
          delete newErrors.descripcion;
        }
        break;
      }

      case "precio_mercado": {
        const v = value.toString().trim();
        if (!v) {
          newErrors.precio_mercado = "El precio_mercado es requerido";
        } else if (!patterns.precio_mercado.test(v)) {
          newErrors.precio_mercado =
            "El precio_mercado debe ser un número flotante";
        } else {
          delete newErrors.precio_mercado;
        }
        break;
      }

      case "precio_mercado_gnc": {
        const v = value.toString().trim();
        if (!v) {
          newErrors.precio_mercado_gnc = "El precio_mercado_gnc es requerido";
        } else if (!patterns.precio_mercado_gnc.test(v)) {
          newErrors.precio_mercado_gnc =
            "El precio_mercado_gnc debe ser un número flotante";
        } else {
          delete newErrors.precio_mercado_gnc;
        }
        break;
      }

      case "modelo": {
        const v = value.trim();
        if (!v) {
          newErrors.modelo = "La modelo es requerida";
        } else if (!patterns.modelo.test(v)) {
          newErrors.modelo = "La modelo debe tener entre 2 y 50 caracteres";
        } else {
          delete newErrors.modelo;
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

  const validateForm = (formData: Record<keyof ErrorVersion, any>): boolean => {
    const newErrors: ErrorVersion = {};

    // Nombre
    if (!formData.nombre?.trim()) {
      newErrors.nombre = "El nombre de la versión es requerido";
    } else if (!patterns.nombre.test(formData.nombre)) {
      newErrors.nombre = "El nombre debe tener entre 2 y 50 caracteres";
    }

    // Descripción
    if (!formData.descripcion?.trim()) {
      newErrors.descripcion = "La descripción de la versión es requerida";
    } else if (!patterns.descripcion.test(formData.descripcion)) {
      newErrors.descripcion =
        "La descripción debe tener entre 2 y 100 caracteres";
    }

    // Precio mercado
    if (!formData.precio_mercado?.toString().trim()) {
      newErrors.precio_mercado = "El precio_mercado es requerido";
    } else if (
      !patterns.precio_mercado.test(formData.precio_mercado.toString())
    ) {
      newErrors.precio_mercado =
        "El precio_mercado debe ser un número flotante";
    }

    // Precio mercado GNC
    if (!formData.precio_mercado_gnc?.toString().trim()) {
      newErrors.precio_mercado_gnc = "El precio_mercado_gnc es requerido";
    } else if (
      !patterns.precio_mercado_gnc.test(formData.precio_mercado_gnc.toString())
    ) {
      newErrors.precio_mercado_gnc =
        "El precio_mercado_gnc debe ser un número flotante";
    }

    // Marca
    if (!formData.marca?.trim()) {
      newErrors.marca = "La marca es requerida";
    } else if (!patterns.marca.test(formData.marca)) {
      newErrors.marca = "La marca debe tener entre 2 y 50 caracteres";
    }

    // modelo
    if (!formData.modelo?.trim()) {
      newErrors.modelo = "La modelo es requerida";
    } else if (!patterns.modelo.test(formData.modelo)) {
      newErrors.modelo = "La modelo debe tener entre 2 y 50 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = (): void => {
    setErrors({});
  };

  const clearFieldError = (fieldName: keyof ErrorVersion): void => {
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

export default useFormValidationVersion;
