const { bootstrapServer, emitConfigs } = require('./environment');

import { AmbassadorTestkit } from '@wix/ambassador-testkit';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';
import {
  dummyComment,
  dummyCommentList,
  dummyValidSiteId,
  dummyInvalidSiteId,
} from './__tests__/dummy-data-test';

(async () => {
  const app = bootstrapServer();
  /** Start RPC Mocks **/
  const ambassadorTestkit = new AmbassadorTestkit();

  /** Valid site id - Positive Scenarios test **/
  ambassadorTestkit
    .createStub(NodeWorkshopScalaApp)
    .CommentsService()
    .fetch.when(dummyValidSiteId)
    .resolve(dummyCommentList);

  ambassadorTestkit
    .createStub(NodeWorkshopScalaApp)
    .CommentsService()
    .add.when(dummyValidSiteId, dummyComment)
    .resolve(dummyComment);

  /** Invalid site id - Negative Scenarios test **/
  ambassadorTestkit
    .createStub(NodeWorkshopScalaApp)
    .CommentsService()
    .fetch.when(dummyInvalidSiteId)
    .reject('Invalid Site ID');

  ambassadorTestkit
    .createStub(NodeWorkshopScalaApp)
    .CommentsService()
    .add.when(dummyInvalidSiteId, dummyComment)
    .reject('Invalid Site ID');

  await ambassadorTestkit.start();
  /** End RPC Mocks **/
  await emitConfigs();
  await app.start();
})();
