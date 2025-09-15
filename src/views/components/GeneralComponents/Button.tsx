const GrayButton = ({
  onClick,
  text,
  style,
  href,
  disabled,
}: {
  onClick?: () => void;
  text: string;
  style?: string;
  href?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled || false}
      role="button"
      className={`btn btn-secondary ` + style}
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
      type="button"
    >
      {text}
    </button>
  );
};

export default GrayButton;
