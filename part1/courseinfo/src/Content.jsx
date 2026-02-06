import Part from './Part'
const Content = ({part1, part2, part3}) => {
    return (
        <div>
            <Part title={part1.name} noExercises={part1.exercises} />
            <Part title={part2.name} noExercises={part2.exercises} />
            <Part title={part3.name} noExercises={part3.exercises} />
        </div>
    )
};

export default Content;