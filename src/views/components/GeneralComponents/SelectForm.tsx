interface Option {
  id: number;
  name: string;
}

interface SelectFormProps {
  title: string;
  items?: Option[];
  onChange: (id: number) => void;
  status: boolean;
  value: number;
  error?: string;
  onBlur?: () => void;
  classNameDiv?: string;
  classNameLabel?: string;
  classNameSelect?: string;
}

const SelectForm = ({
  title,
  items,
  onChange,
  status,
  value,
  error,
  classNameDiv,
  classNameLabel,
  classNameSelect,
  onBlur,
}: SelectFormProps) => {
  return (
    <div className={classNameDiv ? classNameDiv : "col form-group"}>
      <label className={classNameLabel}>{title}</label>
      <select
        className={`form-select ${
          error ? "is-invalid" : ""
        } ${classNameSelect}`}
        disabled={!status}
        required
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onBlur={onBlur}
      >
        <option value={0} disabled>
          Elige una opción...
        </option>
        {items?.map((v: Option) => (
          <option key={v.id} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>

      {/* Siempre ocupa espacio */}
      <div className="invalid-feedback">{error || ""}</div>
    </div>
  );
};

export default SelectForm;
