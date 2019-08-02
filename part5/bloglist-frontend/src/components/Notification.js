import React from "react"

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  } else {
    if (notification.type === "notification") {
      return <div className="notification">{notification.text}</div>
    } else if (notification.type === "error") {
      return <div className="error">{notification.text}</div>
    }
  }
}

export default Notification
