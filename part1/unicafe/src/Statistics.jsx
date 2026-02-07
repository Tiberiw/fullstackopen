import StatisticLine from "./StatisticLine";

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
    const positivePercentage = `${100 * good / total}%`;
    return (
        <>
            <h2>statistics</h2>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={total}/>
            <StatisticLine text="average" value={average}/>
            <StatisticLine text="positive" value={positivePercentage}/>
        </>
    )
}

export default Statistics;