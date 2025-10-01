import styled from "styled-components";

const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 460px;
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  overflow-y: auto;
  margin-bottom: 82px;
  padding: 25px 22px;
  scrollbar-width: thin;
  scrollbar-color: #d8d1ba transparent;

  @media (max-width: 520px) {
    height: calc(90% - 55px);
    padding: 25px 15px;
  }
`;

export default ChatBody;
