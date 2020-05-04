import { toBeValidAmpHtml } from '.';

describe('jest-amp', () => {
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
      const { pass, message } = toBeValidAmpHtml({ result: failingResult, body });

      expect(pass).toEqual(false);
      expect(message()).toMatchSnapshot();
    });

    it('reports all errors', () => {
      const { message } = toBeValidAmpHtml({ result: failingResult, body });
      const output = message();

      expect(output).toMatch(/.*No good.*/);
      expect(output).toMatch(/.*Also no good.*/);
    });
  });
});
