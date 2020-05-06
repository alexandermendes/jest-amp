import { amp, toBeValidAmpHtml } from '.';

describe('jest-amp', () => {
  describe('amp', () => {
    it('returns the expected result for valid AMP', async () => {
      const markup = '<div />';
      const { result } = await amp(markup);

      expect(result.status).toEqual('PASS');
      expect(result.errors).toHaveLength(0);
    });

    it('returns the expected result for invalid AMP', async () => {
      const markup = '<amp-list>';
      const { result } = await amp(markup);

      expect(result.status).toEqual('FAIL');

      const errCodes = result.errors.map((err) => err.code);

      expect(errCodes).toContain('MISSING_REQUIRED_EXTENSION');
    });

    it('injects script tags', async () => {
      const markup = '<amp-list>';
      const { result } = await amp(markup, {
        scripts: [
          {
            'custom-element': 'amp-list',
            src: 'https://cdn.ampproject.org/v0/amp-list-0.1.js',
          },
        ],
      });

      const errCodes = result.errors.map((err) => err.code);

      expect(errCodes).not.toContain('MISSING_REQUIRED_EXTENSION');
    });


    it('returns the original markup', async () => {
      const markup = '<div />';
      const { body } = await amp(markup);

      expect(body).toEqual(markup);
    });

    it('disables injection into a boilerplate AMP document', async () => {
      const markup = '<div />';
      const { result } = await amp(markup, { wrap: false });

      expect(result.status).toEqual('FAIL');

      const errCodes = result.errors.map((err) => err.code);

      expect(errCodes).toContain('MANDATORY_TAG_MISSING');
    });
  });

  describe('toBeValidAmpHtml', () => {
    const body = '<div>Hello, World!</div>';

    const successfulResult = { errors: [] };

    const failingResult = {
      errors: [
        {
          message: 'No good',
          specUrl: 'http://example.com/no-good',
        },
        {
          message: 'Also no good',
          specUrl: 'http://example.com/also-no-good',
        },
      ],
    };

    it('passes when there are no validation errors', () => {
      const { pass } = toBeValidAmpHtml({ result: successfulResult, body });

      expect(pass).toEqual(true);
    });

    it('does not pass when there are validation errors', () => {
      const { pass } = toBeValidAmpHtml({ result: failingResult, body });

      expect(pass).toEqual(false);
    });

    it('reports all errors', () => {
      const { message } = toBeValidAmpHtml({ result: failingResult, body });
      const output = message();

      expect(output).toMatch(/.*No good.*/);
      expect(output).toMatch(/.*Also no good.*/);
    });
  });
});
