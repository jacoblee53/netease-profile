import React, { useState } from "react";
import styled from "styled-components/macro";
import { Input, SIZE } from "baseui/input";
import { useStyletron } from "baseui";
import { theme, Main, mixins } from "../styles";
import { login } from "../netease";

const { colors, fonts } = theme;

const LoginScreen = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
  h1 {
    font-size: ${theme.fontSizes.xxl};
  }
`;

const LoginButton = styled.a`
  display: inline-block;
  background-color: ${colors.red};
  color: ${colors.white};
  border-radius: 30px;
  padding: 17px 35px;
  margin: 20px 0 70px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.offRed};
  }
`;

const LoginFormContainer = styled.div`
  margin: 20px 0;
  min-width: 325px;
  width: 35%;
`;

const IconBefore = ({ children }) => {
  const [css, baseTheme] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        paddingLeft: baseTheme.sizing.scale500
      })}
    >
      {children}
    </div>
  );
};

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LoginScreen>
      <h1>Netease Profile</h1>
      <LoginFormContainer>
        <Input
          overrides={{
            Input: {
              style: { fontFamily: fonts }
            },
            Before: () => (
              <IconBefore>
                <i className="fa fa-phone" />
              </IconBefore>
            )
          }}
          value={phone}
          onChange={e => setPhone(e.target.value)}
          size={SIZE.default}
          placeholder="Phone"
          clearable
        />
        <Input
          overrides={{
            Input: {
              style: { fontFamily: fonts }
            },
            Before: () => (
              <IconBefore>
                <i className="fa fa-lock" />
              </IconBefore>
            )
          }}
          value={password}
          onChange={e => setPassword(e.target.value)}
          size={SIZE.default}
          placeholder="Password"
          type="password"
          clearable
        />
      </LoginFormContainer>
      <LoginButton
        onClick={() => {
          if (phone && password) {
            login({ phone, password });
          }
        }}
      >
        LOG IN TO NETEASE
      </LoginButton>
    </LoginScreen>
  );
}

export default Login;
