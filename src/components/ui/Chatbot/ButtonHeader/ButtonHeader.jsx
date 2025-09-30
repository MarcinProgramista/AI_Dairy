import styled from "styled-components";

const ButtonHeader = styled.button`
  border: none;
  height: 40px;
  width: 40px;
  color: #d8d1ba;
  cursor: pointer;
  padding-top: 2px;
  margin-right: -10px;
  font-size: 1.9rem;
  border-radius: 50%;
  background: hsl(0, 0%, 10%);
  transition: 0.2s ease;

  &:hover {
    background: hsl(0, 0%, 10%);
  }
`;

export default ButtonHeader;
