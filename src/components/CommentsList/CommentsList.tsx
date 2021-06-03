import {
  Card,
  Cell,
  dateIndicationProps,
  FormField,
  Input,
  Layout,
  Text,
} from 'wix-style-react';
import DataHooks from '../../DataHooks';
import React from 'react';
import { CommentToString } from '../../utils';
import { Comment } from '@wix/ambassador-node-workshop-scala-app/rpc';

type CommentsListProps = {
  comments: Comment[] | undefined;
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
        </Layout>
      </Card.Content>
    </Card>
  );
}
