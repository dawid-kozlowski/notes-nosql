import styled from "styled-components";
import TodoCard from "./TodoCard";
import Menu from "./Menu";
import useCards from "../hooks/useCards";

function TodoList() {
  const { isLoading, cards, error } = useCards();
  return (
    <>
      <Menu />

      <View>
        {isLoading && <Message>Loading...</Message>}
        {error && <Message>Error: {error ?? "Unkown error"}</Message>}
        {!isLoading && !error && cards.length === 0 && (
          <Message>No notes yet. Create one!</Message>
        )}
        {cards.map((card, i) => (
          <TodoCard key={i} content={card} />
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
`;
