import styled, { css } from "styled-components";

const MessageRow = styled.div`
  display: flex;
  gap: 8px;
  ${({ $role }) =>
    $role === "user" &&
    css`
      flex-direction: column;
      align-items: flex-end; /* from .chat-body .user-message */
    `}
  ${({ $role }) =>
    $role === "model" &&
    css`
      flex-direction: row;
      align-items: flex-start;
    `} 
  ${({ $isError }) =>
    $isError &&
    css`
      color: #ff0000;
    `}
`;

export default MessageRow;
