import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../apis/baseUrl";
import { IPost } from "../../types/type";
import { RootState } from "../../app/store";

interface PostsState {
  posts?: IPost[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}

const initialState = {
  posts: [],
  status: "loading",
  error: null,
} as PostsState;

export const fetchPosts = createAsyncThunk<
  IPost[],
  void,
  { rejectValue: string }
>("posts/fetchPosts", async (_, thunkApi) => {
  try {
    const response = await API.get("/posts");
    const data = response.data as IPost[];
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue("failed to fetch issues");
  }
});

export const createPost = createAsyncThunk<
  IPost,
  void,
  { rejectValue: string }
>("posts/createPost", async (formdata, thunkApi) => {
  try {
    const response = await API.post("/posts", formdata);
    const data = response.data as IPost;
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue("failed to create post");
  }
});

export const deletePost = createAsyncThunk<
  IPost,
  void,
  { rejectValue: string }
>("posts/deletePost", async (id, thunkApi) => {
  try {
    const response = await API.post(`/posts/${id}`);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue("failed to delete post");
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state: PostsState) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state: PostsState, action) => {
        state.status = "success";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state: PostsState, action) => {
        state.status = "error";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts?.push(action.payload);
      });
  },
});

export const getPosts = (state: RootState) => state.posts.posts;

export const getPost = (state: RootState, postId: string) =>
  state?.posts?.posts?.find((post) => post.id === postId);

export default postSlice.reducer;
