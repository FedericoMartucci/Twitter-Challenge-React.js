import { FormEvent, useEffect, useState } from 'react'
import { StyledContainer } from '../../components/common/Container';
import { io } from 'socket.io-client';
import { getToken } from '../../service/Cookies';
import { useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import CustomInput from '../../components/custom-input/CustomInput';
import { useHttpRequestService } from '../../service/HttpRequestService';
import {  User } from '../../service';
import { StyledH5, StyledP } from '../../components/common/text';
import Avatar from '../../components/common/avatar/Avatar';
import Icon from "../../assets/icon.jpg";
import { LightTheme } from '../../util/LightTheme';
import { t } from 'i18next';
import { ReactComponent as SendIcon } from "../../assets/send.svg";

interface Message {
    text: string;
    from: string;
    to: string;
    username: string;
}

const ChatPage = () => {
    let location = useLocation();
    const [profile, setProfile] = useState<User | null>(location.state);
    const user = useAppSelector((state) => state.user.user);
    const service = useHttpRequestService();

    const receiverId = useParams().id;
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const token: string = getToken();
    const socket = io(`http://localhost:8080`, {
        query: {
            token: token,
        }
    })

    useEffect(() => {
        socket.on('newMessage', (message) => {
            !messages.includes(message) && setMessages((messages) => [...messages, message]);
        });
        return () => {
            socket.off('newMessage');
        };
    }, []);

      if (!receiverId) return null;
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(socket){
            socket?.emit('sendMessage', {text: message, from: user.id, to: profile?.id, username: user.username})
            setMessage('');
        }
    }

    return (
        <StyledContainer 
        minHeight={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        borderRight={`1px solid ${LightTheme!.colors!.chat}`}
        >
            <StyledContainer height={"30%"} gap={"8px"} flex={2} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} borderBottom={`1px solid ${LightTheme!.colors!.chat}`}>
                <Avatar
                    src={profile!.profilePicture! === null ? Icon : profile!.profilePicture!}
                    width={"133px"}
                    height={"133px"}
                    alt={profile?.name ?? "Name"}
                />
                <StyledContainer margin={"0 0 24px 0"} justifyContent={"center"} alignItems={"center"}>
                    <StyledH5>{profile?.name ?? "Name"}</StyledH5>
                    <StyledP primary={false}>{`@${profile?.username}`}</StyledP>
                </StyledContainer>
            </StyledContainer>
            <StyledContainer
            height={"70%"}
            width={"100%"}
            gap={"8px"}
            >
                {
                    messages.map((message, i) => {
                        return (
                            <StyledContainer
                            height={"auto"}
                            width={"100%"}
                            alignItems={`${message.from === receiverId ? 'flex-start' : 'flex-end'}`}
                            key={i}
                            >
                                    <StyledContainer 
                                    backgroundColor={`${message.from === receiverId ? LightTheme!.colors!.white : LightTheme!.colors!.main}`}
                                    width={"auto"}
                                    border={`1px solid ${message.from === receiverId ? LightTheme!.colors!.gray : LightTheme!.colors!.white}`}
                                    borderRadius={`${message.from === receiverId ? '32px 32px 32px 0' : '32px 32px 0 32px'}`}
                                    margin={"8px"}
                                    color={`${message.from === receiverId ? LightTheme!.colors!.black : LightTheme!.colors!.white}`}
                                    height={"auto"}
                                    textAlign={"center"}
                                    padding={"8px 16px"}
                                    >
                                        <span>{message.text}</span>
                                    </StyledContainer>
                            </StyledContainer>)
                    })
                }
            </StyledContainer>
            <StyledContainer
            justifyContent={"center"}
            alignItems={"center"}
            height={"13%"}
            backgroundColor='white'
            borderTop={`1px solid ${LightTheme!.colors!.chat}`}
            >
                <form onSubmit={handleSubmit} style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <StyledContainer
                    flexDirection={"row"}
                    width={"100%"}
                    margin={"5px"}
                    backgroundColor={`${LightTheme!.colors!.chat}`}
                    borderRadius={"32px"}
                    justifyContent={"center"}
                    alignItems={"center"}>
                        <CustomInput
                        type="text"
                        required
                        value={message}
                        placeholder={t("input-params.message-box")}
                        onChange={(e) => setMessage(e.target.value)}
                        size={"SMALL"}
                        />
                        <SendIcon
                        onClick={(e) => handleSubmit(e)}
                        />
                    </StyledContainer>
                </form>
            </StyledContainer>
        </StyledContainer>
    )
}

export default ChatPage