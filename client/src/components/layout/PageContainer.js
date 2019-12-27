import React from 'react'

const PageContainer = props => {

  const { children, title, small } = props

  const text = !small ? <h1>{title}</h1> : <h2>{title}</h2>

  return (
    <div className="section">
      {title && text}
      {children}
    </div>
  )
}

export default PageContainer
