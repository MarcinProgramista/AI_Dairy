import styled, { css } from "styled-components";

const Message = styled.p`
  padding: 12px 16px;
  max-width: 75%;
  font-size: 0.95rem;
  word-wrap: break-word;
  white-space: pre-line;
  ${({ $user }) =>
    $user &&
    css`
      color: #d8d1ba;
      background: hsl(0, 0%, 10%);
      border-radius: 13px 13px 3px 13px;
    `}
  ${({ $bot }) =>
    $bot &&
    css`
      background: wheat;
      border-radius: 15px 15px 15px 3px;
    `}
`;

export default Message;
