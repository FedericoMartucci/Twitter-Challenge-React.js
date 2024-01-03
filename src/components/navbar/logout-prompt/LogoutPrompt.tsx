import { useEffect, useState } from "react";
import Modal from "../../modal/Modal";
import logo from "../../../assets/logo.png";
import Button from "../../button/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SwitchButton from "../../switch/SwitchButton";
import { ButtonType } from "../../button/StyledButton";
import { useAppSelector } from "../../../redux/hooks";
import { StyledPromptContainer } from "./PromptContainer";
import { StyledContainer } from "../../common/Container";
import { StyledP } from "../../common/text";
import { removeLoginCookie } from "../../../service/Cookies";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { createPortal } from "react-dom";

interface LogoutPromptProps {
  show: boolean;
}

const LogoutPrompt = ({ show }: LogoutPromptProps) => {
  const [showPrompt, setShowPrompt] = useState<boolean>(show);
  const [showModal, setShowModal] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const handleClick = () => {
    setShowModal(true);
  };

  const handleLanguageChange = () => {
    if (i18n.language === "es") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("es");
    }
  };

  const handleLogout = () => {
    removeLoginCookie();
    navigate("/sign-in");
  };

  useEffect(() => {
    setShowPrompt(show);
  }, [show]);
  const ref = useOutsideClick(() => {
    setShowPrompt(false);
  });
  return (
    <>
      {showPrompt && (
        <StyledPromptContainer>
          <div ref={ref}>
              <StyledContainer
                flexDirection={"row"}
                gap={"16px"}
                borderBottom={"1px solid #ebeef0"}
                padding={"16px"}
                alignItems={"center"}
                justifyContent={"center"}
                >
                <StyledP primary>Es:</StyledP>
                <SwitchButton
                  checked={i18n.language === "es"}
                  onChange={handleLanguageChange}
                  />
              </StyledContainer>
              <StyledContainer onClick={handleClick} alignItems={"center"}>
                <StyledP primary>{`${t("buttons.logout")} @${
                  user.username
                }`}</StyledP>
              </StyledContainer>
            </div>
        </StyledPromptContainer>
      )}
      {
        showModal && createPortal(
          <Modal
            show={showModal}
            text={t("modal-content.logout")}
            img={logo}
            title={t("modal-title.logout")}
            acceptButton={
              <Button
                buttonType={ButtonType.FOLLOW}
                text={t("buttons.logout")}
                size={"LARGE"}
                onClick={handleLogout}
              />
            }
            onClose={() => setShowModal(false)}
          />,
          document.body)
      }
    </>
  );
};

export default LogoutPrompt;
