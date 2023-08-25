import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';

function CountryDetails() {
    const { countryId } = useParams();
    const [country, setCountry] = useState('');

    const apiUrl = `https://ih-countries-api.herokuapp.com/countries/${countryId}`

    useEffect(() => {

        fetch(apiUrl)
            .then((res) => {
               return res.json()
            })
            .then((data) => {
                console.log(data);
                return setCountry(data)
            })
            .catch((err) => console.log(err))

    }, [apiUrl]); // Add apiUrl to dependency array

    if (!country) {
        return <p>Loading...</p>;
    }

    const alpha2 = country.alpha2Code.toLowerCase();

    return (
        <div className="container">
            <p style={{fontSize: '24px', fontWeight: 'bold'}}>Country Details</p>

            <h1>{country.name.common}</h1>
            <img src={`https://flagpedia.net/data/flags/icon/72x54/${alpha2}.png`} alt="" />

            <table className="table">
                <thead></thead>
                <tbody>
                    <tr>
                        <td style={{width: '30%'}}>Capital</td>
                        <td>{country.capital[0]}</td>
                    </tr>
                    <tr>
                        <td>Area</td>
                        <td>
                            {country.area} km
                            <sup>2</sup>
                        </td>
                    </tr>
                    <tr>
                        <td>Borders</td>
                        <td>
                            <ul>
                            {country.borders.map((border) => {

                                return <li key={border}><Link to={`/${border}`}>{border}</Link></li>
                            })}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CountryDetails;
