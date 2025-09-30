import styled, { css } from "styled-components";

const SpanComent = styled.span`
  background: hsl(0, 0%, 10%);
  color: hsl(0, 0%, 10%);
  position: -9999;
  opacity: 1;
  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
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

export default SpanComent;
