import styled, { css } from "styled-components";
import ChatbotIcon from "../ChatbotIcon/ChatbotIcon";

const ChatMessage = ({ chat }) => {
  return (
    !chat.hideInChat && (
      <MessageRow $role={chat.role} $isError={chat.isError}>
        {chat.role === "model" && <ChatbotIcon />}
        <Message $user={chat.role === "user"} $bot={chat.role === "model"}>
          {chat.text}
        </Message>
      </MessageRow>
    )
  );
};

export default ChatMessage;
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
// Styled component for the container div
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
