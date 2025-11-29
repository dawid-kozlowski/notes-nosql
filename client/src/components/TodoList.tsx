import styled from "styled-components";
import TodoCard from "./TodoCard";
import Menu from "./Menu";
import useCards from "../hooks/useCards";

function TodoList() {
  const { isLoading, cards, error, reload } = useCards();

  return (
    <>
      <Menu reload={reload} />
      <View>
        {isLoading && <Message>Loading...</Message>}
        {error && <Message>Error: {error ?? "Unknown error"}</Message>}
        {!isLoading && !error && cards.length === 0 && (
          <Message>No notes yet. Create one!</Message>
        )}
        {cards.map((card) => (
          <TodoCard key={card.id} id={card.id} content={card.content} />
        ))}
      </View>
    </>
  );
}

export default TodoList;

const View = styled.div`
  display: grid;
  width: 80vw;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const Message = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--text);
  font-size: larger;
  font-weight: bold;
  z-index: 1000;
`;
