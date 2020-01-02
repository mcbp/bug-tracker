import React from 'react'
import styled from 'styled-components'

const LoadingSpinner = () => {

  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `

  return (
    <Container>
      <div className="preloader-wrapper big active">
        <div className="spinner-layer" style={{borderColor: "#bbb"}}>
          <div className="circle-clipper left">
            <div className="circle" style={{borderWidth: "4px"}}></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle" style={{borderWidth: "4px"}}></div>
          </div>
        </div>
      </div>
    </Container>
  )

}

export default LoadingSpinner
