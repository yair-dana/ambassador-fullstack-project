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
import React, { ChangeEvent } from 'react';
import { CommentToString } from '../../utils';
import { Comment } from '@wix/ambassador-node-workshop-scala-app/rpc';

type CommentsListProps = {
  siteID: string;
  comments: Comment[] | undefined;
  onSiteIdChange(event: ChangeEvent<HTMLInputElement>): void;
};

export default function CommentsList(props: CommentsListProps) {
  return (
    <Card>
      <Card.Header title="Comments List" />
      <Card.Divider />
      <Card.Content>
        <Layout>
          <Cell>
            <FormField label="Please Provide Your Site ID" required>
              <Input
                value={props.siteID}
                onChange={props.onSiteIdChange}
                dataHook={DataHooks.SITE_ID}
              />
            </FormField>
          </Cell>

          {props.comments != undefined
            ? props.comments?.map((comment, index) => {
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
              })
            : null}
        </Layout>
      </Card.Content>
    </Card>
  );
}
