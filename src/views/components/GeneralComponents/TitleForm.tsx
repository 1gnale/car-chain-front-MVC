    interface TitleProps {
        title: string
    }
    function TitleForm(props: TitleProps ) {
        const {title} = props
        return(
    <h5 className="mb-3">
        <strong>{title}</strong>
    </h5>
        )
    }

    export default TitleForm