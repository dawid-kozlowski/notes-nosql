import styled from "styled-components";
import { MdAddCircleOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { saveText, getKey } from "../services/services";

function Menu() {
  const handleSave = () => {
    saveText("Automata", "2B");
  };

  const handleGet = () => {
    getKey("Automata");
  };

  return (
    <View>
      <Container>
        <Icon onClick={handleSave} as={MdAddCircleOutline} />
        <Icon onClick={handleGet} as={MdDeleteOutline} />
      </Container>
    </View>
  );
}

export default Menu;

const View = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 2075px) {
    margin-top: 2rem;
  }
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

const Icon = styled.div`
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
`;
