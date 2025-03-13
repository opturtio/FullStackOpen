const Search = ({ newChar, changeChar }) => {
    return (
        <form>
            Find Country
            <input
                value={newChar}
                onChange={changeChar}
            />
        </form>
    )
}

export default Search