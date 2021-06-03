import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

import { CommentToString } from '../../utils';
import RTLAppDriver from './AppDriver';

import {
  dummyValidSiteId,
  dummyCommentList,
  dummyComment,
  dummyInvalidSiteId,
} from '../../../__tests__/dummy-data-test';

import axios from 'axios';

import MockAdapter from 'axios-mock-adapter';

const axiosMock = new MockAdapter(axios);
let driver: RTLAppDriver;

describe('App', () => {
  beforeEach(() => {
    const { baseElement } = render(<App />);
    driver = new RTLAppDriver(baseElement);
  });

  it('renders a title correctly', async () => {
    expect(await driver.get.pageTitleText()).toEqual('Comments App');
  });

  it('should render comments when user enter valid site id and click fetch', async () => {
    const url = `/comments?siteId=${dummyValidSiteId}`;
    axiosMock.onGet(url).reply(200, dummyCommentList);

    await driver.when.enterSiteId(dummyValidSiteId);

    await act(async () => {
      await driver.when.fetchButtonClick();
    });

    expect(await driver.get.commentTextByIndex('0')).toEqual(
      CommentToString(dummyCommentList[0].author, dummyCommentList[0].text),
    );
  });

  it('let user click fetch only if site id provide', async () => {
    await driver.when.enterSiteId('');
    expect(await driver.is.fetchButtonDisable()).toEqual(true);

    await driver.when.enterSiteId(dummyValidSiteId);
    expect(await driver.is.fetchButtonDisable()).toEqual(false);
  });

  it('should allow user click Add comment only if required field entered', async () => {
    expect(await driver.is.addButtonDisable()).toEqual(true);

    await driver.when.enterCommentText('Text Test');
    await driver.when.enterCommentAuthor('Author Test');
    await driver.when.enterSiteId(dummyValidSiteId);

    expect(await driver.is.addButtonDisable()).toEqual(false);
  });

  it('should clear comment form Add Comment success', async () => {
    const url = `/comments/${dummyValidSiteId}`;
    axiosMock.onPost(url).reply(200, dummyComment);

    await driver.when.enterCommentText('Text Test');
    await driver.when.enterCommentAuthor('Author Test');
    await driver.when.enterSiteId(dummyValidSiteId);

    await act(async () => {
      await driver.when.addButtonClick();
    });

    expect(await driver.get.inputCommentText()).toEqual('');
    expect(await driver.get.inputCommentAuthorText()).toEqual('');
  });

  it('should display error msg when user enter invalid site id and enter add comment', async () => {
    const url = `/comments/${dummyInvalidSiteId}`;
    axiosMock.onPost(url).reply(404, dummyComment);

    await driver.when.enterCommentText('Text Test');
    await driver.when.enterCommentAuthor('Author Test');
    await driver.when.enterSiteId(dummyInvalidSiteId);

    expect(await driver.get.errorMessageText()).toEqual('');

    await act(async () => {
      await driver.when.addButtonClick();
    });

    expect(await driver.get.errorMessageText()).toEqual(
      'Error: Could Not Add Comments',
    );
  });

  it('should display error msg when user enter invalid site id and enter fetch comments', async () => {
    const { baseElement } = render(<App />);

    const url = `/comments?siteId=${dummyInvalidSiteId}`;
    axiosMock.onPost(url).reply(404, dummyComment);

    await driver.when.enterSiteId(dummyInvalidSiteId);

    expect(await driver.get.errorMessageText()).toEqual('');
    await act(async () => {
      await driver.when.fetchButtonClick();
    });

    expect(await driver.get.errorMessageText()).toEqual(
      'Error: Could Not Fetch Comments',
    );
  });
});
