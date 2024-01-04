import React, { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import { useTranslation } from "react-i18next";
import { Follow, User } from "../../service";
import { ButtonType } from "../../components/button/StyledButton";
import { useAppSelector } from "../../redux/hooks";
import { useHttpRequestService } from "../../service/HttpRequestService";
import Button from "../../components/button/Button";
import ProfileFeed from "../../components/feed/ProfileFeed";
import { StyledContainer } from "../../components/common/Container";
import { StyledH5, StyledP } from "../../components/common/text";
import { removeLoginCookie } from "../../service/Cookies";
import { createPortal } from "react-dom";
import CustomSwitchButton from "../../components/switch/CustomSwitchButton";

const ProfilePage = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [following, setFollowing] = useState<boolean>(false);
  const [follower, setFollower] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalValues, setModalValues] = useState({
    text: "",
    title: "",
    type: ButtonType.DEFAULT,
    buttonText: "",
  });
  
  const user = useAppSelector((state) => state.user.user);
  const [isPrivate, setIsPrivate] = useState({isPrivate: false})
  const id = useParams().id;
  const service = useHttpRequestService();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleButtonType = (): { component: ButtonType; text: string } => {
    if (profile?.id === user.id){
      return { component: ButtonType.DELETE, text: t("buttons.delete") };
    }
    if (following)
      return { component: ButtonType.OUTLINED, text: t("buttons.unfollow") };
    else return { component: ButtonType.FOLLOW, text: t("buttons.follow") };
  };

  const handleSubmit = () => {
    if (profile?.id === user.id) {
      service.deleteProfile().then(() => {
        removeLoginCookie();
        navigate("/sign-in");
      });
    } else {
      service.unfollowUser(profile!.id).then(async () => {
        setFollowing(false);
        setShowModal(false);
        await getProfileData();
      });
    }
  };

  useEffect(() => {
    getProfileData().then();
  }, [id]);

  if (!id) return null;

  const handleButtonAction = async () => {
    if (profile?.id === user.id) {
      setShowModal(true);
      setModalValues({
        title: t("modal-title.delete-account"),
        text: t("modal-content.delete-account"),
        type: ButtonType.DELETE,
        buttonText: t("buttons.delete"),
      })
    } else {
      if (following) {
        setShowModal(true);
        setModalValues({
          text: t("modal-content.unfollow"),
          title: `${t("modal-title.unfollow")} @${profile?.username}?`,
          type: ButtonType.FOLLOW,
          buttonText: t("buttons.unfollow"),
        });
      } else {
        await service.followUser(id);
        service.getProfile(id).then((res) => setProfile(res));
      }
      return await getProfileData();
    }
  };

  const getProfileData = async () => {
    service
      .getProfile(id)
      .then((res) => {
        setProfile(res);
        setIsPrivate({isPrivate: res.isPrivate})
        setFollowing(
          res
            ? res?.followers.some((follow: Follow) => follow.followerId === user.id)
            : false
        );
        setFollower(
          res? res?.follows.some((follow: Follow) => follow.followedId === user.id) : false
        )
      })
      .catch(() => {
        console.log("hubo un error")
        service
          .getProfileView(id)
          .then((res) => {
            setProfile(res);
            setFollowing(false);
            setFollower(false);
          })
          .catch((error2) => {
            console.log(error2);
          });
      });
  };

  const handlePrivacyChange = () => {
    service
      .setPrivacy(!(isPrivate.isPrivate))
      .then((res) => {
        setIsPrivate({ isPrivate: !(isPrivate.isPrivate) })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <StyledContainer
        maxHeight={"100vh"}
        borderRight={"1px solid #ebeef0"}
        flex={2}
        maxWidth={"600px"}
      >
        {profile && (
          <>
            <StyledContainer
              borderBottom={"1px solid #ebeef0"}
              maxHeight={"212px"}
              padding={"16px"}
            >
              <StyledContainer  width={"100%"} display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent="space-between">
                <StyledH5>{profile?.name}</StyledH5>
                {
                  profile?.id === user.id &&
                  <StyledContainer display={"flex"} width={"auto"} alignItems={"center"}>
                    <StyledP primary={true}>{t("switch.privacy")}</StyledP>
                     <CustomSwitchButton
                      checked={isPrivate.isPrivate}
                      onChange={handlePrivacyChange}
                      />
                  </StyledContainer>
                }
                </StyledContainer>
              <StyledContainer
                alignItems={"center"}
                padding={"0 0 0 0"}
                flexDirection={"row"}
              >
                <ProfileInfo
                  name={profile!.name!}
                  username={profile!.username}
                  profilePicture={profile!.profilePicture}
                />
                <StyledContainer
                  width={"30%"}
                  alignItems={"center"}
                  justifyContent={"center"}>
                  <Button
                    buttonType={handleButtonType().component}
                    size={"100px"}
                    onClick={handleButtonAction}
                    text={handleButtonType().text}
                    />
                  {
                    following && follower &&
                    <Button
                    buttonType={ButtonType.DEFAULT}
                    size={"100px"}
                    onClick={() => navigate(`/chat/${profile.id}`, {state: profile})}
                    text={t("buttons.chat")}
                    />
                  }
                  </StyledContainer>
                
              </StyledContainer>
            </StyledContainer>
            <StyledContainer width={"100%"}>
              {!profile.isPrivate || following || profile.id === user.id ? (
                <ProfileFeed />
              ) : (
                <StyledH5>{t("error.private-account")}</StyledH5>
              )}
            </StyledContainer>
            {
              showModal && createPortal(
                <Modal
                  show={showModal}
                  text={modalValues.text}
                  title={modalValues.title}
                  acceptButton={
                    <Button
                      buttonType={modalValues.type}
                      text={modalValues.buttonText}
                      size={"MEDIUM"}
                      onClick={handleSubmit}
                    />
                  }
                  onClose={() => {
                    setShowModal(false);
                  }}
                />,
                document.body)
            }
          </>
        )}
      </StyledContainer>
    </>
  );
};

export default ProfilePage;
