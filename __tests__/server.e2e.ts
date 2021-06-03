import axios from 'axios';
import { AmbassadorTestkit } from '@wix/ambassador-testkit';
import {
  Comment,
  NodeWorkshopScalaApp,
} from '@wix/ambassador-node-workshop-scala-app/rpc';

describe('API integration tests', () => {
  const ambassadorTestkit = new AmbassadorTestkit();
  ambassadorTestkit.beforeAndAfter();

  it('should returns comments list', async () => {
    const { siteId, commentsList } = getCommentsDummyData();

    createStubFetchComments(ambassadorTestkit, siteId, commentsList);
    const url = app.getUrl(`/comments?siteId=${siteId}`);
    const response = await axios.get(url);
    expect(response.data).toEqual(commentsList);
  });

  it('should post a new comment', async () => {
    const { siteId, comment } = postCommentDummyData();
    createStubAddComment(ambassadorTestkit, siteId, comment);
    const body = {
      author: comment.author,
      text: comment.text,
    };
    const url = app.getUrl(`/comments/${siteId}`);
    const response = await axios.post(url, body);
    expect(response.data.msg).toEqual('Add a new comment successfully!');
  });
});

function postCommentDummyData() {
  const siteId = '1234';
  const comment: Comment = { author: 'Test', text: 'TestComment' };
  return { siteId, comment };
}

function getCommentsDummyData() {
  const siteId = '1234';
  const commentsList: Comment[] = [
    { author: 'Yair', text: 'example text' },
    { author: 'Ben', text: 'example comment' },
  ];
  return { siteId, commentsList };
}

function createStubFetchComments(
  ambassadorTestkit: AmbassadorTestkit,
  siteId: string,
  commentsList: Comment[],
) {
  ambassadorTestkit
    .createStub(NodeWorkshopScalaApp)
    .CommentsService()
    .fetch.when(siteId)
    .resolve(commentsList);
}

function createStubAddComment(
  ambassadorTestkit: AmbassadorTestkit,
  siteId: string,
  comment: Comment,
) {
  ambassadorTestkit
    .createStub(NodeWorkshopScalaApp)
    .CommentsService()
    .add.when(siteId, comment)
    .resolve('Add a new comment successfully!');
}
