import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { Post } from "../../service";
import { StyledContainer } from "../common/Container";
import Tweet from "../tweet/Tweet";
import Loader from "../loader/Loader";
import { StyledH5 } from "../common/text";
import { useTranslation } from "react-i18next";

interface FeedProps {
  posts: Post[];
  loading: boolean;
  setLastPostId: Dispatch<SetStateAction<string>>;
}

const Feed = ({ posts, loading, setLastPostId }: FeedProps) => {
  const { t } = useTranslation();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPost = useCallback(
    (node: Element | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if(node !== undefined && node !== null){
            setLastPostId(node.id);
          }
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, setLastPostId]
  );

  return loading?  (<Loader />) : (
    <StyledContainer width={"100%"} alignItems={"center"}>
      {posts.length? (posts
        .filter((post, index, self) => {
          return self.findIndex((p) => p.id === post.id) === index;
        })
        .map((post: Post, index: number) => (
          posts.length === index + 1? (
            <StyledContainer id={post.id} ref={lastPost} key={"last-div"}>
              <Tweet key={post.id} post={post} />
            </StyledContainer>
          ) : (
            <Tweet key={post.id} post={post} />
          )
        ))) : (
          <StyledH5>{t("error.no-posts")}</StyledH5>
        )}
      {loading && <Loader />}
    </StyledContainer>
  );
};

export default Feed;
