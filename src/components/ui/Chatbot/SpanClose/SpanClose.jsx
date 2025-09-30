import styled, { css } from "styled-components";

const SpanClose = styled.span`
  background: hsl(0, 0%, 10%);
  color: hsl(0, 0%, 10%);
  opacity: 1;
  text-align: center;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      opacity: 0;
      pointer-events: auto;
      transform: scale(1);
    `}
  ${({ $category }) =>
    $category === "Notes" &&
    css`
      background-color: #ffd82b;
    `}
  ${({ $category }) =>
    $category === "Films" &&
    css`
      background-color: hsl(196, 83%, 75%);
    `}
  ${({ $category }) =>
    $category === "Books" &&
    css`
      background-color: hsl(106, 47%, 64%);
    `}
`;

export default SpanClose;
