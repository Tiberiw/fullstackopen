const Form = (props) => {
    return (
        <form onSubmit={props.handleFormSubmit}>
            <div>
            <label htmlFor="name">
                Name:
                <input
                autoComplete="off"
                id="name"
                value={props.nameValue}
                onChange={props.nameChanged}
                type="text" />
            </label>
            <label htmlFor="phone">
                Phone:
                <input
                id="phone"
                autoComplete="off"
                value={props.phoneValue}
                onChange={props.phoneChanged}
                />
            </label>
            </div>
            <div>
            <button type="submit">Add</button>
            </div>
        </form>
    )
};

export default Form;