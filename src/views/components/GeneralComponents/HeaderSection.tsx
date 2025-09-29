const HeaderSection = ({
  title,
  text,
  classname,
}: {
  title: string;
  text: string;
  classname?: string;
}) => {
  return (
    <div className={`bg-white p-4 rounded shadow-sm mb-4  ${classname}`}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted">{text}</p>
    </div>
  );
};
export default HeaderSection;
