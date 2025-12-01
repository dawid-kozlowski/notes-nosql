import styled, { css } from "styled-components";
import {
  MdAddCircleOutline,
  MdDeleteForever,
  MdDeleteOutline,
} from "react-icons/md";
import { saveCard, delCard, delCardAll } from "../services/services";
import { useCardStore } from "../stores/cardStore";
import { useState } from "react";

function Menu({ reload }: { reload: () => Promise<void> }) {
  const { editingCard, setEditingCard } = useCardStore();
  const [deleteAll, setDeleteAll] = useState<boolean>(false);
  const handleSave = async () => {
    const date = Date.now();
    const formattedDate = new Date(date).toLocaleString([], {
      hour12: false,
    });
    const key = `card:${date}`;
    await saveCard(key, `New card created at ${formattedDate}`);
    await reload();
    setEditingCard(null);
  };

  const handleDelete = async () => {
    if (!editingCard) return;
    await delCard(editingCard);
    setEditingCard(null);
    await reload();
  };

  const handleDeleteAll = async () => {
    await delCardAll();
    await reload();
    setDeleteAll(false);
  };

  return (
    <View>
      <Container>
        <Icon
          title="Add New Card"
          onClick={handleSave}
          as={MdAddCircleOutline}
        />
        <Icon
          title="Delete Currently Outlined Card"
          disabled={!!editingCard}
          $variant="delete"
          $disabled={!!editingCard}
          onClick={handleDelete}
          as={MdDeleteOutline}
        />
        <Icon
          title="Delete All Cards"
          onClick={() => {
            console.log(length);
            setDeleteAll(true);
          }}
          as={MdDeleteForever}
        />
      </Container>
      {deleteAll && (
        <DeleteContainer style={{ flexDirection: "column" }}>
          <P>Delete all cards?</P>
          <DeleteContainer>
            <Button
              onClick={() => {
                handleDeleteAll();
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                setDeleteAll(false);
              }}
            >
              Cancel
            </Button>
          </DeleteContainer>
        </DeleteContainer>
      )}
    </View>
  );
}

export default Menu;

const DeleteContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const P = styled.p`
  color: var(--accent);
  font-weight: 600;
  margin: 0;
`;

const Button = styled.button`
  background-color: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
`;

const View = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  background-color: var(--surface);
  border: 1px solid var(--border);
  padding: 1rem;
  border-radius: 50px;
`;

const Icon = styled.button<{ $variant?: "delete"; $disabled?: boolean }>`
  height: 37px;
  width: 37px;
  cursor: pointer;
  transition: transform 0.1s ease;

  &:hover {
    color: var(--accent);
  }

  &:active {
    transform: scale(0.95);
  }

  ${({ $variant, $disabled }) =>
    $variant === "delete" &&
    css`
      opacity: ${!$disabled ? "0.5" : "1"};
      cursor: ${!$disabled ? "default" : "pointer"};

      &:hover {
        color: ${!$disabled ? "var(--text)" : "var(--accent)"};
      }

      &:active {
        transform: ${!$disabled ? "none" : "scale(0.95)"};
      }
    `}
`;
