interface InputProps {
  title: string;
  place: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  onBlur?: () => void;
  disabled?: boolean;
  style?: string
}

const Input = ({ title, place, value, onChange, error, onBlur, disabled, style }: InputProps) => {
  return (
    <div className="col">
      <label htmlFor="exampleInputEmail1">{title}</label>
      <input 
        className={`form-control ${error ? 'is-invalid' : ''} ${style}`}
        placeholder={place}
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        disabled= {disabled}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Input;
