import React, { useState, useEffect } from "react";
import { getTrackInfo, getComments } from "../netease";
import { getYear } from "../utils";
import Loader from "../components/Loader";

import styled from "styled-components/macro";
import { theme, mixins, media, Main } from "../styles";
const { colors, fontSizes, spacing } = theme;

const TrackContainer = styled.div`
  display: flex;
  margin-bottom: 70px;
  ${media.phablet`
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  `};
`;
const Artwork = styled.div`
  ${mixins.coverShadow};
  max-width: 250px;
  margin-right: 40px;
  ${media.tablet`
    max-width: 200px;
  `};
  ${media.phablet`
    margin: 0 auto;
  `};
`;
const Info = styled.div`
  flex-grow: 1;
  ${media.phablet`
    text-align: center;
    margin-top: 30px;
  `};
`;
const PlayTrackButton = styled.a`
  ${mixins.redButton};
`;
const Title = styled.h1`
  font-size: 42px;
  margin: 0 0 5px;
  ${media.tablet`
    font-size: 30px;
  `};
`;
const ArtistName = styled.h2`
  color: ${colors.lightestGrey};
  font-weight: 700;
  text-align: left !important;
  ${media.tablet`
    font-size: 20px;
  `};
  ${media.phablet`
    text-align: center !important;
  `};
`;
const Album = styled.h3`
  color: ${colors.lightGrey};
  font-weight: 400;
  font-size: 16px;
`;
const CommentWrapper = styled.div`

`;
const CommentItem = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.lightGrey};
  margin-bottom: ${spacing.base}
`;

function Track(props) {
  const [track, setTrack] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    getTrackInfo(props.trackId).then(res => {
      if (res && res.length > 0) setTrack(res[0]);
    });
    getComments(props.trackId).then(res => setComments(res));
  }, [props.trackId])

  return (
    <React.Fragment>
      {track && comments ? (
        <Main>
          <TrackContainer>
            <Artwork>
              <img src={track.al.picUrl} alt="Album Artwork" />
            </Artwork>
            <Info>
              <Title>{track.name}</Title>
              <ArtistName>
                {track.ar &&
                  track.ar.map(({ name }, i) => (
                    <span key={i}>
                      {name}
                      {track.ar.length > 0 &&
                      i === track.ar.length - 1
                        ? ""
                        : ","}
                      &nbsp;
                    </span>
                  ))}
              </ArtistName>
              <Album>
                <a
                  href={`https://music.163.com/#/album?id=${track.al.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {track.al.name}
                </a>{" "}
                &middot; {getYear(track.publishTime)}
              </Album>
              <PlayTrackButton
                href={`https://music.163.com/#/song?id=${track.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Play on Netease
              </PlayTrackButton>
            </Info>
          </TrackContainer>
          <CommentWrapper>
            {comments.slice(0, 100).map((comment, idx) => (
              <CommentItem key={idx}>
                {comment.content}
              </CommentItem>
            ))}
          </CommentWrapper>
        </Main>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
}

export default Track;
