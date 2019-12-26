import React, { useState } from 'react'
import styled from 'styled-components'

const ExpandingModule = props => {

  const { children, title, icon, color } = props

  const [isOpen, setIsOpen] = useState(false)

  const FormContainer = styled.div`
    overflow: hidden;
    padding: 0;
  `
  const Header = styled.div`
    padding: 20px;
    cursor: pointer;
    background-color: ${isOpen ? color : ''};
    color: ${isOpen ? '#fff' : ''};
  `
  const Title = styled.h5`
    margin: 0;
    line-height: 1;
  `
  const Icon = styled.i`
    margin-left: 6px;
    line-height: 1;
    vertical-align: middle;
    font-size: 1.64rem;
  `
  const Children = styled.div`
    padding: 10px 20px 20px;
    display: ${isOpen ? 'block' : 'none'}
  `

  return (
    <FormContainer className="module full-width">

      <Header onClick={() => setIsOpen(!isOpen)}>
        { title && <Title>{ title }
          { icon && <Icon className="material-icons">{ icon }</Icon>}
        </Title>}
      </Header>

      <Children>
        { children }
      </Children>

    </FormContainer>
  )
}

export default ExpandingModule
