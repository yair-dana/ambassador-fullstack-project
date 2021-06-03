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

import { CommentToString } from '../../utils';

import {
  dummyValidSiteId,
  dummyCommentList,
  dummyComment,
  dummyInvalidSiteId,
} from '../../../__tests__/dummy-data-test';

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

  it('should render comments when user enter valid site id and click fetch', async () => {
    const { baseElement } = render(<App />);

    const url = `/comments?siteId=${dummyValidSiteId}`;
    axiosMock.onGet(url).reply(200, dummyCommentList);

    const fetchButton = await ButtonTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.FETCH_COMMENTS,
    });

    const inputSiteId = await InputTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.SITE_ID,
    });

    await inputSiteId.enterText(dummyValidSiteId);

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

    const inputSiteId = await InputTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.SITE_ID,
    });

    await inputAuthor.enterText('Author Test');
    await inputText.enterText('Text Test');
    await inputSiteId.enterText(dummyValidSiteId);

    expect(await addCommentButton.isButtonDisabled()).toEqual(false);
  });

  it('should clear comment form Add Comment success', async () => {
    const { baseElement } = render(<App />);

    const url = `/comments/${dummyValidSiteId}`;
    axiosMock.onPost(url).reply(200, dummyComment);

    const inputAuthor = await InputTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.AUTHOR,
    });

    const inputText = await InputTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.TEXT,
    });

    const addCommentButton = await ButtonTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.ADD_COMMENT,
    });

    const inputSiteId = await InputTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.SITE_ID,
    });

    await inputAuthor.enterText('Author Test');
    await inputText.enterText('Text Test');
    await inputSiteId.enterText(dummyValidSiteId);

    await act(async () => {
      await addCommentButton.click();
    });

    expect(await inputAuthor.getText()).toEqual('');
    expect(await inputText.getText()).toEqual('');
  });
});
