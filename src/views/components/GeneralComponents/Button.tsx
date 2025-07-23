

const GrayButton = ({ onClick, text, style, href } : { onClick?: () => void, text: string, style?: string, href?: string }) => {
    return (
        <a role="button" className={`btn btn-secondary ` + style}  href={href ? href : ""} onClick={(e) => { e.preventDefault(); onClick && onClick(); }} type="button">
            {text}
        </a>
    )
}

export default GrayButton;