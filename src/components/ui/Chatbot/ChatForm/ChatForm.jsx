import { useRef } from "react";
import styled from "styled-components";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // Update chat history with the user's message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    // Delay 600 ms before showing "Thinking..." and generating response
    setTimeout(() => {
      // Add a "Thinking..." placeholder for the bot's response
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);

      // Call the function to generate the bot's response
      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `Using the details provided above, please address this query: ${userMessage}`,
        },
      ]);
    }, 600);
  };

  return (
    <FormChat onSubmit={handleFormSubmit}>
      <MessageInput ref={inputRef} placeholder="Message..." required />

      <SendButton
        type="submit"
        id="send-message"
        className="material-symbols-rounded"
      >
        arrow_upward
      </SendButton>
    </FormChat>
  );
};

export default ChatForm;

const SendButton = styled.button`
  height: 35px;
  width: 35px;
  border: none;
  flex-shrink: 0;
  color: #fff;
  cursor: pointer;
  display: none; /* hidden by default */
  margin-right: 6px;
  background: hsl(0, 0%, 10%);
  border-radius: 50%;
  font-size: 1.15rem;
  transition: 0.2s ease;

  &:hover {
    background: #593bab; /* optional hover effect */
  }
`;

const FormChat = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  background: #d8d1ba;
  border-radius: 32px;
  outline: 1px solid #cccce5;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.06);
  &:focus-within {
    outline: 2px solid hsl(0, 0%, 10%);
  }
`;

const MessageInput = styled.input`
  width: 100%;
  height: 47px;
  border: none;
  outline: none;
  font-size: 0.95rem;
  padding: 0 17px;
  background: none;

  &:valid + button {
    display: block;
  }
`;
