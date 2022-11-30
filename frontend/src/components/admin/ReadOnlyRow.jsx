import React from 'react'

const ReadOnlyRow = ({ user, index }) => {
  return (
    <div key={user.id} style={{ fontSize: "14px", textAlign: "center", fontFamily: "sans-serif" }}>
      <p style={{ borderRight: "1px solid black" }}>{user.full_name}</p>
      <p style={{ borderRight: "1px solid black" }}>{user.password}</p>
      <p>{user.role}</p>
    </div>
  )
}

export default ReadOnlyRow