import styled from "styled-components";

const ChatHeader = styled.div`
  display: flex;
  padding: 15px 22px;
  align-items: center;
  background: hsl(0, 0%, 10%);
  justify-content: space-between;

  @media (max-width: 520px) {
    padding: 12px 15px;
  }
`;

export default ChatHeader;
