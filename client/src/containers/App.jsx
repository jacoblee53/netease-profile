import React, { useEffect, useState } from "react";
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
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const uid = window.localStorage.getItem("netease_uid");
    setUid(uid);
  }, []);

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>
        <AppContainer>
          <GlobalStyle />
          {uid ? <Profile /> : <Login />}
        </AppContainer>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
