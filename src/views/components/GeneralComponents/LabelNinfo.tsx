function LabelNinfo(props: InfoLabel) {
  const { title, text } = props;

  return (
    <div className="d-flex mb-1">
      <div style={{ minWidth: "150px" }}>
        <strong>
          <label>{title}</label>
        </strong>
      </div>
      <div>
        <label>{text}</label>
      </div>
    </div>
  );
}

export default LabelNinfo;
