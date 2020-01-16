import React, { Component } from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  padding-left: 300px;
  @media (max-width: 992px) {
    padding-left: 0;
  }
  position: fixed;
  background-color: #fff;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.8px solid rgba(0,0,0,0.14);
  z-index: 10;
`
const FooterLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  color: #000;
  font-size: 13px;
`
const FooterIcon = styled.i`
  font-size: 15px;
  padding-right: 4px;
`

const Footer = () => {

	return (
		<FooterContainer>
			<FooterLink href="https://michaelpriest.dev">
        <FooterIcon className="material-icons">code</FooterIcon>
        Developed by Michael Priest</FooterLink>
			<FooterLink href="https://github.com/mcbp/bug-tracker">
        <FooterIcon className="fab fa-github"></FooterIcon>
        GitHub</FooterLink>
		</FooterContainer>
	)
}

export default Footer
