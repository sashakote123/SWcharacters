import { useEffect, useRef } from "react";
import img from './../images/cardImg.svg'
import img2 from './../images/closeIcon.svg'

const PersonCard = ({ name, hair, skin, eye, gender, year, mass, height }) => {

    const ref = useRef();
    const ref2 = useRef();
    useEffect(() => {
        if (ref.current) {
            if (gender === 'male') {
                ref.current.classList.remove('female');
                ref.current.classList.remove('hermaphrodite');
                ref.current.classList.add('male');
            } else if (gender === 'female') {
                ref.current.classList.remove('male');
                ref.current.classList.remove('hermaphrodite');
                ref.current.classList.add('female');
            } else if (gender === 'hermaphrodite') {
                ref.current.classList.remove('female');
                ref.current.classList.remove('male');
                ref.current.classList.add('hermaphrodite');
            }
        }
    }, [gender]);

    const toggleVisibility = () => {
        ref2.current.classList.add('none')
    }

    return (
        <div ref={ref2} className="overflow none">
            <div className="person__card">
                <button onClick={toggleVisibility} className="close-btn">
                    <img src={img2} alt="" />
                </button>
                <div className="card__avatar">
                    <img src={img} alt="" className="avatar__image" />
                    <ul className="item__subinf">
                        {gender !== 'n/a' ? <li ref={ref} className="subinf__gender">{gender}</li> : <></>}
                        {year !== 'unknown' ? <li className="subinf__year">{year}</li> : <></>}
                    </ul>
                </div>
                <div className="card__description">
                    <div className="description__title">{name}</div>
                    <ul className="description__stats">
                        <li className="stats__item">hair color: {hair}</li>
                        <li className="stats__item">skin color: {skin}</li>
                        <li className="stats__item">eye color: {eye}</li>
                    </ul>
                    <ul className="description__substats">
                        {mass !== 'unknown' ? <li className="substats__item">
                            <div className="desc__number">{mass}</div>
                            <div className="desc__name">mass</div>
                        </li> : <></>}
                        {height !== 'unknown' ? <li className="substats__item">
                            <div className="desc__number">{height}</div>
                            <div className="desc__name">height</div>
                        </li> : <></>}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PersonCard;