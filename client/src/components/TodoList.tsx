import styled from "styled-components";
import { content } from "../lib/mock";
import TodoCard from "./TodoCard";
import Menu from "./Menu";

function TodoList() {
  return (
    <>
      <Menu />
      <View>
        {content.map((card, i) => (
          <TodoCard key={i} title={card.title} description={card.description} />
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
