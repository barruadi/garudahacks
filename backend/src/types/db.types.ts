export type User = {
  id: number
  username: string
  password: string
}

export type UserWithoutPassword = Omit<User, 'password'>

export type CreateNewUserRequest = {
  username: string
  password: string
}

export type Community = {
  id: number;
  photo: string | null;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  createdBy: number | null;
  provinceId?: number | null;
  "3DUrl"?: string | null;
}

export type LocalProduct = {
  id: number;
  userId: number;
  title: string;
  description: string;
  photoUrl: string;
  shopLink?: string | null;
  gmapsLink?: string | null;
  createdAt: string;
  latitude: number;
  longitude: number;
  likeCount: number;
  "3DUrl"?: string | null;
}

export type CommunityMessage = {
  id: number;
  communityId: number;
  userId: number;
  content: string | null;
  createdAt: string | null;
  replyTo: number | null;
  likeCount?: number;
}