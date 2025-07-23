const CustomFileInput = ({ title }: { title: string }) => {
  return (
    <div className="col">
      <label className="exampleInputEmail1">{title}</label>
      <div className="custom-file">
        <input type="file" className="custom-file-input" />
      </div>
    </div>
  );
};
export default CustomFileInput;
