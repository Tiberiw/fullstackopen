import Country from "./Country";
import CountryToggle from "./CountryToggle";

const MAX_RESULTS = 10;

const Results = ({countries}) => {

    if (countries.length === 0) {
        return <p>No results found</p>
    }

    if (countries.length > MAX_RESULTS) {
        return <p>Too many matches ({countries.length}), specify another filter</p>
    }

    if (countries.length > 1) {
        return <ul>
            {countries.map(country =>
                <CountryToggle key={country.cca3} country={country} />
            )}
        </ul>
    }

    return <Country country={countries[0]}/>
};

export default Results;