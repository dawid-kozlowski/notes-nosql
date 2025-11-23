import styled from "styled-components";
import { useState } from "react";

interface TodoCardProps {
  title: string;
  description: string;
}

function TodoCard({ title, description }: TodoCardProps) {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  return (
    <Card
      readOnly={isReadOnly}
      onClick={() => setReadOnly((prev) => !prev)}
      onBlur={() => {
        setReadOnly(true);
      }}
    >
      {`${title}
        ${description}`}
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
