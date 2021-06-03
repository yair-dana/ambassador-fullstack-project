import {
  PageHeaderTestkit,
  ButtonTestkit,
  TextTestkit,
  InputTestkit,
} from 'wix-style-react/dist/testkit';
import DataHooks from '../../DataHooks';
import { fetchComments } from '../../services/comments-service';
import { text } from 'express';

class RTLAppDriver {
  constructor(private baseElement: Element) {}
  is = {
    fetchButtonDisable: async () => {
      const fetchButton = await ButtonTestkit({
        wrapper: this.baseElement,
        dataHook: DataHooks.FETCH_COMMENTS,
      });

      return fetchButton.isButtonDisabled();
    },
    addButtonDisable: async () => {
      const addButton = await ButtonTestkit({
        wrapper: this.baseElement,
        dataHook: DataHooks.ADD_COMMENT,
      });

      return addButton.isButtonDisabled();
    },
  };

  get = {
    pageTitleText: async () => {
      const title = await PageHeaderTestkit({
        wrapper: this.baseElement,
        dataHook: DataHooks.PAGE_HEADER,
      });
      return title.titleText();
    },
    commentTextByIndex: async (commentIndex: string) => {
      const firstComment = await TextTestkit({
        wrapper: this.baseElement,
        dataHook: `${DataHooks.COMMENT}-${commentIndex}`,
      });
      return firstComment.getText();
    },
    inputCommentText: async () => {
      const inputText = await InputTestkit({
        wrapper: this.baseElement,
        dataHook: DataHooks.TEXT,
      });
      return inputText.getText();
    },
    inputCommentAuthorText: async () => {
      const inputAuthor = await InputTestkit({
        wrapper: this.baseElement,
        dataHook: DataHooks.AUTHOR,
      });
      return inputAuthor.getText();
    },
    errorMessageText: async () => {
      const textErrorMessage = await TextTestkit({
        wrapper: this.baseElement,
        dataHook: DataHooks.ERROR_MESSAGE,
      });
      return textErrorMessage.getText();
    },
  };

  when = {
    fetchButtonClick: async () => {
      const fetchButton = await ButtonTestkit({
        wrapper: this.baseElement,
        dataHook: DataHooks.FETCH_COMMENTS,
      });
      return fetchButton.click();
    },
    addButtonClick: async () => {
      const addButton = await ButtonTestkit({
        wrapper: this.baseElement,
        dataHook: DataHooks.ADD_COMMENT,
      });
      return addButton.click();
    },
    enterSiteId: async (siteID: string) => {
      const inputSiteId = await InputTestkit({
        wrapper: this.baseElement,
        dataHook: DataHooks.SITE_ID,
      });
      return inputSiteId.enterText(siteID);
    },
    enterCommentAuthor: async (author: string) => {
      const inputAuthor = await InputTestkit({
        wrapper: this.baseElement,
        dataHook: DataHooks.AUTHOR,
      });

      return inputAuthor.enterText(author);
    },
    enterCommentText: async (text: string) => {
      const inputText = await InputTestkit({
        wrapper: this.baseElement,
        dataHook: DataHooks.TEXT,
      });
      return inputText.enterText(text);
    },
  };
}

export default RTLAppDriver;
