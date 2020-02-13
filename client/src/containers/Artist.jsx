import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";

import styled from "styled-components/macro";
import { theme, mixins, media, Main } from "../styles";
const { colors, fontSizes, spacing } = theme;

const ArtistContainer = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  height: 100%;
  text-align: center;
`;
const Artwork = styled.div`
  ${mixins.coverShadow};
  border-radius: 100%;
  img {
    object-fit: cover;
    border-radius: 100%;
    width: 300px;
    height: 300px;
    ${media.tablet`
      width: 200px;
      height: 200px;
    `};
  }
`;
const ArtistName = styled.h1`
  font-size: 70px;
  margin-top: ${spacing.md};
  ${media.tablet`
    font-size: 7vw;
  `};
`;
const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin-top: ${spacing.md};
  text-align: center;
`;
const Stat = styled.div``;
const Number = styled.div`
  color: ${colors.blue};
  font-weight: 700;
  font-size: ${fontSizes.lg};
  text-transform: capitalize;
  ${media.tablet`
    font-size: ${fontSizes.md};
  `};
`;
const NumLabel = styled.p`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${spacing.xs};
`;
const FollowButton = styled.button`
  ${mixins.greenButton};
  margin-top: 50px;
  padding: 12px 50px;
  background-color: ${props =>
    props.isFollowing ? "transparent" : colors.green};
  border: 1px solid ${props => (props.isFollowing ? "white" : "transparent")};
  pointer-events: ${props => (props.isFollowing ? "none" : "auto")};
  cursor: ${props => (props.isFollowing ? "default" : "pointer")};
  &:hover,
  &:focus {
    background-color: ${props =>
      props.isFollowing ? "transparent" : colors.offGreen};
  }
`;

function Artist(props) {
  const [artist, setArtist] = useState(null);
  const [isFollowing] = useState(true);

  useEffect(() => {
    const { artist } = props.location.state;
    artist && setArtist(artist);
    console.log(artist);
  }, [props.location.state]);

  return (
    <React.Fragment>
      {artist ? (
        <ArtistContainer>
          <Artwork>
            <img src={artist.picUrl} alt="Artist Artwork" />
          </Artwork>
          <div>
            <ArtistName>{artist.name}</ArtistName>
            <Stats>
              <Stat>
                <Number>{artist.albumSize}</Number>
                <NumLabel>Ablums</NumLabel>
              </Stat>

              <Stat>
                <Number>{artist.mvSize}</Number>
                <NumLabel>MVs</NumLabel>
              </Stat>
            </Stats>
          </div>
          <FollowButton
            isFollowing={isFollowing}
          >
            {isFollowing ? "Liked" : "Like"}
          </FollowButton>
        </ArtistContainer>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
}

export default Artist;
