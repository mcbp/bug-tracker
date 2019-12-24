import React from 'react'
import styled from 'styled-components'
import uuid from 'uuid'

const FormInstructions = props => {
  const InstructionContainer = styled.ul`
    
  `
  return (
    <InstructionContainer>
      {props.instructions.map(inst => {
        return <li key={uuid()}>{inst}</li>
      })}
    </InstructionContainer>
  )
}

export default FormInstructions
