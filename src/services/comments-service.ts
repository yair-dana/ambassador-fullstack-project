import { Comment, NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';

export const fetchComments = async(aspect:any, id:string) => {
  const commentsService = NodeWorkshopScalaApp().CommentsService();
  const comments: Promise<Comment[]> = commentsService(aspect).fetch(
    id
  );
  return comments;
};


export const addComments = async(aspect:any, id:string, comment:Comment) => {
  const commentsService = NodeWorkshopScalaApp().CommentsService();
  return commentsService(aspect).add(
    id, comment
  );
};

//
// export const add = method(async function (comment) {
//   const commentsService = NodeWorkshopScalaApp().CommentsService();
//   return commentsService(this.context.aspects).add(
//     'a1ea1e40-8698-42e7-a75a-85cd95ffaa23', comment,
//   );
// });
