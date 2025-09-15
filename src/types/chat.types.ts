export type Channel = {
  id: string;
  name: string;
  type: "direct" | "group";
  members: string[];
  relatedRfqId?: string;
  createdAt?: number;
  updatedAt?: number;
};

export type Message = {
  id: string;
  channelId: string;
  senderId: string;
  content: string;
  translatedContent?: { lang: string; text: string };
  attachments?: string[];
  createdAt: number;
};