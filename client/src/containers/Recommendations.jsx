import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { getRecommendationsForPlaylist } from "../netease";

import Loader from "../components/Loader";
import TrackItem from "./TrackItem";

import styled from "styled-components/macro";
import { theme, mixins, media, Main } from "../styles";
const { colors } = theme;

const PlaylistHeading = styled.div`
  ${mixins.flexBetween};
  ${media.tablet`
    flex-direction: column;

  `};
  h2 {
    margin-bottom: 0;
  }
`;
// const SaveButton = styled.button`
//   ${mixins.greenButton};
// `;
// const OpenButton = styled.a`
//   ${mixins.button};
// `;
const TracksContainer = styled.ul`
  margin-top: 50px;
`;
const PlaylistLink = styled(Link)`
  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
`;

function Recommendations(props) {
  const [playlist, setPlaylist] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const { playlist } = props.location.state;
    setPlaylist(playlist);
    getRecommendationsForPlaylist(playlist.id).then(res =>
      setRecommendations(res)
    );
  }, [props.location]);

  return (
    <Main>
      {playlist && (
        <PlaylistHeading>
          <h2>
            Recommended Tracks Based On{" "}
            <PlaylistLink to={`/playlists/${playlist.id}`} state={{ playlist }}>
              {playlist.name}
            </PlaylistLink>
          </h2>
        </PlaylistHeading>
      )}
      <TracksContainer>
        {recommendations ? (
          recommendations
            .slice(0, 50)
            .map((track, i) => (
              <TrackItem key={i} track={{ song: track, playCount: 0 }} />
            ))
        ) : (
          <Loader />
        )}
      </TracksContainer>
    </Main>
  );
}

export default Recommendations;
