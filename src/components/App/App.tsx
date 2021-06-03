import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Page,
  WixStyleReactProvider,
  Breadcrumbs,
  Cell,
  Layout,
  FontUpgrade,
} from 'wix-style-react';
import DataHooks from '../../DataHooks';
import { BreadcrumbsItem } from 'wix-style-react/dist/es/src/Breadcrumbs';
import { Comment } from '@wix/ambassador-node-workshop-scala-app/rpc';
import * as status from '../StatusMessage/requestStatus';
import { isEmpty } from '../../utils';
import ActiveBar from '../ActiveBar/ActiveBar';
import CommentForm from '../CommentForm/CommentForm';
import CommentsList from '../CommentsList/CommentsList';
import SiteIDCard from '../SiteIDCard/SiteIDCard';
import StatusMessage from '../StatusMessage/StatusMessage';

function App() {
  const [commentsList, setCommentList] = useState<undefined | Comment[]>(
    undefined,
  );
  const [siteId, setSiteId] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [isSiteIdValid, setIsSiteIdValid] = useState<boolean>(false);
  const [isValidComment, SetIsValidComment] = useState<boolean>(false);
  const [requestStatus, setRequestStatus] = useState<status.statusType>(
    status.InitStatus,
  );

  const addComment = async (e: any) => {
    e.preventDefault();
    const body = { author, text };
    setRequestStatus(status.LoadingStatus);

    try {
      await axios.post(`/comments/${siteId}`, body);
      clearCommentForm();
      setRequestStatus(status.SuccessStatus('Add A New Comment Successfully'));
    } catch (err) {
      setRequestStatus(status.ErrorStatus('Could Not Add Comment'));
    }
  };

  const fetchComments = async (e: any) => {
    e.preventDefault();
    setRequestStatus(status.LoadingStatus);

    try {
      const comments = await axios.get(`/comments?siteId=${siteId}`);
      setRequestStatus(status.SuccessStatus('Fetch Comments Successfully'));
      setCommentList(comments.data !== '' ? comments.data : undefined);
    } catch (err) {
      setCommentList(undefined);
      setRequestStatus(status.ErrorStatus('Could Not Fetch Comments'));
    }
  };

  const clearCommentForm = () => {
    setAuthor('');
    setText('');
    setRequestStatus(status.InitStatus);
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
    setIsSiteIdValid(!isEmpty(siteId));
    SetIsValidComment(!isEmpty(text) && !isEmpty(author) && !isEmpty(siteId));
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
            <Layout>
              <Cell>
                <StatusMessage requestStatus={requestStatus} />
              </Cell>

              <Cell>
                <SiteIDCard
                  siteID={siteId}
                  onSiteIDChange={HandleSiteIDChane}
                />
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
                <CommentsList comments={commentsList} status={requestStatus} />
              </Cell>
            </Layout>
          </Page.Content>
        </Page>
      </FontUpgrade>
    </WixStyleReactProvider>
  );
}
export default App;
