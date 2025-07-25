import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SelectFormProps {
  title: string;
  value: Date | null;
  onChange: (fecha: Date | null) => void;
  error?: string;
  onBlur?: () => void;
}

const DateInput = ({ title, value, onChange, onBlur }: SelectFormProps) => {
  return (
    <div className="form-group">
      <label>{title}</label>
      <DatePicker
        selected={value}
        onChange={(date) => onChange(date)}
        onBlur={onBlur}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
        className="form-control"
        autoComplete="off"
        todayButton="Hoy"
      />
    </div>
  );
};

export default DateInput;
