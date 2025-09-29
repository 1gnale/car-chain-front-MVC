const DarkTitleForm = ({ title }: { title: string }) => {
  return (
    <div
      style={{
        marginBottom: "2rem",
        paddingBottom: "1rem",
        borderBottom: "2px solid #06b6d4",
      }}
    >
      <h2
        style={{
          color: "#06b6d4",
          fontSize: "24px",
          fontWeight: "600",
          margin: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#06b6d4",
            borderRadius: "50%",
            marginRight: "12px",
          }}
        ></span>
        {title}
      </h2>
    </div>
  );
};

export default DarkTitleForm;
