import React from "react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { DarkTheme, BaseProvider } from "baseui";
import { GlobalStyle } from "../styles";
import styled from "styled-components/macro";
import Profile from "./Profile";
import Login from "./Login";

const AppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
`;

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>
        <AppContainer>
          <GlobalStyle />
          <Profile />
        </AppContainer>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
