const Total = ({parts}) => {
    const sum = parts
        .reduce((accumulator, current) => accumulator + current.exercises, 0)
    return <p><b>total of {sum} exercises</b></p>;
};

export default Total;