import Part from './Part'
const Content = ({parts}) => {
    return (
        <div>
            {parts.map(it =>
                <Part key={it.id} part={it}/>
            )}
        </div>
    )
};

export default Content;