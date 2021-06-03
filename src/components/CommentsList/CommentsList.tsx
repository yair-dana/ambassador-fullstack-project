import React from 'react';
import DataHooks from '../../DataHooks';
import {
  Card,
  Cell,
  dateIndicationProps,
  FormField,
  Heading,
  Input,
  Layout,
  Text,
} from 'wix-style-react';
import { CommentToString } from '../../utils';
import { Comment } from '@wix/ambassador-node-workshop-scala-app/rpc';
import { statusType } from '../StatusMessage/requestStatus';

type CommentsListProps = {
  comments: Comment[] | undefined;
  status: statusType;
};

export default function CommentsList(props: CommentsListProps) {
  const showNoResultMessage: boolean =
    props.comments === undefined && props.status.status === 'success';

  const showComments: boolean = props.comments !== undefined;

  const renderCommentsList = () => {
    return props.comments?.map((comment, index) => {
      return (
        <Cell key={`cell-${index}`}>
          <Text
            key={`text-${index}`}
            dataHook={`${DataHooks.COMMENT}-${index}`}
          >
            {CommentToString(comment.author, comment.text)}
          </Text>
        </Cell>
      );
    });
  };

  const renderNoResultMessage = () => {
    return (
      <Cell>
        <Heading dataHook={DataHooks.RESULT_MESSAGE} appearance="H5">
          Your site has no comments
        </Heading>
      </Cell>
    );
  };

  return (
    <Card>
      <Card.Header title="Comments List" />
      <Card.Divider />
      <Card.Content>
        <Layout>
          {showComments && renderCommentsList()}
          {showNoResultMessage && renderNoResultMessage()}
        </Layout>
      </Card.Content>
    </Card>
  );
}
