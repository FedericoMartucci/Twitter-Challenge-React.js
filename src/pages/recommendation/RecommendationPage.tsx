import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetRecommendations } from "../../hooks/useGetRecommendations";
import {
  StyledContainer,
  StyledScrollableContainer,
} from "../../components/common/Container";
import FollowUserBox from "../../components/follow-user/FollowUserBox";
import { StyledH5 } from "../../components/common/text";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/user";
import { useHttpRequestService } from "../../service/HttpRequestService";
import Loader from "../../components/loader/Loader";

const RecommendationPage = () => {
  const [page, setPage] = useState(0);
  const { users, loading } = useGetRecommendations({ page });
  const { t } = useTranslation();
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const service = useHttpRequestService();
  const [isLoading, setIsLoading] = useState(true);

  const handleSetUser = async () => {
    try {
      const user = await service.me();
      dispatch(setUser(user));
      setIsLoading(false)
    } catch (e) {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    handleSetUser().then();
  }, []);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastRecommendation = useCallback(
    (node: Element | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 10);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, setPage]
  );

  return isLoading? (<Loader/>) : (
    <StyledContainer maxWidth={"600px"} borderRight={"1px solid"}>
      <StyledContainer padding={"16px"} maxHeight={"53px"}>
        <StyledH5>{t("header.connect")}</StyledH5>
      </StyledContainer>
      <StyledScrollableContainer padding={"8px"} gap={"16px"}>
        {users.map((user, index) => {
          if (users.length === index + 1) {
            return (
              <StyledContainer ref={lastRecommendation} key={"last-div"}>
                <FollowUserBox
                  key={"recommendation-" + user.id}
                  name={user.name}
                  username={user.username}
                  profilePicture={user.profilePicture}
                  id={user.id}
                  followers={user.followers}
                />
              </StyledContainer>
            );
          } else {
            return (
              <FollowUserBox
                key={"recommendation-" + user.id}
                name={user.name}
                username={user.username}
                profilePicture={user.profilePicture}
                id={user.id}
                followers={user.followers}
              />
            );
          }
        })}
      </StyledScrollableContainer>
    </StyledContainer>
  );
};

export default RecommendationPage;
