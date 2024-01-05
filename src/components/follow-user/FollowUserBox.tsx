import React, { useState } from "react";
import Button from "../button/Button";
import { useHttpRequestService } from "../../service/HttpRequestService";
import UserDataBox from "../user-data-box/UserDataBox";
import { useTranslation } from "react-i18next";
import { ButtonType } from "../button/StyledButton";
import { useAppSelector } from "../../redux/hooks";
import { StyledFollowUserBox } from "./StyledFollowUserBox";
import { Follow } from "../../service";

interface FollowUserBoxProps {
  profilePicture?: string;
  name?: string;
  username?: string;
  id: string;
  followers?: Follow[]
}

const FollowUserBox = ({
  profilePicture,
  name,
  username,
  id,
  followers
}: FollowUserBoxProps) => {
  const user = useAppSelector((state) => state.user.user);
  const service = useHttpRequestService();
  const { t } = useTranslation();
  const [isFollowing, setIsFollowing] = useState(
    followers?.some((f) => f.followerId === user.id)
  );
  const handleFollow = async () => {
    if (isFollowing) {
      await service.unfollowUser(id);
    } else {
      await service.followUser(id);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <StyledFollowUserBox>
      <UserDataBox
        id={id}
        name={name!}
        profilePicture={profilePicture!}
        username={username!}
      />
      <Button
        isFollowing={isFollowing}
        text={isFollowing ? t("buttons.unfollow") : t("buttons.follow")}
        buttonType={isFollowing ? ButtonType.DELETE : ButtonType.FOLLOW}
        size={"LARGE"}
        onClick={handleFollow}
      />
    </StyledFollowUserBox>
  );
};

export default FollowUserBox;
