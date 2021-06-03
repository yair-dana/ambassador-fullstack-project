import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {
  PageHeaderTestkit,
  ButtonTestkit,
  TextTestkit,
} from 'wix-style-react/dist/testkit';
import DataHooks from '../../DataHooks';
import { act } from 'react-dom/test-utils';

import { baseUrl } from '@wix/ambassador-testkit/dist/test/fixtures/html-app/config';
import { CommentToString } from '../../utils';

const dummyCommentList = [
  { author: 'author1', text: 'dummy comment' },
  { author: 'author2', text: 'dummy comment' },
  { author: 'author3', text: 'dummy comment' },
];

import axios from 'axios';

import MockAdapter from 'axios-mock-adapter';

const axiosMock = new MockAdapter(axios);

describe('App', () => {
  it('renders a title correctly', async () => {
    const { baseElement } = render(<App />);

    const title = await PageHeaderTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.PAGE_HEADER,
    });

    expect(await title.titleText()).toEqual('Comments App');
  });

  it('should render comments when user click fetch', async () => {
    const { baseElement } = render(<App />);

    const commentsUri = '/comments';
    const url = new RegExp(`${commentsUri}*`);
    axiosMock.onGet(url).reply(200, dummyCommentList);

    const fetchButton = await ButtonTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.FETCH_COMMENTS,
    });

    await act(async () => {
      await fetchButton.click();
    });

    const firstComment = await TextTestkit({
      wrapper: baseElement,
      dataHook: `${DataHooks.COMMENT}-0`,
    });

    expect(await firstComment.getText()).toEqual(
      CommentToString(dummyCommentList[0].author, dummyCommentList[0].text),
    );
  });
});
