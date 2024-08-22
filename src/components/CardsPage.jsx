import { useEffect, useState } from "react";
import CardItem from "./CardItem";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

import left from './../images/left.svg'
import right from './../images/right.svg'
import PersonCard from "./PersonCard";


const LeftArrow = () => {
    return (
        <img src={left} alt="123" />
    )
}
const RightArrow = () => {
    return (
        <img src={right} alt="123" />
    )
}

const CardsPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const filter = searchParams.get('filter')
    const type = searchParams.get('type')


    const [persons, setPersons] = useState([])
    const [key, setKey] = useState(null)
    const [option, setOption] = useState(['all'])
    const [keysArray, setKeysArray] = useState([])
    const [currentPerson, setCurrentPerson] = useState({
        name: 'Sly Moore',
        height: '178',
        mass: '48',
        hair_color: 'none',
        skin_color: 'pale',
        eye_color: '',
        gender: 'male',
        year: ''
    })
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;
    const pageCount = Math.ceil(persons.length / itemsPerPage);
    let tmpArray = {
        'all': ['all'],
        'height': ['all', '0...100', '100...150', '150...200', '200...250',],
        'mass': ['all', '0...20', '20...40', '40...60', '60...80', '80...100', '100...120', '120...140', '140...160', '160...180',],
        'hair_color': ['all'],
        'skin_color': ['all'],
        'eye_color': ['all'],
        'gender': ['all']
    }

    const fetchData = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                setPersons(prevPersons => [...prevPersons, ...json.results]);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });
    };


    useEffect(() => {
        fetchData('http://swapi.dev/api/people/');
        fetchData('http://swapi.dev/api/people/?page=2');
        fetchData('http://swapi.dev/api/people/?page=3');
        fetchData('http://swapi.dev/api/people/?page=4');
        fetchData('http://swapi.dev/api/people/?page=5');
        fetchData('http://swapi.dev/api/people/?page=6');
        fetchData('http://swapi.dev/api/people/?page=7');
        fetchData('http://swapi.dev/api/people/?page=8');
        fetchData('http://swapi.dev/api/people/?page=9');
    }, [])

    const updateArray = (key) => {
        let fieldsArray = new Set()
        for (let el of persons) {
            fieldsArray.add(el[key])
        }
        for (let el of fieldsArray) {
            tmpArray[key].push(el)
        }
        setKeysArray(tmpArray)
    }

    useEffect(() => {
        updateArray('hair_color')
        updateArray('skin_color')
        updateArray('eye_color')
        updateArray('gender')
    }, [persons])


    const handleSelectChange = (event) => {
        setKey(event.target.value);
        setOption(keysArray[event.target.value])
        const newParams = new URLSearchParams(searchParams);
        newParams.set('type', event.target.value);
        newParams.set('filter', 'all');
        setSearchParams(newParams);
    };

    const filterPeoples = (e) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('filter', e.target.value);
        setSearchParams(newParams);
    }


    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = persons.filter(person => {
        if (type === 'all' || filter === 'all' || type === null || filter === null) return person
        else if (type === 'height' || type === 'mass') {
            let tmp = filter.split('...')
            return Number(person[type]) <= Number(tmp[1]) && Number(person[type]) >= Number(tmp[0])
        }
        else return person[type] === filter
    }

    ).slice(offset, offset + itemsPerPage);


    return (
        <section className="cardspage">
            {currentPerson && <PersonCard
                name={currentPerson.name}
                hair={currentPerson.hair_color}
                skin={currentPerson.skin_color}
                eye={currentPerson.eye_color}
                gender={currentPerson.gender}
                year={currentPerson.birth_year}
                mass={currentPerson.mass}
                height={currentPerson.height} />}
            <div className="container">
                <div className="cards__content">
                    <div className="content__title">{persons.length} Peoples for you to choose your favorite</div>
                    <div className="content__filter">
                        <select onChange={handleSelectChange} className="filter__item" name="" id="">
                            {Object.keys(keysArray).map(item => {
                                return <option key={item} className="filter__option" value={item}>{item}</option>
                            })}

                        </select>
                        <select onChange={filterPeoples} className="filter__item" name="" id="">
                            {option.map(item => {
                                return <option key={item} className="filter__option">{item}</option>
                            })}

                        </select>
                    </div>
                    <div>
                        <div className="content__cards">
                            {currentItems.length ? currentItems.map(person => {
                                return <CardItem person={person} setPerson={setCurrentPerson} key={person.name} name={person.name} height={person.height} mass={person.mass} gender={person.gender} year={person.birth_year} />
                            }) : <>Loading</>}

                        </div>
                        <ReactPaginate className="paginate"
                            previousLabel={<LeftArrow />}
                            nextLabel={<RightArrow />}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}

export default CardsPage;