import type { PostData, ReactionType, SingInData, SingUpData } from "./index";
import axios from "axios";
import { S3Service } from "./S3Service";
import { cookies, setLoginCookie } from "./Cookies";
import { setUpAxiosInterceptors } from "./AxiosInterceptor";

export const url =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api";

setUpAxiosInterceptors(axios);

const httpRequestService = {
  signUp: async (data: Partial<SingUpData>) => {
    const res = await axios.post(`${url}/auth/signup`, data);
    if (res.status === 201) {
      setLoginCookie(`Bearer ${res.data.token}`, true);
      return true;
    }
  },
  signIn: async (data: SingInData) => {
    const res = await axios.post(`${url}/auth/login`, data);
    if (res.status === 200) {
      setLoginCookie(`Bearer ${res.data.token}`, true);
      return true;
    }
  },
  verifyToken: async (token: string): Promise<boolean> => {
    const res = await axios.post(`${url}/auth/verifyToken`, { token })

    return res.status === 200;
  },
  createPost: async (data: PostData) => {
    const res = await axios.post(`${url}/post`, data);
    if (res.status === 201) {
      const { upload } = S3Service;
      for (const imageUrl of res.data.images) {
        const index: number = res.data.images.indexOf(imageUrl);
        await upload(data.images![index], imageUrl);
      }
      return res.data;
    }
  },
  getPaginatedPosts: async (limit: number, after: string, query: string) => {
    try {
      const res = await axios.get(`${url}/post/${query}`, {
        params: {
          limit,
          after,
        },
      });
      if (res.status === 200) {
        return res.data;
      }
    } catch (e: any) {
      if(e.request.status === 404)
      return [];
    }
  },
  getPosts: async (query: string) => {
    try{ 
      const res = await axios.get(`${url}/post/${query}`);
      if (res.status === 200) {
        return res.data;
      }
    } catch (e: any) {
      if(e.request.status === 404)
        return []
    }
  },
  getRecommendedUsers: async (limit: number, skip: number) => {
    const res = await axios.get(`${url}/user`, {
      params: {
        limit,
        skip,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  me: async () => {
    const res = await axios.get(`${url}/user/me`);
    if (res.status === 200) {
      return res.data;
    }
  },
  getPostById: async (id: string) => {
    const res = await axios.get(`${url}/post/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  createReaction: async (postId: string, reaction: ReactionType) => {
    const res = await axios.post(
      `${url}/reaction/${postId}`,
      { reactionType: reaction }
    );
    if (res.status === 200) {
      return res.data;
    }
  },
  deleteReaction: async (reactionId: string) => {
    const res = await axios.delete(`${url}/reaction/${reactionId}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  getReactionsByUser: async (userId: string) => {
    try{
      const res = await axios.get(`${url}/reaction/by_user/${userId}`);
      if (res.status === 200)
        return res.data;
      } catch (e: any) {
      if(e.request.status === 404)
        return [];
    }
  },
  followUser: async (userId: string) => {
    const res = await axios.post(`${url}/follower/follow/${userId}`, {});
    console.log(res);
    if (res.status === 200) {
      return res.data;
    }
  },
  unfollowUser: async (userId: string) => {
    const res = await axios.post(`${url}/follower/unfollow/${userId}`, {});
    if (res.status === 200) {
      return res.data;
    }
  },
  searchUsers: async (username: string, limit: number, skip: number) => {
    try {
      const response = await axios.get(`${url}/user/by_username/${username}`, {
        params: {
          limit,
          skip,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      if(error.request.status === 404)
        return [];
    }
  },

  getProfile: async (id: string) => {
    const res = await axios.get(`${url}/user/profile/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  getPaginatedPostsFromProfile: async (
    limit: number,
    after: string,
    id: string
  ) => {
    const res = await axios.get(`${url}/post/by_user/${id}`, {
      params: {
        limit,
        after,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },
  getPostsFromProfile: async (id: string) => {
    try{
      const res = await axios.get(`${url}/post/by_user/${id}`);
      if (res.status === 200) {
        return res.data;
      }
    } catch (e: any) {
      if(e.request.status === 404)
        return null;
    }
    
  },

  isLogged: async () => {
    const res = await axios.get(`${url}/user/me`);
    return res.status === 200;
  },

  getProfileView: async (id: string) => {
    const res = await axios.get(`${url}/user/${id}`);

    if (res.status === 200) {
      return res.data;
    }
  },

  deleteProfile: async () => {
    const res = await axios.delete(`${url}/user`);
    
    if (res.status === 204) {
      cookies.remove("jwt");
    }
  },

  getChats: async () => {
    const res = await axios.get(`${url}/chat`);

    if (res.status === 200) {
      return res.data;
    }
  },

  getMutualFollows: async () => {
    const res = await axios.get(`${url}/follow/mutual`);

    if (res.status === 200) {
      return res.data;
    }
  },

  createChat: async (id: string) => {
    const res = await axios.post(`${url}/chat`, { users: [id] });

    if (res.status === 201) {
      return res.data;
    }
  },

  getChat: async (id: string) => {
    const res = await axios.get(`${url}/chat/${id}`);

    if (res.status === 200) {
      return res.data;
    }
  },

  deletePost: async (id: string) => {
    await axios.delete(`${url}/post/${id}`);
  },

  getPaginatedCommentsByPostId: async (id: string, limit: number, after: string) => {
    const res = await axios.get(`${url}/post/comment/by_post/${id}`, {
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },

  getCommentsByPostId: async (postId: string) => {
    try{
      const res = await axios.get(`${url}/comment/${postId}`);
      if (res.status === 200) {
        return res.data;
      }
    } catch (e: any) {
      if(e.request.status === 404)
        return [];
    }
  },
  comment: async (postId: string, comment: string) => {
    const res = await axios.post(`${url}/comment/${postId}`, {
      comment
    });
    if (res.status === 200)
      return res.data;
  },
  setPrivacy: async (isPrivate: boolean) => {
    const res = await axios.post(`${url}/user/update/privacy`, {
      isPrivate
    });
    if (res.status === 200)
      return res.data;
  },
};



const useHttpRequestService = () => httpRequestService;

export { useHttpRequestService };
