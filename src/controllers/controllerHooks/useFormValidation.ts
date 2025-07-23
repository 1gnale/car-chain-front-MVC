import { useState, useEffect } from 'react';

interface VehicleFormData {
  matricula: string;
  marca: string;
  chasis: string;
  modelo: string;
  numeroMotor: string;
  version: string;
  gnc: boolean;
  anio: string;
}

interface ValidationErrors {
  matricula?: string;
  marca?: string;
  chasis?: string;
  modelo?: string;
  numeroMotor?: string;
  version?: string;
  anio?: string;
}

interface UseFormValidationReturn {
  errors: ValidationErrors;
  isValid: boolean;
  validateField: (fieldName: keyof ValidationErrors, value: string | boolean) => void;
  validateForm: (formData: VehicleFormData) => boolean;
  clearErrors: () => void;
  clearFieldError: (fieldName: keyof ValidationErrors) => void;
}

const useFormValidation = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  // Patrones de validación
  const patterns = {
    matricula: /^[A-Z]{3}\d{4}$/, // Formato ABC1234
    chasis: /^[A-Z0-9]{17}$/, // 17 caracteres alfanuméricos
    numeroMotor: /^[A-Z0-9]{6,20}$/, // Entre 6 y 20 caracteres alfanuméricos
    anio: /^\d{4}$/, // 4 dígitos
  };

  const validateField = (fieldName: keyof ValidationErrors, value: string | boolean): void => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'matricula':
        const matriculaValue = value as string;
        if (!matriculaValue.trim()) {
          newErrors.matricula = 'La matrícula es requerida';
        } else if (!patterns.matricula.test(matriculaValue.toUpperCase())) {
          newErrors.matricula = 'Formato de matrícula inválido (ej: ABC1234)';
        } else {
          delete newErrors.matricula;
        }
        break;

      case 'marca':
        if (!value || value === '') {
          newErrors.marca = 'La marca es requerida';
        } else {
          delete newErrors.marca;
        }
        break;

      case 'chasis':
        const chasisValue = value as string;
        if (!chasisValue.trim()) {
          newErrors.chasis = 'El número de chasis es requerido';
        } else if (!patterns.chasis.test(chasisValue.toUpperCase())) {
          newErrors.chasis = 'El chasis debe tener 17 caracteres alfanuméricos';
        } else {
          delete newErrors.chasis;
        }
        break;

      case 'modelo':
        if (!value || value === '') {
          newErrors.modelo = 'El modelo es requerido';
        } else {
          delete newErrors.modelo;
        }
        break;

      case 'numeroMotor':
        const numeroMotorValue = value as string;
        if (!numeroMotorValue.trim()) {
          newErrors.numeroMotor = 'El número de motor es requerido';
        } else if (!patterns.numeroMotor.test(numeroMotorValue.toUpperCase())) {
          newErrors.numeroMotor = 'El número de motor debe tener entre 6 y 20 caracteres alfanuméricos';
        } else {
          delete newErrors.numeroMotor;
        }
        break;

      case 'version':
        if (!value || value === '') {
          newErrors.version = 'La versión es requerida';
        } else {
          delete newErrors.version;
        }
        break;

      case 'anio':
        const anioValue = value as string;
        const currentYear = new Date().getFullYear();
        if (!anioValue.trim()) {
          newErrors.anio = 'El año es requerido';
        } else if (!patterns.anio.test(anioValue)) {
          newErrors.anio = 'El año debe tener 4 dígitos';
        } else {
          const year = parseInt(anioValue);
          if (year < 1900 || year > currentYear + 1) {
            newErrors.anio = `El año debe estar entre 1900 y ${currentYear + 1}`;
          } else {
            delete newErrors.anio;
          }
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = (formData: VehicleFormData): boolean => {
    const newErrors: ValidationErrors = {};

    // Validar matrícula
    if (!formData.matricula.trim()) {
      newErrors.matricula = 'La matrícula es requerida';
    } else if (!patterns.matricula.test(formData.matricula.toUpperCase())) {
      newErrors.matricula = 'Formato de matrícula inválido (ej: ABC1234)';
    }

    // Validar marca
    if (!formData.marca || formData.marca === '') {
      newErrors.marca = 'La marca es requerida';
    }

    // Validar chasis
    if (!formData.chasis.trim()) {
      newErrors.chasis = 'El número de chasis es requerido';
    } else if (!patterns.chasis.test(formData.chasis.toUpperCase())) {
      newErrors.chasis = 'El chasis debe tener 17 caracteres alfanuméricos';
    }

    // Validar modelo
    if (!formData.modelo || formData.modelo === '') {
      newErrors.modelo = 'El modelo es requerido';
    }

    // Validar número de motor
    if (!formData.numeroMotor.trim()) {
      newErrors.numeroMotor = 'El número de motor es requerido';
    } else if (!patterns.numeroMotor.test(formData.numeroMotor.toUpperCase())) {
      newErrors.numeroMotor = 'El número de motor debe tener entre 6 y 20 caracteres alfanuméricos';
    }

    // Validar versión
    if (!formData.version || formData.version === '') {
      newErrors.version = 'La versión es requerida';
    }

    // Validar año
    if (!formData.anio.trim()) {
      newErrors.anio = 'El año es requerido';
    } else if (!patterns.anio.test(formData.anio)) {
      newErrors.anio = 'El año debe tener 4 dígitos';
    } else {
      const year = parseInt(formData.anio);
      const currentYear = new Date().getFullYear();
      if (year < 1900 || year > currentYear + 1) {
        newErrors.anio = `El año debe estar entre 1900 y ${currentYear + 1}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = (): void => {
    setErrors({});
  };

  const clearFieldError = (fieldName: keyof ValidationErrors): void => {
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
