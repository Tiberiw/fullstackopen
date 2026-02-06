import Part from './Part'
const Content = ({part1, exercises1, part2, exercises2, part3, exercises3}) => {
    return (
        <div>
            <Part title={part1} noExercises={exercises1} />
            <Part title={part2} noExercises={exercises2} />
            <Part title={part3} noExercises={exercises3} />
        </div>
    )
};

export default Content;