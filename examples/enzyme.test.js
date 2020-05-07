import React from 'react';
import { Helmet } from 'react-helmet';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Example from './Example';
import HelmetExample from './HelmetExample';
import { amp, toBeValidAmpHtml } from '../src';

configure({ adapter: new Adapter() });
expect.extend({ toBeValidAmpHtml });

describe('Enzyme examples', () => {
  it('demonstrates a simple example', async () => {
    const wrapper = mount(<Example />);
    const result = await amp(wrapper.html());

    expect(result).toBeValidAmpHtml();
  });

  it('demonstrates a react-helmet example', async () => {
    const wrapper = mount(<HelmetExample />);
    const { scriptTags } = Helmet.peek();
    const result = await amp(wrapper.html(), { scriptTags });

    expect(result).toBeValidAmpHtml();
  });
});
