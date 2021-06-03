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
import DataHooks from '../../DataHooks';
import React from 'react';
import { CommentToString } from '../../utils';
import { Comment } from '@wix/ambassador-node-workshop-scala-app/rpc';
import { statusType } from '../StatusMessage/requestStatus';

type CommentsListProps = {
  comments: Comment[] | undefined;
  status: statusType;
};

export default function CommentsList(props: CommentsListProps) {
  return (
    <Card>
      <Card.Header title="Comments List" />
      <Card.Divider />
      <Card.Content>
        <Layout>
          {props.comments != undefined &&
            props.comments?.map((comment, index) => {
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
            })}

          {props.comments === undefined && props.status.skin === 'success' && (
            <Cell>
              <Heading dataHook={DataHooks.RESULT_MESSAGE} appearance="H5">
                Your site has no comments
              </Heading>
            </Cell>
          )}
        </Layout>
      </Card.Content>
    </Card>
  );
}
