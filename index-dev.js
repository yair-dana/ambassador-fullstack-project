const { bootstrapServer, emitConfigs } = require('./environment');

import { AmbassadorTestkit } from '@wix/ambassador-testkit';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';

const dummyCommentList = [
  { author: 'author1', text: 'dummy comment' },
  { author: 'author2', text: 'dummy comment' },
  { author: 'author3', text: 'dummy comment' },
];

(async () => {
  const app = bootstrapServer();
  /** Start RPC Mocks **/
  const ambassadorTestkit = new AmbassadorTestkit();
  const siteId = '1234';

  ambassadorTestkit
    .createStub(NodeWorkshopScalaApp)
    .CommentsService()
    .fetch.when(siteId)
    .resolve(dummyCommentList);

  await ambassadorTestkit.start();
  /** End RPC Mocks **/
  await emitConfigs();
  await app.start();
})();
