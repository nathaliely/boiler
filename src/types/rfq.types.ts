export type RFQ = {
  id: string;
  title: string;
  description: string;
  files?: string[];
  status?: "draft" | "submitted" | "matched" | "in_discussion" | "closed";
  metadata?: Record<string, any>;
  extracted?: Record<string, any>;
  matchedManufacturers?: string[];
  createdAt?: number;
  updatedAt?: number;
};