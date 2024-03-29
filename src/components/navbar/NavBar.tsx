import React, { useState } from "react";
import NavItem from "./navItem/NavItem";
import Button from "../button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import TweetModal from "../tweet-modal/TweetModal";
import { IconType, LogoIcon } from "../icon/Icon";
import Avatar from "../common/avatar/Avatar";
import LogoutPrompt from "./logout-prompt/LogoutPrompt";
import ThreeDots from "../common/ThreeDots";
import { useTranslation } from "react-i18next";
import { ButtonType } from "../button/StyledButton";
import Icon from "../../assets/icon.jpg";
import { useAppSelector } from "../../redux/hooks";
import { StyledNavBarContainer } from "./NavBarContainer";
import { StyledContainer } from "../common/Container";
import { StyledIconContainer } from "./IconContainer";
import { StyledNavItemsContainer } from "./navItem/NavItemsContainer";
import { StyledP } from "../common/text";
import { createPortal } from "react-dom";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const [tweetModalOpen, setTweetModalOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { t } = useTranslation();
  const handleAvatarClick = () => {
    if (window.innerWidth < 1265) {
      handleLogout();
    } else {
      navigate(`/profile/${user.id}`);
    }
  };

  const handleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  return (
    <StyledNavBarContainer>
      <StyledContainer flex={1}>
        <StyledIconContainer>
          <LogoIcon />
        </StyledIconContainer>
        <StyledNavItemsContainer>
          <NavItem
            title={t("navbar.home")}
            onClick={() => {
              navigate("/");
            }}
            icon={IconType.HOME}
            selectedIcon={IconType.ACTIVE_HOME}
            active={location.pathname === "/"}
          />
          <NavItem
            title={t("navbar.profile")}
            onClick={() => {
              navigate(`/profile/${user.id}`);
            }}
            icon={IconType.PROFILE}
            selectedIcon={IconType.ACTIVE_PROFILE}
            active={location.pathname === `/profile/${user.id}`}
          />
        </StyledNavItemsContainer>
        <StyledContainer width={"100%"}>
          <Button
            text={"Tweet"}
            size={"180px"}
            buttonType={ButtonType.DEFAULT}
            onClick={() => {
              setTweetModalOpen(true);
            }}
          ></Button>
        </StyledContainer>
          {
            tweetModalOpen && createPortal(
              <TweetModal
                open={tweetModalOpen}
                onClose={() => {
                  setTweetModalOpen(false);
                }}
              />,
              document.body)
          } 
      </StyledContainer>
      <StyledContainer
        width={"auto"}
        position={"fixed"}
        top={"93%"}
        left={"9%"}
        flex={1}
        maxHeight={"48px"}
        flexDirection={"row"}
        gap={"32px"}
        alignItems={"center"}
      >
        {
          logoutOpen && createPortal(
            <LogoutPrompt show={true} />,
            document.body)
        }
        <Avatar
          src={user.profilePicture ?? Icon}
          onClick={handleAvatarClick}
          alt={user?.name ?? ""}
        />
        <StyledContainer
          width={"100%"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"16px"} >
            <StyledContainer padding={"4px 0"} gap={"4px"}>
              <StyledP primary>{user.name}</StyledP>
              <StyledP primary={false}>{`@${user.username}`}</StyledP>
            </StyledContainer>
            <ThreeDots onClick={handleLogout} />
        </StyledContainer>
      </StyledContainer>
    </StyledNavBarContainer>
  );
};

export default NavBar;
