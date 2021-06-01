import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from '@wix/wix-i18n-config';
import i18n from '../__mocks__/i18n';
import App from './App';

describe('App', () => {
  it('renders a title correctly', async () => {
    const { findByTestId } = render(
      <Suspense fallback="...loading">
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Suspense>,
    );

    const el = await findByTestId('app-title');

    expect(el.textContent).toBe('app.title');
  });
});
