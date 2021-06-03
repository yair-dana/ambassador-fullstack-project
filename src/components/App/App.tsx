import React, { useEffect, useState } from 'react';
import {
  Page,
  WixStyleReactProvider,
  Breadcrumbs,
  Text,
  Card,
  Box,
  Cell,
  Input,
  Layout,
  FontUpgrade,
  FormField,
} from 'wix-style-react';
import DataHooks from '../../DataHooks';
import ActiveBar from '../ActiveBar/ActiveBar';
import axios from 'axios';
import { BreadcrumbsItem } from 'wix-style-react/dist/es/src/Breadcrumbs';
import { Comment } from '@wix/ambassador-node-workshop-scala-app/rpc';
import * as events from 'events';
import { CommentToString } from '../../utils';

function App() {
  const [commentsList, setCommentList] = useState<undefined | Comment[]>(
    undefined,
  );
  const [siteId, setSiteId] = useState<string>('');
  const [commentAuthor, setCommentAuthor] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [isSiteIdValid, setIsSiteIdValid] = useState<boolean>(false);
  const [isValidComment, SetIsValidComment] = useState<boolean>(false);

  const addComment = async (e: any) => {
    e.preventDefault();
  };

  const fetchComments = async (e: any) => {
    e.preventDefault();
    const comments = await axios.get(`/comments?siteId=${siteId}`);

    if (comments.status === 200 && comments.data !== '') {
      setCommentList(comments.data);
    } else {
      setCommentList(undefined);
    }
  };

  const breadcrumbItems: BreadcrumbsItem[] = [
    { id: 1, value: 'Root Page' },
    { id: 2, value: 'Comments App' },
  ];

  useEffect(() => {
    setIsSiteIdValid(siteId.trim().length !== 0);
  }, [siteId]);

  return (
    <WixStyleReactProvider features={{ reducedSpacingAndImprovedLayout: true }}>
      <FontUpgrade>
        <Page height="100vh">
          <Page.Header
            dataHook={DataHooks.PAGE_HEADER}
            title="Comments App"
            breadcrumbs={<Breadcrumbs items={breadcrumbItems} activeId={2} />}
            actionsBar={
              <ActiveBar
                isFetchEnable={isSiteIdValid}
                onAddComment={addComment}
                onFetchComments={fetchComments}
              />
            }
          />
          <Page.Content>
            <Layout>
              <Cell span={6}>
                <Card>
                  <Card.Header title="Add Comment" />
                  <Card.Divider />
                  <Card.Content>
                    <Layout>
                      <Cell span={6}>
                        <FormField label="Author" required>
                          <Input />
                        </FormField>
                      </Cell>
                      <Cell span={6}>
                        <FormField label="Text" required>
                          <Input />
                        </FormField>
                      </Cell>
                    </Layout>
                  </Card.Content>
                </Card>
              </Cell>
              <Cell span={6}>
                <Card>
                  <Card.Header title="Comments List" />
                  <Card.Divider />
                  <Card.Content>
                    <Layout>
                      <Cell>
                        <FormField label="Please Provide Your Site ID" required>
                          <Input
                            value={siteId}
                            onChange={(e) => {
                              setSiteId(e.target.value);
                            }}
                            dataHook={DataHooks.SITE_ID}
                          />
                        </FormField>
                      </Cell>

                      {commentsList != undefined
                        ? commentsList?.map((comment, index) => {
                            return (
                              <Cell key={`cell-${index}`}>
                                <Text
                                  key={`text-${index}`}
                                  dataHook={`${DataHooks.COMMENT}-${index}`}
                                >
                                  {CommentToString(
                                    comment.author,
                                    comment.text,
                                  )}
                                </Text>
                              </Cell>
                            );
                          })
                        : null}
                    </Layout>
                  </Card.Content>
                </Card>
              </Cell>
            </Layout>
          </Page.Content>
        </Page>
      </FontUpgrade>
    </WixStyleReactProvider>
  );
}

export default App;
