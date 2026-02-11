import Country from "./Country";

const MAX_RESULTS = 10;

const Results = ({countries}) => {
    if (countries.length > MAX_RESULTS) {
        return <p>Too many matches ({countries.length}), specify another filter</p>
    }

    if (countries.length > 1) {
        return <ul>
            {countries.map(country =>
                <li key={country.cca3}>{country.name.common}</li>)}
        </ul>
    }

    return <Country country={countries[0]}/>
};

export default Results;