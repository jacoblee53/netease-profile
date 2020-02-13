import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { IconInfo } from "../assets/icons";
import Loader from "../components/Loader";
import { getLikeArtists } from "../netease";
import styled from "styled-components/macro";
import { theme, mixins, media, Main } from "../styles";
const { colors, spacing } = theme;

const ArtistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  margin-top: 50px;
  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  `};
`;
const Artist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const Mask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 100%;
  font-size: 20px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
  svg {
    width: 25px;
  }
`;
const ArtistArtwork = styled(Link)`
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
  ${media.tablet`
    width: 150px;
    height: 150px;
  `};
  ${media.phablet`
    width: 120px;
    height: 120px;
  `};
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
  img {
    border-radius: 100%;
    object-fit: cover;
    width: 200px;
    height: 200px;
    ${media.tablet`
      width: 150px;
      height: 150px;
    `};
    ${media.phablet`
      width: 120px;
      height: 120px;
    `};
  }
`;
const ArtistName = styled.a`
  margin: ${spacing.base} 0;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;

function LikeArtists() {
  const [likeArtists, setLikeArtists] = useState(null);

  useEffect(() => {
    getLikeArtists().then(res => setLikeArtists(res));
  }, []);

  return (
    <Main>
      <h2>Like Artists</h2>
      <ArtistsContainer>
        {likeArtists ? (
          likeArtists.map((artist, i) => {
            const { id, picUrl, name } = artist;
            return(
              i < 100 && (
                <Artist key={i}>
                  <ArtistArtwork to={`/artist/${id}`} state={{ artist }}>
                    {picUrl && <img src={picUrl} alt="Artist" />}
                    <Mask>
                      <IconInfo />
                    </Mask>
                  </ArtistArtwork>
                  <ArtistName
                    href={`https://music.163.com/#/artist?id=${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {name}
                  </ArtistName>
                </Artist>
              )
            );
          })
        ) : (
          <Loader />
        )}
      </ArtistsContainer>
    </Main>
  );
}

export default LikeArtists;
