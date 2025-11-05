// useFormValidationSiniestro
import { useState, useEffect } from "react";

interface ValidationErrorsSiniestro {
  fechaSiniestro?: string;
  horaSiniestro?: string;
  fotoDenuncia?: string;
  fotoVehiculo?: string;
}

interface UseFormValidationReturn {
  errors: ValidationErrorsSiniestro;
  isValid: boolean;
  validateField: (
    fieldName: keyof ValidationErrorsSiniestro,
    value: string | File | undefined
  ) => void;
  validateForm: (formData: Siniestro) => boolean;
  clearErrors: () => void;
  clearFieldError: (fieldName: keyof ValidationErrorsSiniestro) => void;
}

const useFormValidationSiniestro = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<ValidationErrorsSiniestro>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  // Función auxiliar para validar imágenes
  const validateImage = (
    file: File | null | undefined,
    fieldName: keyof ValidationErrorsSiniestro,
    newErrors: ValidationErrorsSiniestro
  ) => {
    if (!file) {
      newErrors[fieldName] = "El archivo es requerido";
    } else if (!file.type.startsWith("image/")) {
      newErrors[fieldName] = "El archivo debe ser una imagen";
    } else if (file.size <= 0) {
      newErrors[fieldName] = "El archivo es inválido";
    } else {
      delete newErrors[fieldName];
    }
  };

  const validateField = (
    fieldName: keyof ValidationErrorsSiniestro,
    value: string | File | undefined
  ): void => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "fechaSiniestro": {
        const v = (value as string)?.trim();
        if (!v) {
          newErrors.fechaSiniestro = "La fecha del siniestro es requerida";
        } else {
          delete newErrors.fechaSiniestro;
        }
        break;
      }

      case "horaSiniestro": {
        const v = (value as string)?.trim();
        if (!v) {
          newErrors.horaSiniestro = "La hora del siniestro es requerida";
        } else {
          delete newErrors.horaSiniestro;
        }
        break;
      }

      case "fotoDenuncia":
        validateImage(value as File, "fotoDenuncia", newErrors);
        break;

      case "fotoVehiculo":
        validateImage(value as File, "fotoVehiculo", newErrors);
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = (formData: Siniestro): boolean => {
    const newErrors: ValidationErrorsSiniestro = {};

    // Fecha
    if (!formData.fechaSiniestro?.trim()) {
      newErrors.fechaSiniestro = "La fecha del siniestro es requerida";
    }

    // Hora
    if (!formData.horaSiniestro?.trim()) {
      newErrors.horaSiniestro = "La hora del siniestro es requerida";
    }

    // Imagen denuncia
    validateImage(formData.fotoDenuncia, "fotoDenuncia", newErrors);

    // Imagen vehículo
    validateImage(formData.fotoVehiculo, "fotoVehiculo", newErrors);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = (): void => {
    setErrors({});
  };

  const clearFieldError = (
    fieldName: keyof ValidationErrorsSiniestro
  ): void => {
    const newErrors = { ...errors };
    delete newErrors[fieldName];
    setErrors(newErrors);
  };

  // Actualizar isValid automáticamente
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

export default useFormValidationSiniestro;
