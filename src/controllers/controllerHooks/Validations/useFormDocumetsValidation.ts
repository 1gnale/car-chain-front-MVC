import { useState, useEffect } from "react";

interface ValidationErrors {
  fotoFrontal?: string;
  fotoTrasera?: string;
  fotoLateral1?: string;
  fotoLateral2?: string;
  fotoTecho?: string;
  cedulaVerde?: string;
}

interface UseFormValidationReturn {
  errors: ValidationErrors;
  isValid: boolean;
  validateField: (
    fieldName: keyof ValidationErrors,
    value: File | undefined
  ) => void;
  validateForm: (formData: Documentacion) => boolean;
  clearErrors: () => void;
  clearFieldError: (fieldName: keyof ValidationErrors) => void;
}

const useFormValidation = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const validateField = (
    fieldName: keyof ValidationErrors,
    value: File | undefined
  ): void => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "fotoFrontal":
        console.log(value);
        if (!value?.type.startsWith("image/")) {
          newErrors.fotoFrontal = "El archivo debe ser una imagen";
          console.log(newErrors);
        } else if (!(value && value.size > 0)) {
          newErrors.fotoFrontal = "El archivo es requerido";
        } else {
          delete newErrors.fotoFrontal;
        }
        break;

      case "fotoTrasera":
        if (!value?.type.startsWith("image/")) {
          newErrors.fotoTrasera = "El archivo debe ser una imagen";
        } else if (!(value && value.size > 0)) {
          newErrors.fotoTrasera = "El archivo es requerido";
        } else {
          delete newErrors.fotoTrasera;
        }
        break;

      case "fotoLateral1":
        if (!value?.type.startsWith("image/")) {
          newErrors.fotoLateral1 = "El archivo debe ser una imagen";
        } else if (!(value && value.size > 0)) {
          newErrors.fotoLateral1 = "El archivo es requerido";
        } else {
          delete newErrors.fotoLateral1;
        }
        break;

      case "fotoLateral2":
        if (!value?.type.startsWith("image/")) {
          newErrors.fotoLateral2 = "El archivo debe ser una imagen";
        } else if (!(value && value.size > 0)) {
          newErrors.fotoLateral2 = "El archivo es requerido";
        } else {
          delete newErrors.fotoLateral2;
        }
        break;

      case "fotoTecho":
        if (!value?.type.startsWith("image/")) {
          newErrors.fotoTecho = "El archivo debe ser una imagen";
        } else if (!(value && value.size > 0)) {
          newErrors.fotoTecho = "El archivo es requerido";
        } else {
          delete newErrors.fotoTecho;
        }
        break;

      case "cedulaVerde":
        if (!value?.type.startsWith("image/")) {
          newErrors.cedulaVerde = "El archivo debe ser una imagen";
        } else if (!(value && value.size > 0)) {
          newErrors.cedulaVerde = "El archivo es requerido";
        } else {
          delete newErrors.cedulaVerde;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = (formData: Documentacion): boolean => {
    const newErrors: ValidationErrors = {};

    // Validar fotoFrontal
    if (!formData.fotoFrontal?.type.startsWith("image/")) {
      newErrors.fotoFrontal = "El archivo debe ser una imagen";
    } else if (!(formData.fotoFrontal && formData.fotoFrontal.size > 0)) {
      newErrors.fotoFrontal = "El archivo es requerido";
    } else {
      delete newErrors.fotoFrontal;
    }

    // Validar fotoLateral1
    if (!formData.fotoLateral1?.type.startsWith("image/")) {
      newErrors.fotoLateral1 = "El archivo debe ser una imagen";
    } else if (!(formData.fotoLateral1 && formData.fotoLateral1.size > 0)) {
      newErrors.fotoLateral1 = "El archivo es requerido";
    } else {
      delete newErrors.fotoLateral1;
    }

    // Validar fotoLateral2
    if (!formData.fotoLateral2?.type.startsWith("image/")) {
      newErrors.fotoLateral2 = "El archivo debe ser una imagen";
    } else if (!(formData.fotoLateral2 && formData.fotoLateral2.size > 0)) {
      newErrors.fotoLateral2 = "El archivo es requerido";
    } else {
      delete newErrors.fotoLateral2;
    }

    // Validar fotoTrasera
    if (!formData.fotoTrasera?.type.startsWith("image/")) {
      newErrors.fotoTrasera = "El archivo debe ser una imagen";
    } else if (!(formData.fotoTrasera && formData.fotoTrasera.size > 0)) {
      newErrors.fotoTrasera = "El archivo es requerido";
    } else {
      delete newErrors.fotoTrasera;
    }

    // Validar fotoTecho
    if (!formData.fotoTecho?.type.startsWith("image/")) {
      newErrors.fotoTecho = "El archivo debe ser una imagen";
    } else if (!(formData.fotoTecho && formData.fotoTecho.size > 0)) {
      newErrors.fotoTecho = "El archivo es requerido";
    } else {
      delete newErrors.fotoTecho;
    }
    // Validar cedulaVerde
    if (!formData.cedulaVerde?.type.startsWith("image/")) {
      newErrors.cedulaVerde = "El archivo debe ser una imagen";
    } else if (!(formData.cedulaVerde && formData.cedulaVerde.size > 0)) {
      newErrors.cedulaVerde = "El archivo es requerido";
    } else {
      delete newErrors.cedulaVerde;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = (): void => {
    setErrors({});
  };

  const clearFieldError = (fieldName: keyof Documentacion): void => {
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
