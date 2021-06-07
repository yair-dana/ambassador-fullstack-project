export const CommentToString = (author: string, text: string) => {
  return `Author: ${author}    |    Text: ${text}`;
};

export const isEmpty = (str: string) => {
  return str.trim().length === 0;
};
