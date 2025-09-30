import styled, { css } from "styled-components";

const ChatbotPopup = styled.div`
  position: fixed;
  width: 420px;
  opacity: 0;
  right: 35px;
  bottom: 90px;
  pointer-events: none;
  transform: scale(0.2);
  overflow: hidden;
  background: #d8d1ba;
  border-radius: 15px;
  transform-origin: bottom right;
  box-shadow: 0 0 128px 0 rgba(0, 0, 0, 0.1),
    0 32px 64px -48px rgba(0, 0, 0, 0.5);
  transition: all 0.1s ease;

  @media (max-width: 520px) {
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    border-radius: 0;
  }
  /* Gdy popup aktywny (np. props isOpen) */
  ${({ $isOpen }) =>
    $isOpen &&
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

export default ChatbotPopup;
