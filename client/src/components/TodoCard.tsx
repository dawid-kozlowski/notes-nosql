import styled from "styled-components";
import { useState } from "react";

interface TodoCardProps {
  content: string;
}

function TodoCard({ content }: TodoCardProps) {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  return (
    <Card
      readOnly={isReadOnly}
      onDoubleClick={() => setReadOnly((prev) => !prev)}
      onBlur={() => {
        setReadOnly(true);
      }}
    >
      {`${content}`}
    </Card>
  );
}

export default TodoCard;

const Card = styled.textarea<{ readOnly?: boolean }>`
  cursor: ${(props) => (props.readOnly ? "pointer" : "text")};
  border-color: ${(props) =>
    props.readOnly ? "var(--border)" : "var(--accent)"};
  color: ${(props) => (props.readOnly ? "var(--text)" : "white;")};

  box-shadow: ${(props) =>
    props.readOnly ? "none" : "0 0 10px var(--accent)"};

  &:focus {
    outline: none;
  }

  &:hover {
    border-color: var(--accent);
  }
`;
