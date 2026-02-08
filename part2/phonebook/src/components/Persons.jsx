import Person from "./Person";

const Persons = ({persons}) => {
    return <div>{persons.map(it => <Person key={it.id} person={it}/>)}</div>
};

export default Persons;