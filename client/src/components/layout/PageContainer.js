import React from 'react'

const PageContainer = props => {

  const { children, title } = props
  return (
    <div className="section">
      {title && <h1>{title}</h1>}
      {children}
    </div>
  )
}

export default PageContainer
