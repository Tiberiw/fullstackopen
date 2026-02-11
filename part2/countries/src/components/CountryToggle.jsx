import { useState } from "react";
import Country from "./Country";
const CountryToggle = ({country}) => {
    const [showCountry, setShowCountry] = useState(false);

    return (
        <li>
            {country.name.common}
            <button onClick={() => setShowCountry(!showCountry)}>
                {showCountry ? 'Hide' : 'Show'}
            </button>
            {showCountry && <Country country={country} />}
        </li>
    )
};

export default CountryToggle;