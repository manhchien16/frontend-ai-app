"use client";

import services from "@/api/service/app";
import ChatAi from "@/share/components/chat";
import { BOT_RES } from "@/share/constants/app";
import { useCallback, useEffect, useState } from "react";

const Home: React.FC = () => {
  const [isFetchingData, setIsFetchingData] = useState(false);
  interface BotResponse {
    bot_response: string;
  }

  const [dataBot, setDataBot] = useState<BotResponse | any>({
    bot_response: BOT_RES.HELLO,
  });

  const fetchData = useCallback(async (data: string) => {
    if (!data.trim()) return;

    setIsFetchingData(true);
    try {
      const res = await services.chatBotService.indexChatBot({
        data: { userQuery: data },
      });

      setDataBot(res.data);
    } catch (error) {
      setDataBot({ bot_response: BOT_RES.SORRY });
    } finally {
      setIsFetchingData(false);
    }
  }, []);
  const fetchDataByGPT = useCallback(async (data: string) => {
    if (!data.trim()) return;

    setIsFetchingData(true);
    try {
      const res = await services.chatBotService.chatBotByGPT({
        data: { userQuery: data },
      });

      setDataBot(res.data);
    } catch (error) {
    } finally {
      setIsFetchingData(false);
    }
  }, []);
  const updateCommentForChat = useCallback(async (data: string, id: string) => {
    if (!data.trim()) return;

    setIsFetchingData(true);
    try {
      await services.chatBotService.updateFeedback({
        id: id,
        data: { feedback: data },
      });

      setDataBot({ bot_response: BOT_RES.THANKS });
    } catch (error) {
    } finally {
      setIsFetchingData(false);
    }
  }, []);

  return (
    <ChatAi
      setDataFeedback={updateCommentForChat}
      setDataUser={fetchData}
      setChatGPT={fetchDataByGPT}
      dataBot={dataBot}
      isFetchingData={isFetchingData}
    />
  );
};

export default Home;
