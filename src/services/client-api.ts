import axios, { AxiosResponse } from 'axios';

export const postComment = async (
  author: string,
  text: string,
  siteId: string,
) => {
  const body = { author, text };
  return axios.post(`/comments/${siteId}`, body);
};

export const fetchCommentsList = async (siteId: string) => {
  return axios.get(`/comments?siteId=${siteId}`);
};
