import React from "react";
import styled from "styled-components/macro";
import { Router } from "@reach/router";
import { theme, media } from "../styles";
import User from "./User";
import LikeArtists from "./LikeArtists";
import LikeTracks from "./LikeTracks";
import Recent from "./Recent";
import Playlists from "./Playlists";
import Nav from "../components/Nav";

const SiteWrapper = styled.div`
  padding-left: ${theme.navWidth};
  ${media.tablet`
    padding-left: 0;
    padding-bottom: 50px;
  `};
`;

function Profile() {
  return (
    <SiteWrapper>
      <Nav />
      <Router primary={false}>
        <User path="/" />
        <LikeArtists path="artists" />
        <LikeTracks path="tracks" />
        <Recent path="recent" />
        <Playlists path="playlists" />
      </Router>
    </SiteWrapper>
  );
}

export default Profile;
