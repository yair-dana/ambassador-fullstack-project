import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {
  PageHeaderTestkit,
  ButtonTestkit,
  TextTestkit,
  InputTestkit,
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

    const inputSiteId = await InputTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.SITE_ID,
    });

    await inputSiteId.enterText('1234');

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

  it('let user click fetch only if site id provide', async () => {
    const { baseElement } = render(<App />);

    const inputSiteId = await InputTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.SITE_ID,
    });

    const fetchButton = await ButtonTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.FETCH_COMMENTS,
    });

    await inputSiteId.enterText('');
    expect(await fetchButton.isButtonDisabled()).toEqual(true);

    await inputSiteId.enterText('1234');
    expect(await fetchButton.isButtonDisabled()).toEqual(false);
  });

  it('should allow user click Add comment only if required field entered', async () => {
    const { baseElement } = render(<App />);

    const addCommentButton = await ButtonTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.ADD_COMMENT,
    });

    expect(await addCommentButton.isButtonDisabled()).toEqual(true);

    const inputAuthor = await InputTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.AUTHOR,
    });

    const inputText = await InputTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.TEXT,
    });

    await inputAuthor.enterText('Author Test');
    await inputText.enterText('Text Test');

    expect(await addCommentButton.isButtonDisabled()).toEqual(false);
  });
});
