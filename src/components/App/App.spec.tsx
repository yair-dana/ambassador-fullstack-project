import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

import { CommentToString } from '../../utils';
import RTLAppDriver from './AppDriver';

import {
  dummyCommentList,
  dummyComment,
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

  it('should render comments after user enter valid site id and click fetch', async () => {
    const url = `/comments?siteId=site-valid-id`;
    axiosMock.onGet(url).reply(200, dummyCommentList);

    await driver.when.enterSiteId('site-valid-id');

    await act(async () => {
      await driver.when.fetchCommentsButtonClick();
    });

    expect(await driver.get.commentTextByIndex('0')).toEqual(
      CommentToString(dummyCommentList[0].author, dummyCommentList[0].text),
    );
  });

  it('should let user click fetch only when site id provided', async () => {
    await driver.when.enterSiteId('');
    expect(await driver.is.fetchButtonDisable()).toEqual(true);

    await driver.when.enterSiteId('site-valid-id');
    expect(await driver.is.fetchButtonDisable()).toEqual(false);
  });

  it('should allow user click Add comment only if required field entered', async () => {
    expect(await driver.is.addButtonDisable()).toEqual(true);

    await driver.when.enterCommentText('Text Test');
    await driver.when.enterCommentAuthor('Author Test');
    await driver.when.enterSiteId('site-valid-id');

    expect(await driver.is.addButtonDisable()).toEqual(false);
  });

  it('should clear comment form when Add Comment success', async () => {
    const url = `/comments/site-valid-id`;
    axiosMock.onPost(url).reply(200, dummyComment);

    await driver.when.enterCommentText('Text Test');
    await driver.when.enterCommentAuthor('Author Test');
    await driver.when.enterSiteId('site-valid-id');

    await act(async () => {
      await driver.when.addButtonClick();
    });

    expect(await driver.get.inputCommentText()).toEqual('');
    expect(await driver.get.inputCommentAuthorText()).toEqual('');
  });

  it('should display error msg when user enter invalid site id and enter add comment', async () => {
    const url = `/comments/site-invalid-id`;
    axiosMock.onPost(url).reply(404, dummyComment);

    await driver.when.enterCommentText('Text Test');
    await driver.when.enterCommentAuthor('Author Test');
    await driver.when.enterSiteId('site-invalid-id');

    expect(await driver.get.statusMessageText()).toEqual('');

    await act(async () => {
      await driver.when.addButtonClick();
    });

    expect(await driver.get.statusMessageText()).toEqual(
      'Error: Could Not Add Comment',
    );
  });

  it('should display error msg when user enter invalid site id and enter fetch comments', async () => {
    const url = `/comments?siteId=site-invalid-id`;
    axiosMock.onPost(url).reply(404, dummyComment);

    await driver.when.enterSiteId('site-invalid-id');

    expect(await driver.get.statusMessageText()).toEqual('');
    await act(async () => {
      await driver.when.fetchCommentsButtonClick();
    });

    expect(await driver.get.statusMessageText()).toEqual(
      'Error: Could Not Fetch Comments',
    );
  });

  it('should display success message when comments loaded correctly ', async () => {
    const url = `/comments?siteId=site-valid-id`;
    axiosMock.onGet(url).reply(200, dummyCommentList);

    await driver.when.enterSiteId('site-valid-id');

    await act(async () => {
      await driver.when.fetchCommentsButtonClick();
    });

    expect(await driver.get.statusMessageText()).toEqual(
      'Fetch Comments Successfully',
    );
  });

  it('should display success message when user add comment successfully', async () => {
    const url = `/comments/site-valid-id`;
    axiosMock.onPost(url).reply(200, dummyComment);

    await driver.when.enterCommentText('Text Test');
    await driver.when.enterCommentAuthor('Author Test');
    await driver.when.enterSiteId('site-valid-id');

    await act(async () => {
      await driver.when.addButtonClick();
    });

    expect(await driver.get.statusMessageText()).toEqual(
      'Add A New Comment Successfully',
    );
  });

  it('should render no data message if site id has no comments', async () => {
    const url = `/comments?siteId=site-valid-id`;
    axiosMock.onGet(url).reply(200);
    await driver.when.enterSiteId('site-valid-id');

    await act(async () => {
      await driver.when.fetchCommentsButtonClick();
    });

    expect(await driver.get.fetchCommentsMessage()).toEqual(
      'Your site has no comments',
    );
  });
});
