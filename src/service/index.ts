export interface SingUpData {
  name: string;
  password: string;
  email: string;
  username: string;
}

export interface SingInData {
  username?: string;
  email?: string;
  password: string;
}

export interface PostData {
  content: string;
  parentId?: string;
  images?: File[];
}

export interface Post {
  id: string;
  content: string;
  parentId?: string;
  images?: string[];
  createdAt: Date;
  authorId: string;
  author: Author;
  reactions: Reaction[];
  comments: Post[];
  qtyComments: number;
  qtyLikes: number;
  qtyRetweets: number;
}

export interface Reaction {
  id: string;
  type: string;
  createdAt: Date;
  userId: string;
  postId: string;
  updatedAt: Date;
  deletedAt?: Date;
}
export interface Author {
  id: string;
  name?: string;
  username: string;
  profilePicture?: string;
  private: boolean;
  createdAt: Date;
}
export interface Follow {
  id: string;
  followedId: string;
  followerId: string,
  createdAt: Date | string;
}

export interface User {
  id: string;
  name?: string;
  username: string;
  profilePicture?: string;
  isPrivate: boolean;
  createdAt: Date | string;
  followers: Follow[];
  following: Follow[];
  posts: Post[];
  reactions?: Reaction[];
}

export interface MessageDTO {
  id: string;
  content: string;
  createdAt: Date;
  chatId: string;
  senderId: string;
  sender: Author;
}

export interface ChatDTO {
  id: string;
  users: Author[];
  messages: MessageDTO[];
}

export interface Reaction {
  id: string
  userId: string
  postId: string
  reactionType: ReactionType
  createdAt: Date
}

export enum ReactionType {
  LIKE = 'LIKE',
  RETWEET = 'RETWEET'
}