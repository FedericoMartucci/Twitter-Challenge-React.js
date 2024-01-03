import React, { useState } from "react";
import Feed from "./Feed";
import { useGetFeed } from "../../hooks/useGetFeed";

const ContentFeed = () => {
  const [lastPostId, setLastPostId] = useState<string>('');
  const { posts, loading } = useGetFeed({ lastPostId });

  return <Feed posts={posts} loading={loading} setLastPostId={setLastPostId} />;
};
export default ContentFeed;
