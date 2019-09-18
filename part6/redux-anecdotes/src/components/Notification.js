import { connect } from 'react-redux'
import React from 'react'

const Notification = props => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return props.notifications === null ? null : (
    <div>
      <h2>Notification</h2>
      <div style={style}>{props.notifications}</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

export default connect(mapStateToProps)(Notification)
