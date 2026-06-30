const PersonForm = ({ onSubmit, name, number, onNameChange, onNumberChange }) => (
    <form onSubmit={onSubmit}>
        <div>name: <input value={name} onChange={onNameChange} /></div>
        <div>number: <input value={number} onChange={onNumberChange} /></div>
        <button type="submit">add</button>
    </form>
)

export default PersonForm