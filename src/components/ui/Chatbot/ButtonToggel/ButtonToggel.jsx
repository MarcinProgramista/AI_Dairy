import styled, { css } from "styled-components";

const ButtonToggel = styled.button`
  position: fixed;
  bottom: 30px;
  right: 35px;
  border: none;
  height: 50px;
  width: 50px;
  display: flex;
  cursor: pointer;

  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: hsl(0, 0%, 10%);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  @media (max-width: 520px) {
    right: 20px;
    bottom: 20px;
  }

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

export default ButtonToggel;
