import React, { useEffect, useRef } from 'react'
import M from 'materialize-css'
import styled from 'styled-components'

const ExpandingModule = props => {

  const { children, title, icon, color } = props

  const Title = styled.div`
    font-family: 'Alata';
    font-size: 18px;
    line-height: 1.2em;
  `
  const Icon = styled.i`
    vertical-align: middle;
  `
  const Children = styled.div`
    padding: 15px;
  `

  const collapsible = useRef(null)

  useEffect(() => {
    const elem = collapsible.current
    var instance = M.Collapsible.init(elem, {
      accordion: false
    })
  }, [])

  const style = {
    boxShadow: "0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24)"
  }

  return (
    <ul ref={collapsible} className="collapsible expandable" style={style}>
      <li>
        <Title className="collapsible-header">
          <Icon className="material-icons">{icon}</Icon>
        { title }</Title>
        <div className="collapsible-body">
          <Children>
            { children }
          </Children>
        </div>
      </li>
    </ul>
  )
}

export default ExpandingModule
