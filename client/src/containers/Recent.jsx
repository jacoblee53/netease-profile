import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import Loader from "../components/Loader";
import { Main } from "../styles";
import TrackItem from "./TrackItem";
import { getRecentlyPlayed } from "../netease";

const TracksContainer = styled.ul`
  margin-top: 50px;
`;

function Recent() {
  const [recentlyPlayed, setRecentPlayed] = useState(null);
  
  useEffect(() => {
    getRecentlyPlayed(1).then(res => setRecentPlayed(res));
  }, []);

  return (
    <Main>
      <h2>Recently Played Tracks</h2>
      <TracksContainer>
        {recentlyPlayed ? (
          recentlyPlayed.map((track, idx) => (
            <TrackItem key={idx} track={track} />
          ))
        ) : (
          <Loader />
        )}
      </TracksContainer>
    </Main>
  );
}

export default Recent;
