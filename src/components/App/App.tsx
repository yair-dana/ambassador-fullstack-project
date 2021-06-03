import React, { ChangeEvent, useEffect, useState } from 'react';
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
import CommentForm from '../CommentForm/CommentForm';
import CommentsList from '../CommentsList/CommentsList';

function App() {
  const [commentsList, setCommentList] = useState<undefined | Comment[]>(
    undefined,
  );
  const [siteId, setSiteId] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [isSiteIdValid, setIsSiteIdValid] = useState<boolean>(false);
  const [isValidComment, SetIsValidComment] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const addComment = async (e: any) => {
    e.preventDefault();
    const body = { author, text };
    try {
      const ret = await axios.post(`/comments/${siteId}`, body);
      clearCommentForm();
    } catch (e) {
      setErrorMsg('Error: Could Not Add Comments');
    }
  };

  const fetchComments = async (e: any) => {
    e.preventDefault();
    try {
      const comments = await axios.get(`/comments?siteId=${siteId}`);
      console.log(comments);
      if (comments.data !== '') {
        setCommentList(comments.data);
        setErrorMsg('');
      } else {
        setCommentList(undefined);
      }
    } catch (err) {
      setCommentList(undefined);
      setErrorMsg('Error: Could Not Fetch Comments');
    }
  };

  const clearCommentForm = () => {
    setAuthor('');
    setText('');
    setErrorMsg('');
  };
  const breadcrumbItems: BreadcrumbsItem[] = [
    { id: 1, value: 'Root Page' },
    { id: 2, value: 'Comments App' },
  ];

  const HandleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const HandleAuthorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const HandleSiteIDChane = (event: ChangeEvent<HTMLInputElement>) => {
    setSiteId(event.target.value);
  };

  useEffect(() => {
    setIsSiteIdValid(siteId.trim().length !== 0);
    SetIsValidComment(
      text.trim().length !== 0 &&
        author.trim().length !== 0 &&
        siteId.trim().length !== 0,
    );
  }, [siteId, text, author]);

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
                isFetchCommentsEnable={isSiteIdValid}
                isAddCommentEnable={isValidComment}
                onAddComment={addComment}
                onFetchComments={fetchComments}
              />
            }
          />
          <Page.Content>
            <Text
              skin="error"
              textAlign="center"
              dataHook={DataHooks.ERROR_MESSAGE}
            >
              {errorMsg}
            </Text>

            <Layout>
              <Cell>
                <Card>
                  <Card.Content>
                    <FormField label="Please Provide Your Site ID" required>
                      <Input
                        value={siteId}
                        onChange={HandleSiteIDChane}
                        dataHook={DataHooks.SITE_ID}
                      />
                    </FormField>
                  </Card.Content>
                </Card>
              </Cell>
              <Cell span={6}>
                <CommentForm
                  author={author}
                  text={text}
                  onAuthorChange={HandleAuthorChange}
                  onTextChange={HandleTextChange}
                />
              </Cell>
              <Cell span={6}>
                <CommentsList comments={commentsList} />
              </Cell>
            </Layout>
          </Page.Content>
        </Page>
      </FontUpgrade>
    </WixStyleReactProvider>
  );
}

export default App;
