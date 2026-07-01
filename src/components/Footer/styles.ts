import styled from 'styled-components'

export const Footer = styled.footer`
  background: ${(props) => props.theme.darkBgFooter};
  border-top: 1px solid ${(props) => props.theme.borderWeak};
  padding: 2rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`

export const Name = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.textMuted};

  strong {
    color: ${(props) => props.theme.gray};
    font-weight: 600;
  }
`

export const Sep = styled.div`
  width: 1px;
  height: 1rem;
  background: ${(props) => props.theme.borderWeak};
`

export const Links = styled.div`
  display: flex;
  gap: 0.8rem;
`

export const Link = styled.a`
  font-size: 0.85rem;
  color: ${(props) => props.theme.textMuted};
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.3rem 0.8rem;
  border: 1px solid ${(props) => props.theme.borderWeak};
  border-radius: 20px;
  transition: all 0.2s;

  &:hover {
    color: ${(props) => props.theme.gray};
    border-color: ${(props) => props.theme.borderMid};
  }
`
