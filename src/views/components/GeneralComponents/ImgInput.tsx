
interface exampleInputEmail1 {
    title: string
}

export default function ImgInput(props: exampleInputEmail1) {
    const {title} = props
return (
    <div className="col">
    <label htmlFor="exampleInputEmail1">{title}</label>
    <div className="custom-file">
        <input
        type="file" 
        className="form-control" 
        id="inputGroupFile01"
        lang="es"
        />
    </div>
    </div>
);
}





