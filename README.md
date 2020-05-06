# jest-amp

A [Jest](https://jestjs.io/) matcher to validate [AMP](https://amp.dev/) markup.

This matcher works by wrapping HTML snippets in the minimum valid AMP HTML
document and running this through the [AMP validator](https://validator.ampproject.org/).

Note that this matcher currently requires an active internet connection to be able
to access the AMP validator.

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

The `amp` function accepts an options object as the second argument.

### `script`

Inject any required async script elements into the document head.

```js
import { amp } from 'jest-amp';

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

### `wrap`

Don't wrap the markup being tested in a boilerplate AMP document.

```js
import { amp } from 'jest-amp';

it('is valid AMP HTML', async () => {
  const html = '<amp-list src="example.com"></amp-list>';

  expect(await amp(html, { wrap: false })).toBeValidAmpHtml();
});
```
