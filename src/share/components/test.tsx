import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { LikeOutlined, DislikeOutlined, UserOutlined } from "@ant-design/icons";
import { Modal, Input, Button } from "antd";
import type { MessageProps as ChatUIMessageProps } from "@chatui/core";
import { title } from "process";
import Image from "next/image";

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
  setChatGPT: (serChat: string) => void;
  dataBot: any;
  isFetchingData: boolean;
}

export default function ChatAi({
  setDataFeedback,
  setDataUser,
  setChatGPT,
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
      setChatGPT={setChatGPT}
      dataBot={dataBot}
      isFetchingData={isFetchingData}
    />
  );
}

function ChatBot({
  chatUI,
  setDataFeedback,
  setDataUser,
  setChatGPT,
  dataBot,
  isFetchingData,
}: {
  chatUI: any;
  setDataFeedback: (userFeedback: string, id: string) => void;
  setDataUser: (userChat: string) => void;
  setChatGPT: (userChat: string) => void;
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
  const [resend, setResend] = useState<string>("");

  useEffect(() => {
    if (dataBot && !isFetchingData) {
      const botMsgId = dataBot._id;
      if (!dataBot.bot_response) {
        const newList = dataBot.map(
          (item: { match: string; score: number }) => ({
            title: item.match + " (Similarity: " + item.score.toFixed(4) + ")",
          })
        );

        appendMsg({
          type: "text",
          content: {
            code: "recommend",
            data: {
              list: newList,
            },
          },
          avatar: "/images/avatabot.jpeg",
          msgId: botMsgId,
          position: "left",
        });
      } else {
        appendMsg({
          type: "text",
          content: { text: dataBot.bot_response },
          avatar: "/images/avatabot.jpeg",
          msgId: botMsgId,
          position: "left",
        });
      }

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResend(event.target.value);
  };

  const handleSendInput = () => {
    if (resend.trim() !== "") {
      setChatGPT(resend);
      appendMsg({
        type: "text",
        content: { text: resend },
        position: "right",
      });

      setTyping(true);
      setResend("");
    }
  };

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
            <Image
              src="/images/avatabot.jpeg"
              alt="Bot"
              width={30}
              height={30}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
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
          {msg.content?.code === "recommend" && msg.content?.data?.list ? (
            <div
              style={{ padding: 10, background: "#f5f5f5", borderRadius: 5 }}
            >
              {(msg.content.data.list as { title: string; url?: string }[]).map(
                (item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "5px",
                      borderRadius: "8px",
                      border: `1px solid #fa8c16`,
                      backgroundColor: "#fa8c16",
                      color: "#fff",
                      marginBottom: "8px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                    onClick={() => handleSend("text", item.title)}
                  >
                    <span style={{ marginRight: "8px", color: "#fff" }}>
                      {index + 1 + "."}
                    </span>
                    <span>{item.title}</span>
                  </div>
                )
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                <input
                  type="text"
                  placeholder="Viết Lại Câu Hỏi Chi Tiết Hơn..."
                  onChange={handleInputChange}
                  style={{
                    flex: 1,
                    padding: "10px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    border: "1px solid #ffac36",
                    outline: "none",
                    marginRight: "8px",
                  }}
                />
                <button
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "#ffac36",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                  onClick={handleSendInput}
                >
                  Gửi
                </button>
              </div>
            </div>
          ) : (
            <Bubble content={msg.content?.text || ""} />
          )}

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
