import styled, { css } from "styled-components";

const LogoText = styled.h2`
  color: #d8d1ba;
  font-weight: 600;
  font-size: 1.31rem;
  letter-spacing: 0.02rem;
  ${({ $category }) =>
    $category === "Notes" &&
    css`
      color: #ffd82b;
    `}
  ${({ $category }) =>
    $category === "Films" &&
    css`
      color: hsl(196, 83%, 75%);
    `}
    ${({ $category }) =>
    $category === "Books" &&
    css`
      color: hsl(106, 47%, 64%);
    `}
`;

export default LogoText;
