const ControlForm = ({
  title,
  id,
  className,
  type,
  name,
}: {
  title: string;
  id: string;
  className: string;
  type: string;
  name: string;
}) => {
  return (
    <div className="mb-3">
      <label htmlFor="fechaNacimiento" className="form-label">
        {title}
      </label>
      <input type={type} className={className} id={id} name={name} required />
    </div>
  );
};
export default ControlForm;
