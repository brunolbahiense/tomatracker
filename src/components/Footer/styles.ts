import styled from 'styled-components'

export const Footer = styled.footer`
  background: ${(props) => props.theme.darkBgFooter};
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`

export const Name = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);

  strong {
    color: rgba(255, 255, 255, 0.6);
    font-weight: 600;
  }
`

export const Sep = styled.div`
  width: 1px;
  height: 1rem;
  background: rgba(255, 255, 255, 0.1);
`

export const Links = styled.div`
  display: flex;
  gap: 0.8rem;
`

export const Link = styled.a`
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.3rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  transition: all 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.6);
    border-color: rgba(255, 255, 255, 0.2);
  }
`
