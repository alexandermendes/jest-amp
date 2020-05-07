import React from 'react';
import { Helmet } from 'react-helmet';

const HelmetExample = () => (
  <>
    <Helmet>
      <script
        async
        custom-element="amp-list"
        src="https://cdn.ampproject.org/v0/amp-list-0.1.js"
      />
      <script
        async
        custom-template="amp-mustache"
        src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
      />
    </Helmet>
    <amp-list
      width="auto"
      height="100"
      layout="fixed-height"
      src="/example"
    >
      <template
        type="amp-mustache"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: '{{result}}',
        }}
      />
    </amp-list>
  </>
);

export default HelmetExample;
