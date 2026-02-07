const Statistics = ({good, neutral, bad}) => {
        const total = good + bad + neutral;
        const average = (good - bad) / total;
        const positive_percentage = 100 * good / total;
    return (
        <>
            <h2>statistics</h2>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {total}</p>
            <p>average {average}</p>
            <p>positive {positive_percentage} %</p>
        </>
    )
}

export default Statistics;