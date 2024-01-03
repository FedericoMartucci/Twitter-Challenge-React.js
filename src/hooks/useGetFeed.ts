import { useEffect, useState } from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Post } from "../service";

interface UseGetFeedProps {
  lastPostId: string;
}

export const useGetFeed = ({ lastPostId }: UseGetFeedProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const query = useAppSelector((state) => state.user.query);

  const dispatch = useAppDispatch();

  const service = useHttpRequestService();

  useEffect(() => {
    try {
      if(lastPostId !== undefined && hasMore) {
        setLoading(true);
        setError(false);
        service.getPaginatedPosts(11, lastPostId, query).then((res) => {
          const updatedPosts = Array.from(new Set([...posts, ...res]))
          res.length < 11? setHasMore(false) : updatedPosts.pop()
          setPosts(updatedPosts)
          dispatch(updateFeed(posts));
          dispatch(setLength(posts.length));
          setLoading(false);
        });
      }
      } catch (e) {
      setError(true);
      console.log(e);
      setLoading(false);
    }
  }, [lastPostId, hasMore, query]);

  return { posts, loading, error };
};
