import styled from "styled-components";

const ChatFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: hsl(0, 0%, 10%);
  padding: 15px 22px 20px;
  @media (max-width: 520px) {
    padding: 10px 15px 15px;
  }
`;

export default ChatFooter;
