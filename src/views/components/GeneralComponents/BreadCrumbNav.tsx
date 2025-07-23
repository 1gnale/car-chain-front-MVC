interface BreadCrumbNavProps {
  page: string;
  link?: string;
}

const BreadCrumbNav = ({ items }: { items: BreadCrumbNavProps[] }) => {
  const navStyle: React.CSSProperties & { [key: string]: any } = {
    "--bs-breadcrumb-divider": "'>';",
  };

  return (
    <nav
      style={navStyle}
      aria-label="breadcrumb"
      className="navbar-light bg-light"
    >
      <ol className="breadcrumb">
        <li className="breadcrumb-item" style={{ textIndent: "10px" }}>
          <a href="/">Home</a>
        </li>
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {item.link ? <a href={item.link}>{item.page}</a> : item.page}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumbNav;
