/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */
import React from 'react';

const HTML = ({ content, state, helmet, errorContent, styleTags }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html lang="en" {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {styleTags}
      </head>
      <body {...bodyAttrs}>
        <div
          id="root"
          dangerouslySetInnerHTML={{ __html: content || errorContent }}
        />
        <script
          charSet="UTF-8"
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              '\\u003c'
            )};`,
          }}
        />
        <script
          charSet="UTF-8"
          src={`${process.env.BASE_ROOT}/js/main.bundle.js`}
        />
      </body>
    </html>
  );
};

export default HTML;
