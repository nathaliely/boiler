export type User = {
  id: string;
  email: string;
  name?: string;
  avatarColor?: string;
  avatarStorageId?: string;
  lastAuthMethod?: "email" | "google" | "github" | "discord";
};