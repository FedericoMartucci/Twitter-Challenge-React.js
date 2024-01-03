import { useState } from "react";
import { StyledTweetContainer } from "./TweetContainer";
import AuthorData from "./user-post-data/AuthorData";
import { Post, ReactionType } from "../../service";
import { StyledReactionsContainer } from "./ReactionsContainer";
import Reaction from "./reaction/Reaction";
import { useHttpRequestService } from "../../service/HttpRequestService";
import { IconType } from "../icon/Icon";
import { StyledContainer } from "../common/Container";
import ThreeDots from "../common/ThreeDots";
import DeletePostModal from "./delete-post-modal/DeletePostModal";
import ImageContainer from "./tweet-image/ImageContainer";
import CommentModal from "../comment/comment-modal/CommentModal";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { createPortal } from "react-dom";

interface TweetProps {
  post: Post;
}
const Tweet = ({ post }: TweetProps) => {
  const [actualPost, setActualPost] = useState<Post>(post);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user.user);
  const service = useHttpRequestService();
  const navigate = useNavigate();

  const getCountByType = (type: ReactionType): number => {
    return actualPost.reactions?.filter((r) => r.reactionType === type)?.length ?? 0;
  };
  const handleReaction = async (type: ReactionType) => {
    const reacted = actualPost.reactions.find(
      (r) => r.reactionType === type && r.userId === user.id
    );
    if (reacted) {
      await service.deleteReaction(reacted.id);
    } else {
      await service.createReaction(actualPost.id, type);
    }
    const newPost = await service.getPostById(actualPost.id);
    setActualPost(newPost);
  };

  const hasReactedByType = (type: ReactionType): boolean => {
    return actualPost.reactions?.some(
      (r) => r.reactionType === type && r.userId === user.id
    );
  };

  const navigateToPost = () => {
    try {
      window.location.assign(`/post/${post.id}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <StyledTweetContainer>
      <StyledContainer
        style={{ width: "100%" }}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        maxHeight={"48px"}
        zIndex={1}
      >
        <AuthorData
          id={post.author.id}
          name={post.author.name ?? "Name"}
          username={post.author.username ?? "Username"}
          createdAt={post.createdAt}
          profilePicture={post.author.profilePicture}
          onClick={() => navigate(`/profile/${post.author.id}`)}
        />
        {post.authorId === user.id && (
          <>
            <DeletePostModal
              show={showDeleteModal}
              id={post.id}
              onClose={() => {
                setShowDeleteModal(false);
              }}
            />
            <ThreeDots
              onClick={() => {
                setShowDeleteModal(!showDeleteModal);
              }}
            />
          </>
        )}
      </StyledContainer>
      <StyledContainer zIndex={2} onClick={() => navigateToPost()}>
        <p>{post.content}</p>
      </StyledContainer>
      {post.images && post.images?.length > 0 && (
        <StyledContainer padding={"0 0 0 10%"} zIndex={2} onClick={() => navigateToPost()}>
          <ImageContainer images={post.images} />
        </StyledContainer>
      )}
      <StyledReactionsContainer>
        <Reaction
          img={IconType.CHAT}
          count={actualPost.qtyComments}
          reactionFunction={() =>
            setShowCommentModal(true)
          }
          increment={0}
          reacted={false}
        />
        <Reaction
          img={IconType.RETWEET}
          count={getCountByType(ReactionType.RETWEET)}
          reactionFunction={() => handleReaction(ReactionType.RETWEET)}
          increment={1}
          reacted={hasReactedByType(ReactionType.RETWEET)}
        />
        <Reaction
          img={IconType.LIKE}
          count={getCountByType(ReactionType.LIKE)}
          reactionFunction={() => handleReaction(ReactionType.LIKE)}
          increment={1}
          reacted={hasReactedByType(ReactionType.LIKE)}
        />
      </StyledReactionsContainer>
      {
        showCommentModal && createPortal(
        <CommentModal
          show={showCommentModal}
          post={post}
          onClose={() => setShowCommentModal(false)}
        />,
        document.body)
      }
    </StyledTweetContainer>
  );
};

export default Tweet;
