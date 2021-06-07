import { Card, Cell, FormField, Input, Layout } from 'wix-style-react';
import DataHooks from '../../DataHooks';
import React, { ChangeEvent } from 'react';

type CommentFormProps = {
  author: string;
  text: string;
  onAuthorChange(event: ChangeEvent<HTMLInputElement>): void;
  onTextChange(event: ChangeEvent<HTMLInputElement>): void;
};

export default function CommentForm(props: CommentFormProps) {
  return (
    <Card>
      <Card.Header title="Add Comment" />
      <Card.Divider />
      <Card.Content>
        <Layout>
          <Cell span={6}>
            <FormField label="Author" required>
              <Input
                dataHook={DataHooks.AUTHOR}
                value={props.author}
                onChange={props.onAuthorChange}
              />
            </FormField>
          </Cell>
          <Cell span={6}>
            <FormField label="Text" required>
              <Input
                dataHook={DataHooks.TEXT}
                value={props.text}
                onChange={props.onTextChange}
              />
            </FormField>
          </Cell>
        </Layout>
      </Card.Content>
    </Card>
  );
}
