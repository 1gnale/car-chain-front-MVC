const TitleSection = ({ title }: { title: string }) => {
  return (
    <nav className="d-flex flex-column bd-highlight navbar-light bg-secondary">
      <div style={{ textAlign: "center" }}>
        <strong>
          <div
            className="p-2 bd-highlight"
            style={{ color: "white", fontSize: "x-large" }}
          >
            {title}
          </div>
        </strong>
      </div>
    </nav>
  );
};

export default TitleSection;
