import { useEffect, useRef } from "react";

const CardItem = ({ name, height, mass, gender, year, person, setPerson }) => {
    const ref = useRef();
    useEffect(() => {
        if (ref.current) {
            if (gender === 'male') {
                ref.current.classList.add('male');
            } else if (gender === 'female') {
                ref.current.classList.add('female');
            } else if (gender === 'hermaphrodite') {
                ref.current.classList.add('hermaphrodite');
            }
        }
    }, [gender]);

    const owerflow = document.querySelector('.overflow')

    const toggleVisibility = () => {
        owerflow.classList.remove('none')
        setPerson(person)
    }

    return (
        <div onClick={toggleVisibility} className="cards__item">
            <div className="item__name">{name}</div>
            <ul className="item__inf">
                {height !== 'unknown' ? <li className="inf__desc">
                    <div className="desc__number">{height}</div>
                    <div className="desc__name">height</div>
                </li> : <></>}

                {mass !== 'unknown' ? <li className="inf__desc">
                    <div className="desc__number">{mass}</div>
                    <div className="desc__name">mass</div>
                </li> : <></>}

            </ul>
            <ul className="item__subinf">
                {gender !== 'n/a' ? <li ref={ref} className="subinf__gender">{gender}</li> : <></>}
                {year !== 'unknown' ? <li className="subinf__year">{year}</li> : <></>}

            </ul>
        </div>
    );
}

export default CardItem;