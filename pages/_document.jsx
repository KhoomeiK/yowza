import React from 'react';
import Document from 'next/document';
import { SheetsRegistry, JssProvider, createGenerateId } from 'react-jss';

export default class JssDocument extends Document {
  static async getInitialProps(ctx) {
    const registry = new SheetsRegistry();
    const generateId = createGenerateId();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => (
        <JssProvider registry={registry} generateId={generateId}>
          {/* eslint-disable-next-line */}
          <App {...props} />
        </JssProvider>
      ),
    });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="server-side-styles">{registry.toString()}</style>
          <style global jsx>
            {`
              body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, Avenir Next,
                  Avenir, Helvetica, sans-serif;
              }
            `}
          </style>
        </>
      ),
    };
  }
}
