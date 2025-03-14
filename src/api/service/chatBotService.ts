import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface ChatBotServiceProps {
  instance: AxiosInstance;
  endpoints: {
    CHATBOT: (id?: string) => string;
    UPDATE_FEEDBACK: (id?: string) => string;
    CHATBYGPT: (id?: string) => string;
  };
}

interface IndexChatBotParams extends AxiosRequestConfig {
  params?: Record<string, any> | null;
  id?: string;
}

const chatBotService = ({ instance, endpoints }: ChatBotServiceProps) => ({
  indexChatBot: async ({
    params = null,
    id,
    data,
    ...props
  }: IndexChatBotParams = {}): Promise<AxiosResponse> => {
    return instance.request({
      method: "post",
      url: endpoints.CHATBOT(id),
      params,
      data,
      ...props,
    });
  },
  chatBotByGPT: async ({
    params = null,
    id,
    data,
    ...props
  }: IndexChatBotParams = {}): Promise<AxiosResponse> => {
    return instance.request({
      method: "post",
      url: endpoints.CHATBYGPT(id),
      params,
      data,
      ...props,
    });
  },
  updateFeedback: async ({
    params = null,
    id,
    data,
    ...props
  }: IndexChatBotParams = {}): Promise<AxiosResponse> => {
    return instance.request({
      method: "patch",
      url: endpoints.UPDATE_FEEDBACK(id),
      params,
      data,
      ...props,
    });
  },
});

export default chatBotService;
