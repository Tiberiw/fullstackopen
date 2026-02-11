const Country = ({country}) => {
    const {name, capital, area, languages, flags} = country;

    return (
        <div>
            <h1>{name.common}</h1>
            <div>Capital {capital?.[0]}</div>
            <div>Area {area}</div>
            <h2>Languages</h2>
            <ul>
                {Object.values(languages || {}).map(lang =>
                    <li key={lang}>{lang}</li>
                )}
            </ul>
            <img className="flag" src={flags?.png} alt={`Flag of ${name.common}`} />
        </div>
    )
};

export default Country;