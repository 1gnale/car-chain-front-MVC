interface CheckFormProps {
  text?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckForm = ({ text, checked, onChange }: CheckFormProps) => {
  return (
    <>
      <style>{`
       .custom-switch {
  width: 3rem;   /* más ancho */
  height: 1.5rem; /* más alto */
  cursor: pointer;
}

.custom-switch:checked {
  background-color: rgba(59, 66, 75, 1)
}

       `}</style>
      <div className="d-flex align-items-center gap-2">
        <label className="form-check-label">
          <span>{text}</span>{" "}
        </label>
        <div className="form-check form-switch m-0">
          <input
            className="form-check-input custom-switch"
            type="checkbox"
            checked={checked || false}
            onChange={(e) => onChange?.(e.target.checked)}
          />
        </div>
      </div>
    </>
  );
};

export default CheckForm;
