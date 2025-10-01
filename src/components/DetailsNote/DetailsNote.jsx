import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { CDate, getCategoryFromPath } from "../../utils/categoryUtils";
import StyledTitle from "../ui/StyledTitle/StyledTitle";
import Spinner from "../ui/Spinner/Spinner";
import axios from "../../api/axios";
import API_CONFIG from "../../config/api";
import WrapperNotesDetails from "../ui/WrapperNotesDetails/WrapperNotesDetails";
import InnerWrapperNotesDetails from "../ui/InnerWrapperNotesDetails/InnerWrapperNotesDetails";
import DateNotesDetails from "../ui/DateNotesDetails/DateNotesDetails";
import StyledAvatar from "../ui/StyledAvatar/StyledAvatar";
import StyledCommentNotes from "../ui/StyledCommentNotes/StyledCommentNotes";
import StyledNotesButton from "../ui/StyledNotesButton/StyledNotesButton";
import ButtonToggel from "../ui/Chatbot/ButtonToggel/ButtonToggel";
import SpanComent from "../ui/Chatbot/SpanComent/SpanComent";
import SpanClose from "../ui/Chatbot/SpanClose/SpanClose";
import ChatbotPopup from "../ui/Chatbot/ChatbotPopup/ChatbotPopup";
import ChatHeader from "../ui/Chatbot/ChatHeader/ChatHeader";
import HeaderInfo from "../ui/Chatbot/HeaderInfo/HeaderInfo";
import ChatbotIcon from "../ui/Chatbot/ChatbotIcon/ChatbotIcon";
import LogoText from "../ui/Chatbot/LogoText/LogoText";
import ButtonHeader from "../ui/Chatbot/ButtonHeader/ButtonHeader";
import ChatBody from "../ui/Chatbot/ChatBody/ChatBody";
import MessageRow from "../ui/Chatbot/MessageRow/MessageRow";
import Message from "../ui/Chatbot/Message/Message";
import ChatMessage from "../ui/Chatbot/ChatMessage/ChatMessage";

const DetialsNote = () => {
  const chatBodyRef = useRef();

  const [note, setNote] = useState([]);
  const location = useLocation();
  const [playerData, setPlayerData] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  const note_id = params.id;
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: "App: Dairy , Created by Czapla Marcin",
    },
  ]);
  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController();

    const getNote = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.ENDPOINTS.NOTES_DETAILS}/${note_id}`,
          {
            signal: controller.signal,
          }
        );

        isMounted && setNote(response.data);
        setChatHistory((prevHistory) => [
          ...prevHistory,
          {
            hideInChat: true,
            role: "model",
            text:
              "Title: " +
              response.data.title +
              ". Content: " +
              response.data.content +
              ". Created: " +
              response.data.created,
          },
        ]);
        if (isMounted && !controller.signal.aborted) {
          setNote(response.data);
          let timeout = 300;
          setTimeout(() => {
            setPlayerData(!playerData);
          }, timeout);
        }
        controller.abort();
      } catch (err) {
        if (!controller.signal.aborted && isMounted) {
          console.error("Failed to fetch companies:", err);
        }
      }
    };

    getNote();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  if (!playerData) {
    return <Spinner />;
  }

  const generateBotResponse = async (history) => {
    // Helper function to update chat history
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text != "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

    // Format chat history for API request
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      // Make the API call to get the bot's response
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data?.error.message || "Something went wrong!");

      // Clean and update chat history with bot's response
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      // Update chat history with the error message
      updateHistory(error.message, true);
    }
  };
  console.log(chatHistory[1].text);

  return (
    <>
      <WrapperNotesDetails $category={getCategoryFromPath(location.pathname)}>
        <InnerWrapperNotesDetails
          $category={getCategoryFromPath(location.pathname)}
        >
          <StyledTitle
            $datails
            $category={getCategoryFromPath(location.pathname)}
          >
            {note?.title}
          </StyledTitle>
          <DateNotesDetails>{CDate(note)}</DateNotesDetails>
        </InnerWrapperNotesDetails>
        <InnerWrapperNotesDetails $flex>
          <InnerWrapperNotesDetails $row>
            {getCategoryFromPath(location.pathname) === "Films" && (
              <StyledAvatar src={note?.link} />
            )}
            {getCategoryFromPath(location.pathname) === "Books" && (
              <StyledAvatar src={note?.link} />
            )}
            {getCategoryFromPath(location.pathname) !== "Films" &&
            getCategoryFromPath(location.pathname) !== "Books" ? (
              <StyledCommentNotes
                $category={getCategoryFromPath(location.pathname)}
              >
                {note?.content}
              </StyledCommentNotes>
            ) : (
              <StyledCommentNotes
                $category={getCategoryFromPath(location.pathname)}
              >
                {note?.content}
              </StyledCommentNotes>
              // <StyledComment>{note.content}</StyledComment> <h1>
            )}
          </InnerWrapperNotesDetails>
          <StyledNotesButton $category={getCategoryFromPath(location.pathname)}>
            <NavLink
              style={{ textDecoration: "none" }}
              to={`/home/notes/${params.category_id}/${getCategoryFromPath(
                location.pathname
              )}`}
            >
              go back
            </NavLink>
          </StyledNotesButton>
        </InnerWrapperNotesDetails>
      </WrapperNotesDetails>
      <ButtonToggel
        $category={getCategoryFromPath(location.pathname)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen && (
          <SpanComent
            $category={getCategoryFromPath(location.pathname)}
            className="material-symbols-rounded"
          >
            mode_comment
          </SpanComent>
        )}

        {isOpen && (
          <SpanClose
            $category={getCategoryFromPath(location.pathname)}
            className="material-symbols-rounded"
          >
            close
          </SpanClose>
        )}
      </ButtonToggel>
      <ChatbotPopup
        $isOpen={isOpen}
        $category={getCategoryFromPath(location.pathname)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Chatbot Header */}
        <ChatHeader>
          <HeaderInfo>
            <ChatbotIcon $category={getCategoryFromPath(location.pathname)} />
            <LogoText $category={getCategoryFromPath(location.pathname)}>
              Chatbot
            </LogoText>
          </HeaderInfo>
          <ButtonHeader
            onClick={() => setIsOpen(!isOpen)}
            className="material-symbols-rounded"
          >
            keyboard_arrow_down
          </ButtonHeader>
        </ChatHeader>
        <ChatBody ref={chatBodyRef}>
          <MessageRow $role={"model"}>
            <ChatbotIcon $category={getCategoryFromPath(location.pathname)} />
            <Message $bot>
              Hey there 👋 <br /> How can I help you today?
            </Message>
            {/* Render the chat history dynamically */}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </MessageRow>
        </ChatBody>
      </ChatbotPopup>
    </>
  );
};

export default DetialsNote;
