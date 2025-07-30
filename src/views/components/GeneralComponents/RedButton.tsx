

const RedButton = ({ onClick, text, style, href } : { onClick?: () => void, text: string, style?: string, href?: string }) => {
    return (
        <a role="button" className={`btn btn-danger ` + style}  href={href ? href : ""} onClick={(e) => { e.preventDefault(); onClick && onClick(); }} type="button">
            {text}
        </a>
    )
}

export default RedButton;