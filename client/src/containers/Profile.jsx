import React from "react";
import styled from "styled-components/macro";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { theme, media } from "../styles";
import User from "./User";
import Login from "./Login";
import LikeArtists from "./LikeArtists";
import LikeTracks from "./LikeTracks";
import Recent from "./Recent";
import Playlists from "./Playlists";

const SiteWrapper = styled.div`
  padding-left: ${theme.navWidth};
  ${media.tablet`
    padding-left: 0;
    padding-bottom: 50px;
  `};
`;

const routes = [
  {
    path: "/",
    exact: true,
    component: User
  },
  {
    path: "/artists",
    component: LikeArtists
  },
  {
    path: "/tracks",
    component: LikeTracks
  },
  {
    path: "/recent",
    component: Recent
  },
  {
    path: "/playlist",
    component: Playlists
  }
];

function Profile() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <SiteWrapper>
          {routes.map((route, idx) => (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </SiteWrapper>
      </Switch>
    </Router>
  );
}

export default Profile;
