import { useState, useEffect, useCallback } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Mic, MicOff } from "lucide-react";

const model = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY!);

type ConversationState = "idle" | "listening" | "processing" | "speaking";

interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  text: string;
  timestamp: Date;
}

const SpeechButton = () => {
  const [conversationState, setConversationState] =
    useState<ConversationState>("idle");
  const [responseText, setResponseText] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const productContext = `
    You are a friendly and informative virtual assistant.
    You are skilled at answering a variety of questions about Rendang.
    Provide concise, clear answers, and answer it in English with a native accent.
`;

  useEffect(() => {
    if (!listening && transcript) {
      processUserQuery(transcript);
    }
  }, [listening, transcript]);

  const addMessageToHistory = (type: "user" | "assistant", text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      text,
      timestamp: new Date(),
    };
    setChatHistory((prev) => [...prev, newMessage]);
  };

  const processUserQuery = useCallback(
    async (userQuery: string) => {
      addMessageToHistory("user", userQuery);

      setConversationState("processing");
      setResponseText("Gemini is processing...");

      try {
        const geminiModel = model.getGenerativeModel({
          model: "gemini-2.5-flash",
        });

        const result = await geminiModel.generateContent(
          productContext + userQuery
        );
        const geminiResponse = await result.response;
        const textResponse = await geminiResponse.text();

        const finalResponse = textResponse || "Tidak ada respons dari Gemini.";
        setResponseText(finalResponse);

        addMessageToHistory("assistant", finalResponse);

        setConversationState("speaking");

        const utterance = new SpeechSynthesisUtterance(finalResponse);
        utterance.lang = "id-ID";
        utterance.rate = 0.9;

        utterance.onend = () => {
          setConversationState("idle");
          setResponseText("");
          resetTranscript();
        };

        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error("Gagal memproses permintaan:", error);
        const errorMessage = "Maaf, terjadi kesalahan. Silakan coba lagi.";
        setResponseText(errorMessage);
        addMessageToHistory("assistant", errorMessage);
        setConversationState("idle");
      }
    },
    [resetTranscript]
  );

  const handleButtonClick = () => {
    if (conversationState === "idle") {
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: false,
        language: "id-ID",
      });
      setConversationState("listening");
    } else if (conversationState === "listening") {
      SpeechRecognition.stopListening();
    }
  };

  const getUIState = () => {
    switch (conversationState) {
      case "listening":
        return {
          buttonText: "Stop",
          statusText: `You: ${transcript || "..."}`,
          isButtonDisabled: false,
          icon: <MicOff className="w-6 h-6" />,
        };

      case "processing":
        return {
          buttonText: "Processing...",
          statusText: responseText,
          isButtonDisabled: true,
          icon: <Mic className="w-6 h-6 animate-pulse" />,
        };
      case "speaking":
        return {
          buttonText: "Speaking...",
          statusText: `Gemini: ${responseText}`,
          isButtonDisabled: true,
          icon: <Mic className="w-6 h-6 animate-pulse" />,
        };
      case "idle":
      default:
        return {
          buttonText: "Start Speaking",
          statusText: "Press the button to ask.",
          isButtonDisabled: false,
          icon: <Mic className="w-6 h-6" />,
        };
    }
  };

  const { buttonText, statusText, isButtonDisabled, icon } = getUIState();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white text-center p-5">
        <h1 className="text-3xl font-bold mb-4">
          Speech Feature Not Supported
        </h1>
        <p className="text-lg">
          Sorry, your browser does not support the Web Speech API. Please use
          Google Chrome.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-transparent text-white flex flex-col justify-center items-center p-4 z-50 fixed top-0 left-0">
      <div className="w-full text-center">
        <div className="mb-6 h-48 overflow-y-auto bg-transparent backdrop-blur-xs rounded-lg p-3 border border-black">
          {chatHistory.length === 0 ? (
            <div className="text-gray-500 text-sm">...</div>
          ) : (
            <div className="space-y-2">
              {chatHistory.map((message) => (
                <div
                  key={message.id}
                  className={`text-sm text-black p-2 rounded-lg ${
                    message.type === "user"
                      ? "bg-transparent text-left"
                      : "bg-transparent text-left"
                  }`}
                >
                  <div className="font-medium text-xs mb-1 opacity-70">
                    {message.type === "user" ? "You" : "Gemini"}
                  </div>
                  <div>{message.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleButtonClick}
          disabled={isButtonDisabled}
          className={`
            flex items-center justify-center w-20 h-20 mx-auto
            text-black rounded-full
            transition-all duration-300 ease-in-out
            shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white
            ${
              isButtonDisabled
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-1 hover:scale-110"
            }
          `}
        >
          {icon}
        </button>
      </div>
    </div>
  );
};

export default SpeechButton;
