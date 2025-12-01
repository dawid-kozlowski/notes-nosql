import styled from "styled-components";
import { useCardStore } from "../stores/cardStore";
import { saveCard } from "../services/services";
import { useState } from "react";

interface TodoCardProps {
  id: string;
  content: string;
}

function TodoCard({ id, content: initialContent }: TodoCardProps) {
  const { editingCard, setEditingCard } = useCardStore();
  const isEditing = editingCard === id;
  const [content, setContent] = useState(initialContent);
  const [showMessage, setShowMessage] = useState(false);

  const showSuccessMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleBlur = async () => {
    if (isEditing && content !== initialContent) {
      const response = await saveCard(id, content);
      setEditingCard(null);
      if (response.status === 200) showSuccessMessage();
    }
  };

  return (
    <View>
      <Card
        id={id}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        readOnly={!isEditing}
        $editing={isEditing}
        onDoubleClick={() => setEditingCard(id)}
        onBlur={handleBlur}
      />
      {showMessage && <Message>Card updated successfully!</Message>}
    </View>
  );
}

export default TodoCard;

const Card = styled.textarea<{ readOnly?: boolean; $editing?: boolean }>`
  cursor: ${(props) => (props.readOnly ? "pointer" : "text")};
  border-color: ${(props) =>
    props.readOnly || !props.$editing ? "var(--border)" : "var(--accent)"};
  color: ${(props) => (props.readOnly ? "var(--text)" : "white")};

  box-shadow: ${(props) =>
    props.readOnly ? "none" : "0 0 20px var(--accent)"};

  &:focus {
    outline: none;
  }

  &:hover {
    border-color: var(--accent);
  }
`;

const Message = styled.div`
  position: absolute;
  bottom: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  color: var(--accent);
  white-space: nowrap;
  font-weight: 500;
`;

const View = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 4rem;
`;
