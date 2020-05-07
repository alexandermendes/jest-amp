import React from 'react';
import { Helmet } from 'react-helmet';

import { render } from '@testing-library/react';

import Example from './Example';
import HelmetExample from './HelmetExample';
import { amp, toBeValidAmpHtml } from '../src';

expect.extend({ toBeValidAmpHtml });

describe('React Testing Library examples', () => {
  it('demonstrates a simple example', async () => {
    const { container } = render(<Example />);
    const result = await amp(container.innerHTML);

    expect(result).toBeValidAmpHtml();
  });

  it('demonstrates a react-helmet example', async () => {
    const { container } = render(<HelmetExample />);
    const { scriptTags } = Helmet.peek();
    const result = await amp(container.innerHTML, { scriptTags });

    expect(result).toBeValidAmpHtml();
  });
});
