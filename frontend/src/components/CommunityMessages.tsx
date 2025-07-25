import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { API_BASE_URL } from "@/config/api";

type Message = {
  user_id: number;
  content: string;
  sites_id: number;
  timestamp: string;
};

type ComProps = {
  id: number;
}

const CommunityMessages: React.FC<ComProps> = ({
  id
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMap, setUserMap] = useState<Record<number, string>>({});
  const [input, setInput] = useState("");

  // Fetch messages and usernames
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/messages/community/${id}`);
        const data = await res.json();
        const msgs: Message[] = data.data;
        setMessages(msgs);

        const uniqueUserIds = [...new Set(msgs.map((msg) => msg.user_id))];

        const results = await Promise.all(
          uniqueUserIds.map(async (uid) => {
            try {
              const res = await fetch(`${API_BASE_URL}/api/users/get-username`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: uid }),
              });
              const data = await res.json();
              if (data.success) {
                return { uid, username: data.data.username };
              } else {
                return { uid, username: `User ${uid}` };
              }
            } catch {
              return { uid, username: `User ${uid}` };
            }
          })
        );

        const newUserMap: Record<number, string> = {};
        results.forEach(({ uid, username }) => {
          newUserMap[uid] = username;
        });
        setUserMap(newUserMap);
      } catch (err) {
        console.error("Failed to fetch messages or usernames:", err);
      }
    };

    fetchMessages();
  }, [id]);

  // Post new message
  const handlePost = async () => {
    const content = input.trim();
    if (!content) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/messages/create/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          community_id: id,
          content,
          replyTo: null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const newMessage: Message = data.data;
        setMessages((prev) => [newMessage, ...prev]);

        setInput("");
      }
    } catch (err) {
      console.error("Failed to post message:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Community Messages</h2>

      <div className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          placeholder="Write a comment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handlePost}
          className="self-end bg-white text-black px-4 py-2 rounded border-2"
        >
          Post
        </button>
      </div>

      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((msg, idx) => (
            <div key={idx} className="p-3 border rounded">
              <div className="text-sm text-gray-500">
                {userMap[msg.user_id] || `User ${msg.user_id}`} • {msg.timestamp}
              </div>
              <div className="mt-1">{msg.content}</div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommunityMessages;
