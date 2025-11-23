import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
:root{
  --background: #091a23;
  --text: #b9c2c6;
  --surface: #0d212c;
  --accent: #ff4438;
  --shadow: #351d22;
  --border: #163341;

  height:100%;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color: var(--text);
  background-color: var(--background);
}

body{
  margin: 0;
  min-height: 100%;
  display: flex;
  justify-content:center;
  align-items:center;
  }

  textarea{
  min-height:300px;
  background-color: var(--surface);
  border-radius: 10px;
  border: 1px solid var(--accent);
  resize: none;
  padding: 1.5rem;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color: var(--text);
  }
`;
