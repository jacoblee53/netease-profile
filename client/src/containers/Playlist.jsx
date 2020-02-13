import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { getPlaylist } from "../netease";

import Loader from "../components/Loader";
import TrackItem from "./TrackItem";

import styled from "styled-components/macro";
import { theme, mixins, media, Main } from "../styles";
const { colors, fontSizes, spacing } = theme;

const PlaylistContainer = styled.div`
  display: flex;
  ${media.tablet`
    display: block;
  `};
`;
const Left = styled.div`
  width: 30%;
  text-align: center;
  min-width: 200px;
  ${media.tablet`
    width: 100%;
    min-width: auto;
  `};
`;
const Right = styled.div`
  flex-grow: 1;
  margin-left: 50px;
  ${media.tablet`
    margin: 50px 0 0;
  `};
`;
const PlaylistCover = styled.div`
  ${mixins.coverShadow};
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  ${media.tablet`
    display: none;
  `};
`;
const Name = styled.h3`
  font-weight: 700;
  font-size: ${fontSizes.xl};
  margin-top: 20px;
`;
const Description = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.lightGrey};
  a {
    color: ${colors.white};
    border-bottom: 1px solid transparent;
    &:hover,
    &:focus {
      border-bottom: 1px solid ${colors.white};
    }
  }
`;
const RecButton = styled(Link)`
  ${mixins.redButton};
  margin-bottom: ${spacing.lg};
`;
const Owner = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.lightGrey};
`;
const TotalTracks = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.white};
  margin-top: 20px;
`;

function Playlist(props) {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const { playlistId } = props;
    getPlaylist(playlistId).then(res => setPlaylist(res));
  }, [props]);

  return (
    <React.Fragment>
      {playlist ? (
        <Main>
          <PlaylistContainer>
            <Left>
              <PlaylistCover>
                <img src={playlist.coverImgUrl} alt="Album Art" />
              </PlaylistCover>

              <a href={`https://music.163.com/#/playlist?id=${playlist.id}`} target="_blank" rel="noopener noreferrer">
                <Name>{playlist.name}</Name>
              </a>

              <Owner>By {playlist.creator.nickname}</Owner>

              {playlist.description && (
                <Description
                  dangerouslySetInnerHTML={{ __html: playlist.description }}
                />
              )}

              <TotalTracks>{playlist.trackCount} Tracks</TotalTracks>

              <RecButton to={`/recommendations/${playlist.id}`}  state={{ playlist}}>
                Get Recommendations
              </RecButton>
            </Left>
            <Right>
              <ul>
                {playlist.tracks.map((track, i) => (
                  <TrackItem track={{ song: track, playCount: 0 }} key={i} />
                ))}
              </ul>
            </Right>
          </PlaylistContainer>
        </Main>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
}

export default Playlist;
