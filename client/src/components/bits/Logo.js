import React, { Fragment } from 'react'
import LogoImage from '../../assets/bug.png'
import styled from 'styled-components'

const Logo = () => {

  const ImgWrapper = styled.div`
    width: 120px;
    margin: 30px auto 0;
  `
  const Img = styled.img`
    width: 120px;
    object-fit: contain;
  `
  const Title = styled.li`
    text-align: center;
    font-family: monospace;
  `

  return (
    <Fragment>
      <ImgWrapper>
        <Img src={LogoImage} />
      </ImgWrapper>
      <Title>Version 1.0.0</Title>
      <li><div className="divider"></div></li>
    </Fragment>
  )
}

export default Logo
