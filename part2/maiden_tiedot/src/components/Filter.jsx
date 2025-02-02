const Filter = ({ newChar, changeChar }) => {
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

export default Filter