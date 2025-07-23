interface InputProps {
  title: string;
  place: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  onBlur?: () => void;
}

const Input = ({ title, place, value, onChange, error, onBlur }: InputProps) => {
  return (
    <div className="col">
      <label htmlFor="exampleInputEmail1">{title}</label>
      <input 
        className={`form-control ${error ? 'is-invalid' : ''}`}
        placeholder={place}
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Input;
