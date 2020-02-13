import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import Loader from "../components/Loader";
import { Main } from "../styles";
import TrackItem from "./TrackItem";
import { getRecentlyPlayed } from "../netease";

const TracksContainer = styled.ul`
  margin-top: 50px;
`;

function TopTracks() {
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    getRecentlyPlayed(0).then(res => setTopTracks(res));
  }, []);

  return (
    <Main>
      <h2>Top Tracks</h2>
      <TracksContainer>
        {topTracks ? (
          topTracks.map((track, idx) => (
            <TrackItem key={idx} track={track} type={'top'}/>
          ))
        ) : (
          <Loader />
        )}
      </TracksContainer>
    </Main>
  );
}

export default TopTracks;
