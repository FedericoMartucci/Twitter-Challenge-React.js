import React, { useState } from "react";
import Feed from "./Feed";
import { useGetComments } from "../../hooks/useGetComments";

interface CommentFeedProps {
  postId: string;
}
const CommentFeed = ({ postId }: CommentFeedProps) => {
  const { posts, loading } = useGetComments({
    postId,
  });
const [lastPostId, setLastPostId] = useState<string>('');
  return (
    <>
      <Feed posts={posts} loading={loading} setLastPostId={setLastPostId}/>
    </>
  );
};
export default CommentFeed;
