const Notifications = ({ message, color }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="notifications" style={{ color: color }}>
            {message}
        </div>
    )
}

export default Notifications