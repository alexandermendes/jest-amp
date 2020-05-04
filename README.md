# jest-amp

A [Jest](https://jestjs.io/) matcher to validate [AMP](https://amp.dev/) markup.

This matcher works by wrapping HTML snippets in the minimum valid AMP HTML
document and running this through the [AMP validator](https://validator.ampproject.org/).

## Installation

```
yarn add jest-amp -D
```

## Usage

```js
import { amp, toBeValidAmpHtml } from 'jest-amp';

expect.extend({ toBeValidAmpHtml });

it('is valid AMP HTML', async () => {
  const html = '<div>Hello, World</div>';

  expect(await amp(html)).toBeValidAmpHtml();
});
```

## Configuration

The `amp` function accepts an options object as the second argument, which can
be used to inject any required async script elements into the document head.

```js
import { amp, toBeValidAmpHtml } from 'jest-amp';

expect.extend({ toBeValidAmpHtml });

const ampMatcherOptions = {
  scripts: [
    {
      'custom-element': 'amp-list',
      src: 'https://cdn.ampproject.org/v0/amp-list-0.1.js',
    },
  ],
};

it('is valid AMP HTML', async () => {
  const html = '<amp-list src="example.com"></amp-list>';

  expect(await amp(html, ampMatcherOptions)).toBeValidAmpHtml();
});
```
