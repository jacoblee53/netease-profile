import React from "react";
import styled from "styled-components/macro";
import { Router } from "@reach/router";
import { theme, media } from "../styles";
import Nav from "../components/Nav";
import User from "./User";
import LikeArtists from "./LikeArtists";
import TopTracks from "./TopTracks";
import Recent from "./Recent";
import Playlists from "./Playlists";
import Artist from "./Artist";
import Playlist from "./Playlist";
import Track from "./Track";
import Recommendations from "./Recommendations.jsx";

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
        <TopTracks path="tracks" />
        <Recent path="recent" />
        <Playlists path="playlists" />
        <Playlist path="playlists/:playlistId" />
        <Track path="track/:trackId" />
        <Recommendations path="recommendations/:playlistId" />
        <Artist path="artist/:artistId" />
      </Router>
    </SiteWrapper>
  );
}

export default Profile;
