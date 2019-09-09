import React from 'react'

const Notification = props => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return props.store.getState().notifications === null ? null : (
    <div>
      <h2>Notification</h2>
      <div style={style}>{props.store.getState().notifications}</div>
    </div>
  )
}

export default Notification
