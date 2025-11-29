import styled, { css } from "styled-components";
import { MdAddCircleOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { saveCard, delCard } from "../services/services";
import { useCardStore } from "../stores/cardStore";

function Menu({ reload }: { reload: () => Promise<void> }) {
  const { editingCard, setEditingCard } = useCardStore();

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
      </Container>
    </View>
  );
}

export default Menu;

const View = styled.div`
  display: flex;
  justify-content: center;
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
