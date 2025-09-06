const Spinner = (props: InfoLabel) => {
  const { title, text } = props;
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="text-primary mb-4 text-center px-3">{title}</h1>
      <div className="text-center">
        <div
          className="spinner-border text-primary mb-3"
          style={{ width: "4rem", height: "4rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <p className="text-muted mt-3 text-center">{text}</p>
    </div>
  );
};

export default Spinner;
