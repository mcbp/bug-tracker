import React from 'react'

const PageContainer = props => {
  return (
    <div className="section">
      {props.title && <h1>{props.title}</h1>}
      {props.children}
    </div>
  )
}

export default PageContainer
