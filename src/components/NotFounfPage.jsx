import { useNavigate } from 'react-router';
import img from './../images/404.png'
const NotFoundPage = () => {
    const nav = useNavigate()
    return (
        <section className="notfound">
            <img src={img} alt="" className="page__img" />
            <button onClick={() => nav(-1)} className="page__return">Return</button>
        </section>
    );
}

export default NotFoundPage;