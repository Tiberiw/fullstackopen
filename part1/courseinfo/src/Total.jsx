const Total = (props) => {
    const exercises1 = props.exercises1;
    const exercises2 = props.exercises2;
    const exercises3 = props.exercises3;
    return (
        <p>Number of exercises is {exercises1 + exercises2 + exercises3}</p>
    )
};

export default Total;