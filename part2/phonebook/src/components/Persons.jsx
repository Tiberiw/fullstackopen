import Person from "./Person";

const Persons = ({persons, onDelete}) => {
    return <div>{persons.map(it => <Person key={it.id} person={it} onDelete={onDelete}/>)}</div>
};

export default Persons;