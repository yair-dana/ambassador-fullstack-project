const { bootstrapServer, emitConfigs } = require('./environment');

import {
  AmbassadorTestkit,
  InvalidArgumentError,
} from '@wix/ambassador-testkit';
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
    .resolve(dummyCommentList)
    .when(dummyInvalidSiteId)
    .reject(InvalidArgumentError('Invalid Site ID'));

  ambassadorTestkit
    .createStub(NodeWorkshopScalaApp)
    .CommentsService()
    .add.when(dummyValidSiteId, dummyComment)
    .resolve(dummyComment)
    .when(dummyInvalidSiteId, dummyComment)
    .reject(InvalidArgumentError('Invalid Site ID'));

  /** Invalid site id - Negative Scenarios test **/
  // ambassadorTestkit
  //   .createStub(NodeWorkshopScalaApp)
  //   .CommentsService()
  //   .fetch.when(dummyInvalidSiteId)
  //   .reject(InvalidArgumentError('Invalid Site ID'));

  // ambassadorTestkit.createStub(NodeWorkshopScalaApp).CommentsService().add;

  await ambassadorTestkit.start();
  /** End RPC Mocks **/
  await emitConfigs();
  await app.start();
})();
