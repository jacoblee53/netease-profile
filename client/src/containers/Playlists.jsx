import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import styled from "styled-components/macro";
import { getPlaylists } from "../netease";

import Loader from "../components/Loader";
import { theme, mixins, media, Main } from "../styles";
const { colors, fontSizes, spacing } = theme;

const Wrapper = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
`;
const PlaylistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: ${spacing.md};
  width: 100%;
  margin-top: 50px;
  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  `};
`;
const Playlist = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const PlaylistMask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 30px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
`;
const PlaylistImage = styled.img`
  object-fit: cover;
`;
const PlaylistCover = styled(Link)`
  ${mixins.coverShadow};
  position: relative;
  width: 100%;
  margin-bottom: ${spacing.base};
  &:hover,
  &:focus {
    ${PlaylistMask} {
      opacity: 1;
    }
  }
`;
// const PlaceholderArtwork = styled.div`
//   ${mixins.flexCenter};
//   position: relative;
//   width: 100%;
//   padding-bottom: 100%;
//   background-color: ${colors.darkGrey};
//   svg {
//     width: 50px;
//     height: 50px;
//   }
// `;
// const PlaceholderContent = styled.div`
//   ${mixins.flexCenter};
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
// `;
const PlaylistName = styled(Link)`
  display: inline;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;
const TotalTracks = styled.div`
  text-transform: uppercase;
  margin: 5px 0;
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  letter-spacing: 1px;
`;

function Playlists() {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    getPlaylists().then(res => setPlaylists(res));
  }, []);

  return (
    <Main>
      <h2>Your Playlists</h2>
      <Wrapper>
        <PlaylistsContainer>
          {playlists ? (
            playlists.map(({ id, coverImgUrl, name, trackCount }, idx) => (
              <Playlist key={idx}>
                <PlaylistCover to={id + ""}>
                  <PlaylistImage src={coverImgUrl} alt="Album Art" />
                  <PlaylistMask />
                </PlaylistCover>
                <div>
                  <PlaylistName to={id + ""}>{name}</PlaylistName>
                  <TotalTracks>{trackCount} Tracks</TotalTracks>
                </div>
              </Playlist>
            ))
          ) : (
            <Loader />
          )}
        </PlaylistsContainer>
      </Wrapper>
    </Main>
  );
}

export default Playlists;
