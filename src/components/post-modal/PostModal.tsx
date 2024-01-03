import React, { ReactNode } from "react";
import { StyledBlurredBackground } from "../common/BlurredBackground";
import { ModalCloseButton } from "../common/ModalCloseButton";
import { StyledTweetModalContainer } from "../tweet-modal/TweetModalContainer";
import { useOutsideClick } from "../../hooks/useOutsideClick";

interface PostModalProps {
  onClose: () => void;
  show: boolean;
  children: ReactNode;
}

export const PostModal = ({ onClose, show, children }: PostModalProps) => {
  const ref = useOutsideClick(() => {
    onClose();
  });
  return (
    <>
      {show && (
        <StyledBlurredBackground>
          <div ref={ref}>
          <StyledTweetModalContainer>
            <ModalCloseButton onClick={onClose} />
            {children}
          </StyledTweetModalContainer>
          </div>
        </StyledBlurredBackground>
      )}
    </>
  );
};
