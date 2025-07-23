interface Option {
  id: number;
  name: string;
}

interface SelectFormProps {
  title: string;
  items: Option[];
  onChange: (id: number) => void;
  status: boolean;
  value: number;
  error?: string;
  onBlur?: () => void;
}

const SelectForm = ({
  title,
  items,
  onChange,
  status,
  value,
  error,
  onBlur,
}: SelectFormProps) => {
  return (
    <div className="col">
      <label>{title}</label>
      <select
        className={`form-select ${error ? 'is-invalid' : ''}`}
        disabled={!status}
        required
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onBlur={onBlur}
      >
        <option value={0} disabled>
          Elige una opción...
        </option>
        {items.map((v: Option) => (
          <option key={v.id} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SelectForm;
