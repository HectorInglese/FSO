import { useParams } from "react-router-dom"

const Country = () => {
    const { id } = useParams();
    return (
        <div>Country number {id}</div>
    );
}; export default Country;