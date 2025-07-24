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
}
