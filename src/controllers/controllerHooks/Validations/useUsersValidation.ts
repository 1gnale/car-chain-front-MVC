import { useState, useEffect } from "react";

interface ErrorUsuario {
  nombres?: string;
  apellido?: string;
  fechaNacimiento?: string;
  tipoDocumento?: string;
  documento?: string;
  domicilio?: string;
  correo?: string;
  telefono?: string;
  sexo?: string;
  localidad_id?: string;
  provincia_id?: string;
  tipoUsuario?: string;
}

interface UseFormValidationReturn {
  errors: ErrorUsuario;
  isValid: boolean;
  validateField: (
    fieldName: keyof ErrorUsuario,
    value: string | boolean
  ) => void;
  validateForm: (formData: ErrorUsuario) => boolean;
  clearErrors: () => void;
  clearFieldError: (fieldName: keyof ErrorUsuario) => void;
}

const useFormValidationUsuarios = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<ErrorUsuario>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  // Patrones de validación
  const patterns = {
    nombres: /^.{2,50}$/, // entre 2 y 50 caracteres
    apellido: /^.{2,50}$/,
    fechaNacimiento: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
    documento: /^.{7,20}$/, // entre 7 y 20 caracteres
    domicilio: /^.{5,100}$/,
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, // email básico
    telefono: /^[+\d\s\-()]{8,20}$/, // entre 8 y 20 caracteres, números y símbolos permitidos
    sexo: /^(Masculino|Femenino)$/,
    tipoDocumento:
      /^(CUIT|CEDULA|DNI|LIBRETA_ENROLE|LIBRETA_CIVICA|PASAPORTE)$/,
    tipoUsuario: /^(ADMINISTRADOR|VENDEDOR|PERITO|GESTOR_DE_SINIESTROS)$/,
    localidad_id: /^[1-9]\d*$/, // entero positivo
    provincia_id: /^[1-9]\d*$/, // entero positivo
  };

  const validateField = (
    fieldName: keyof ErrorUsuario,
    value: string | boolean
  ): void => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "nombres":
        if (!value || !patterns.nombres.test(value as string)) {
          newErrors.nombres = "Los nombres deben tener entre 2 y 50 caracteres";
        } else {
          delete newErrors.nombres;
        }
        break;

      case "apellido":
        if (!value || !patterns.apellido.test(value as string)) {
          newErrors.apellido = "El apellido debe tener entre 2 y 50 caracteres";
        } else {
          delete newErrors.apellido;
        }
        break;

      case "fechaNacimiento":
        const fechaStr = value as string;
        if (!patterns.fechaNacimiento.test(fechaStr)) {
          newErrors.fechaNacimiento =
            "La fecha de nacimiento debe venir en un formato DD/MM/YYYY";
        } else {
          const fecha = new Date(fechaStr);
          const hoy = new Date();
          const edad = hoy.getFullYear() - fecha.getFullYear();
          if (edad < 18 || edad > 100) {
            newErrors.fechaNacimiento =
              "La edad debe estar entre 18 y 100 años";
          } else {
            delete newErrors.fechaNacimiento;
          }
        }
        break;

      case "tipoDocumento":
        if (!patterns.tipoDocumento.test(value as string)) {
          newErrors.tipoDocumento = "Tipo de documento inválido";
        } else {
          delete newErrors.tipoDocumento;
        }
        break;

      case "documento":
        if (!value || !patterns.documento.test(value as string)) {
          newErrors.documento =
            "El documento debe tener entre 7 y 20 caracteres";
        } else {
          delete newErrors.documento;
        }
        break;

      case "domicilio":
        if (!value || !patterns.domicilio.test(value as string)) {
          newErrors.domicilio =
            "El domicilio debe tener entre 5 y 100 caracteres";
        } else {
          delete newErrors.domicilio;
        }
        break;

      case "correo":
        if (!patterns.correo.test(value as string)) {
          newErrors.correo = "El correo electrónico debe ser válido";
        } else {
          delete newErrors.correo;
        }
        break;

      case "telefono":
        if (!patterns.telefono.test(value as string)) {
          newErrors.telefono =
            "El teléfono debe tener entre 8 y 20 caracteres y solo contener números y símbolos válidos";
        } else {
          delete newErrors.telefono;
        }
        break;

      case "sexo":
        if (!patterns.sexo.test(value as string)) {
          newErrors.sexo = "El sexo debe ser Masculino o Femenino";
        } else {
          delete newErrors.sexo;
        }
        break;

      case "localidad_id":
        if (!patterns.localidad_id.test(value as string)) {
          newErrors.localidad_id =
            "El ID de localidad debe ser un número entero positivo";
        } else {
          delete newErrors.localidad_id;
        }
        break;

      case "tipoUsuario":
        if (!patterns.tipoUsuario.test(value as string)) {
          newErrors.tipoUsuario =
            "Tipo de usuario inválido (ADMINISTRADOR, VENDEDOR, PERITO, GESTOR_DE_SINIESTROS)";
        } else {
          delete newErrors.tipoUsuario;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = (formData: ErrorUsuario): boolean => {
    const newErrors: ErrorUsuario = {};

    Object.keys(patterns).forEach((key) => {
      const field = key as keyof ErrorUsuario;
      const value = formData[field];

      if (!value || !(patterns[field] as RegExp).test(value.toString())) {
        newErrors[field] = `Campo ${field} inválido`;
      }

      // Validación especial fecha
      if (field === "fechaNacimiento" && value) {
        const fecha = new Date(value as string);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fecha.getFullYear();
        if (edad < 18 || edad > 100) {
          newErrors.fechaNacimiento = "La edad debe estar entre 18 y 100 años";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = (): void => {
    setErrors({});
  };

  const clearFieldError = (fieldName: keyof ErrorUsuario): void => {
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

export default useFormValidationUsuarios;
