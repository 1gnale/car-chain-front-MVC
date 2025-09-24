import React, { useEffect, useRef } from 'react';

export type ModalType = 'success' | 'error' | 'warning' | 'info';

interface ModalProps {
  show: boolean;
  type?: ModalType;
  title?: string;
  message: string;
  onClose: () => void;
  closeButtonText?: string;
  showCloseIcon?: boolean;
  closable?: boolean; // Si se puede cerrar haciendo clic fuera
}

const Modal: React.FC<ModalProps> = ({
  show,
  type = 'info',
  title,
  message,
  onClose,
  closeButtonText = 'Cerrar',
  showCloseIcon = true,
  closable = true
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Configuración según el tipo de modal
  const modalConfig = {
    success: {
      bgClass: 'bg-success',
      icon: 'fas fa-check-circle',
      iconLarge: 'fas fa-check-circle',
      defaultTitle: 'Éxito'
    },
    error: {
      bgClass: 'bg-danger',
      icon: 'fas fa-exclamation-circle',
      iconLarge: 'fas fa-exclamation-triangle',
      defaultTitle: 'Error'
    },
    warning: {
      bgClass: 'bg-warning',
      icon: 'fas fa-exclamation-triangle',
      iconLarge: 'fas fa-exclamation-triangle',
      defaultTitle: 'Advertencia'
    },
    info: {
      bgClass: 'bg-info',
      icon: 'fas fa-info-circle',
      iconLarge: 'fas fa-info-circle',
      defaultTitle: 'Información'
    }
  };

  const config = modalConfig[type];
  const modalTitle = title || config.defaultTitle;

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && show && closable) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [show, onClose, closable]);

  if (!show) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closable && e.target === e.currentTarget) {
      onClose();
    }
  };

  const getTextColor = () => {
    return type === 'warning' ? 'text-dark' : 'text-white';
  };

  return (
    <div 
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleBackdropClick}
    >
      <div className="modal-dialog modal-dialog-centered" ref={modalRef}>
        <div className="modal-content border-0 shadow-lg">
          {/* Header */}
          <div className={`modal-header border-0 ${config.bgClass} ${getTextColor()}`}>
            <h5 className="modal-title d-flex align-items-center" id="modal-title">
              <i className={`${config.icon} me-2`}></i>
              {modalTitle}
            </h5>
            {showCloseIcon && (
              <button
                type="button"
                className={`btn-close ${type === 'warning' ? '' : 'btn-close-white'}`}
                onClick={onClose}
                aria-label="Cerrar"
              />
            )}
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            <div className="d-flex align-items-start">
              <div className={`me-3 flex-shrink-0 text-${type === 'error' ? 'danger' : type}`}>
                <i className={`${config.iconLarge} fa-2x`}></i>
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 text-dark">{message}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer border-0 bg-light">
            <button
              type="button"
              className={`btn ${type === 'error' ? 'btn-secondary' : `btn-${type}`} px-4`}
              onClick={onClose}
              autoFocus
            >
              {closeButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;