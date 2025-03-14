import instance from "../axios/axiosCofig";
import chatBotService from "./chatBotService";

const createEndpoint = (basePath: string) => (id?: string) =>
  `${basePath}/${id ? id : ""}`.replace(/\/$/, "");

const endpoints = {
  CHATBOT: createEndpoint("/chatbot/asks"),
  UPDATE_FEEDBACK: (id?: string) => `/chatbot/${id}/feedback`,
  CHATBYGPT: createEndpoint("/chatbot/askbygpt"),
};

const services = {
  chatBotService: chatBotService({ instance, endpoints }),
};

export default services;
