export type FeatureRequestStatus = "open" | "planned" | "in-progress" | "completed" | "declined";

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  role: "admin" | "user";
}

export interface FeatureRequest {
  id: string;
  title: string;
  description: string;
  upvotes: number;
  status: FeatureRequestStatus;
  authorId: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  featureRequestId: string;
  authorId: string;
  content: string;
  createdAt: string;
}
