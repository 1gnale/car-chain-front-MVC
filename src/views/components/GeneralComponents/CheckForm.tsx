interface CheckFormProps {
  title: string;
  text: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckForm = ({ title, text, checked, onChange }: CheckFormProps) => {
  return (
    <div className="col">
      <label htmlFor="exampleInputEmail1">{title}</label>
      <div className="form-check form-switch">
        <input 
          className="form-check-input" 
          type="checkbox"
          checked={checked || false}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          {text}
        </label>
      </div>
    </div>
  );
};
export default CheckForm;
