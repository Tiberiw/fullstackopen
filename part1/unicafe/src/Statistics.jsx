const Statistics = ({good, neutral, bad}) => {
    const total = good + bad + neutral;
    if (total === 0) {
        return (
            <>
                <h2>statistics</h2>
                <p> No feedback given </p>
            </>
        )
    }
    const average = (good - bad) / total;
    const positivePercentage = 100 * good / total;
    return (
        <>
            <h2>statistics</h2>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {total}</p>
            <p>average {average}</p>
            <p>positive {positivePercentage} %</p>
        </>
    )
}

export default Statistics;