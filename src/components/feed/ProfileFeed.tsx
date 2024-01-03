import React, { useState } from "react";
import Feed from "./Feed";
import { useGetProfilePosts } from "../../hooks/useGetProfilePosts";

const ProfileFeed = () => {
  const { posts, loading } = useGetProfilePosts();
  const [lastPostId, setLastPostId] = useState<string>('')
  return (
    <>
      <Feed posts={posts} loading={loading} setLastPostId={setLastPostId}/>
    </>
  );
};
export default ProfileFeed;
