import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import "./HomePage.css"

function HomePage() {

    const [countries, setCountries] = useState([]);
    const apiUrl = 'https://ih-countries-api.herokuapp.com/countries';

    useEffect(() => {

        fetch(apiUrl)
            .then((res) => {
               return res.json()
            })
            .then((data) => {
                console.log(data);
                return setCountries(data)
            })
            .catch((err) => console.log(err))

    }, []);

    return (
        <div className="container" style={{ maxHeight: '90vh', overflow: 'scroll' }}>
        <h1 style={{ fontSize: '24px' }}>WikiCountries: Your Guide to the World</h1>  
            <div className="list-group">
            {countries.map((country) => {
                const alpha3 = '/' + country.alpha3Code
                const alpha2 = country.alpha2Code.toLowerCase()

                return <Link key={country._id} className="list-group-item list-group-item-action" 
                to={alpha3}><li><img src={`https://flagpedia.net/data/flags/icon/72x54/${alpha2}.png`} alt={country.name.common} /> 
                <br/> {country.name.common} </li> </Link>
            })}
            </div>
        </div>

    );
}

export default HomePage;
