import { useNavigate } from 'react-router';
import img from './../images/BannerComplete.svg';
const MainPage = () => {
    const nav = useNavigate()
    return (
        <section className="mainpage">
            <div className="container">
                <div className="page__content">
                    <div className="content__desc">
                        <div className="desc__title">Find all your
                            favorite character</div>
                        <div className="desc__subtitle">You can find out all the information about your favorite characters</div>
                        <button onClick={()=>nav('*')} className="desc__button">See more...</button>
                    </div>
                    <div className="content__image">
                        <img src={img} alt="123" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MainPage;   