const Notification = ({ message }) => {
    if (message === null) {
        return null        // returning null renders nothing at all
    }
    return <div className="notification">{message}</div>
}

export default Notification