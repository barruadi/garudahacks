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

type SpeechButtonProps = {
  text: string;
};

const SpeechButton: React.FC<SpeechButtonProps> = ({ 
  text
 }) => {
  const [showChat, setShowChat] = useState<boolean>(false);
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

  const productContext = text;

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

  const { isButtonDisabled, icon } = getUIState();

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
    <>
    {/* Collapsible Chat Overlay */}
    {showChat && (
      <div className="fixed bottom-36 right-4 w-[320px] max-h-[50vh] z-50 pointer-events-none">
        <div className="flex flex-col gap-2 px-4 py-3 rounded-xl bg-gradient-to-t from-white/80 to-white/10 backdrop-blur-md border border-black/10 shadow-md overflow-y-auto h-full transition-all duration-300">
          {chatHistory.length === 0 ? (
            <p className="text-sm text-gray-500">No messages yet</p>
          ) : (
            chatHistory.map((message) => (
              <div
                key={message.id}
                className={`text-sm text-black ${
                  message.type === "user" ? "text-right" : "text-left"
                }`}
              >
                <p className="font-semibold text-xs opacity-70 mb-0.5">
                  {message.type === "user" ? "You" : "Gemini"}
                </p>
                <p className="bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg inline-block max-w-[90%]">
                  {message.text}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    )}

    {/* Toggle Button (above mic) */}
    <div className="fixed bottom-24 right-4 z-50">
      <button
        onClick={() => setShowChat((prev) => !prev)}
        className="text-xs font-medium bg-white text-black border border-gray-300 rounded-full px-3 py-1 shadow hover:shadow-md transition"
      >
        {showChat ? "Hide Chat" : "Show Chat"}
      </button>
    </div>

    {/* Mic Button */}
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleButtonClick}
        disabled={isButtonDisabled}
        className={`
          flex items-center justify-center w-16 h-16
          rounded-full text-black shadow-xl
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-4 focus:ring-white
          ${
            isButtonDisabled
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 transform hover:scale-110"
          }
        `}
      >
        {icon}
      </button>
    </div>
  </>
  );
};

export default SpeechButton;
