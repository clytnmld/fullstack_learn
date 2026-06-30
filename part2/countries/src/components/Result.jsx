import Country from './Country'

const Results = ({ matches, selected, setSelected, search }) => {
    if (selected) {
        return <Country country={selected} />       // explicit pick wins over everything
    }
    if (search === '') {
        return <p>Please type something</p>
    }
    if (matches.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    if (matches.length === 1) {
        return <Country country={matches[0]} />
    }
    if (matches.length === 0) {
        return <p>No matches</p>
    }
    return (
        <div>
            {matches.map(country =>
                <div key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => setSelected(country)}>show</button> { }
                </div>
            )}
        </div>
    )
}

export default Results