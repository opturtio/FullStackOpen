const Filter = (props) => {
  return (
    <form>
      <div>
        filter shown with
        <input
          value={props.newChar}
          onChange={props.changeChar}
        />
      </div>
    </form>
  )
}

  export default Filter