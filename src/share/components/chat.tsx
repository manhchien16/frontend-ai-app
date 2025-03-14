import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { LikeOutlined, DislikeOutlined, UserOutlined } from "@ant-design/icons";
import { Modal, Input, Button } from "antd";
import type { MessageProps as ChatUIMessageProps } from "@chatui/core";

const ChatUI = dynamic(() => import("@chatui/core"), { ssr: false });
const Bubble = dynamic(() => import("@chatui/core").then((mod) => mod.Bubble), {
  ssr: false,
});

interface MessageProps extends ChatUIMessageProps {
  msgId?: string;
}

interface ChatAiProps {
  setDataFeedback: (userFeedback: string, id: string) => void;
  setDataUser: (userChat: string) => void;
  dataBot: any;
  isFetchingData: boolean;
}

export default function ChatAi({
  setDataFeedback,
  setDataUser,
  dataBot,
  isFetchingData,
}: ChatAiProps) {
  const [chatUI, setChatUI] = useState<any>(null);

  useEffect(() => {
    import("@chatui/core").then((mod) => {
      setChatUI(mod);
    });
  }, []);

  if (!chatUI) return null;

  return (
    <ChatBot
      chatUI={chatUI}
      setDataFeedback={setDataFeedback}
      setDataUser={setDataUser}
      dataBot={dataBot}
      isFetchingData={isFetchingData}
    />
  );
}

function ChatBot({
  chatUI,
  setDataFeedback,
  setDataUser,
  dataBot,
  isFetchingData,
}: {
  chatUI: any;
  setDataFeedback: (userFeedback: string, id: string) => void;
  setDataUser: (userChat: string) => void;
  dataBot: any;
  isFetchingData: boolean;
}) {
  const { useMessages } = chatUI;
  const { messages, appendMsg, setTyping } = useMessages();
  const [feedback, setFeedback] = useState<{
    [key: string]: "like" | "dislike" | null;
  }>({});
  const [commentModal, setCommentModal] = useState<{
    visible: boolean;
    msgId: string | null;
  }>({ visible: false, msgId: null });
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    if (dataBot && !isFetchingData) {
      const botMsgId = dataBot._id;

      appendMsg({
        type: "text",
        content: { text: dataBot.bot_response },
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30M8p6x0eWujPG_7qzIKHSCnH0raS7lPXOQ&s",
        msgId: botMsgId,
        position: "left",
      });

      setTyping(false);
    }
  }, [dataBot, isFetchingData]);

  function handleSend(type: string, val: string) {
    if (type === "text" && val.trim()) {
      setDataUser(val);
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });

      setTyping(true);
    }
  }

  function handleFeedback(msgId: string, type: "like" | "dislike") {
    if (type === "like") {
      setFeedback((prev) => ({
        ...prev,
        [msgId]: prev[msgId] === "like" ? null : "like",
      }));
    } else {
      setCommentModal({ visible: true, msgId });
    }
  }

  function handleSubmitComment() {
    if (commentModal.msgId) {
      setDataFeedback(comment, commentModal.msgId);
      setFeedback((prev) => ({
        ...prev,
        [commentModal.msgId!]: "dislike",
      }));
    }
    setCommentModal({ visible: false, msgId: null });
    setComment("");
  }

  function renderMessageContent(msg: MessageProps) {
    const isBotMessage = msg.position !== "right";

    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {isBotMessage && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30M8p6x0eWujPG_7qzIKHSCnH0raS7lPXOQ&s"
              alt="Bot"
              style={{
                minWidth: "30px",
                minHeight: "30px",
                maxWidth: "30px",
                maxHeight: "30px",
                borderRadius: "50%",
              }}
            />
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isBotMessage ? "flex-start" : "flex-end",
          }}
        >
          <Bubble content={msg.content?.text || ""} />
          {isBotMessage && msg.msgId && (
            <div style={{ marginTop: 5, display: "flex", gap: 10 }}>
              <LikeOutlined
                onClick={() => handleFeedback(msg.msgId!, "like")}
                style={{
                  cursor: "pointer",
                  color: feedback[msg.msgId] === "like" ? "blue" : "gray",
                }}
              />
              <DislikeOutlined
                onClick={() => handleFeedback(msg.msgId!, "dislike")}
                style={{
                  cursor:
                    feedback[msg.msgId] === "dislike"
                      ? "not-allowed"
                      : "pointer",
                  color: feedback[msg.msgId] === "dislike" ? "red" : "gray",
                }}
                disabled={feedback[msg.msgId] === "dislike"}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <ChatUI
        locale="en-US"
        placeholder="Nhập tin nhắn..."
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
      />
      <Modal
        title="Nhập phản hồi"
        open={commentModal.visible}
        onCancel={() => setCommentModal({ visible: false, msgId: null })}
        footer={[
          <Button
            key="cancel"
            onClick={() => setCommentModal({ visible: false, msgId: null })}
          >
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmitComment}>
            Gửi
          </Button>,
        ]}
      >
        <Input.TextArea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Nhập phản hồi của bạn..."
        />
      </Modal>
    </div>
  );
}
