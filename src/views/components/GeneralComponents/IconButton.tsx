import 'bootstrap/dist/css/bootstrap.min.css';
import type { Icon } from 'react-bootstrap-icons';

type Props = {
  onClick?: () => void;
  text?: string;
  icon: Icon; 
  style?: string;
  href?: string;
  size?: 'sm' | 'lg'; 
};

const IconButton = ({ onClick, text, icon: IconComp, style = "", href, size }: Props) => {
  return (
    <a
      role="button"
      className={`btn btn-secondary d-flex align-items-center gap-2 ${size ? 'btn-' + size : ''} ${style}`}
      href={href || ""}
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
      type="button"
    >
      <IconComp />
      {text && <span>{text}</span>}
    </a>
  );
};

export default IconButton;
