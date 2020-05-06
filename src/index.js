import { printReceived, matcherHint } from 'jest-matcher-utils';
import diffableHtml from 'diffable-html';
import ampHtmlValidator from 'amphtml-validator';

import ampBoilerplate from './amp-boilerplate';

const lineBreak = '\n\n';
const horizontalLine = '----------';

let validator;

const getValidator = async () => {
  if (!validator) {
    validator = await ampHtmlValidator.getInstance();
  }

  return validator;
};

const formatErrors = (errors) => {
  if (errors.length === 0) {
    return [];
  }

  return errors.map((error) => [
    printReceived(error.message),
    error.specUrl,
  ].join('\n')).join(lineBreak);
};

export const amp = async (body, {
  scripts = [],
  wrap = true,
} = {}) => {
  const head = scripts.map((attributes) => (
    `<script async ${Object.keys(attributes).map(((key) => `${key}="${attributes[key]}"`)).join(' ')}></script>`
  )).join('\n');

  const html = wrap ? ampBoilerplate({ head, body }) : body;

  let result;
  let validationError;

  try {
    result = (await getValidator()).validateString(html);
  } catch (err) {
    validationError = err;
  }

  return {
    body,
    result,
    validationError,
  };
};

export const toBeValidAmpHtml = ({
  result,
  body,
  validationError,
}) => {
  const { errors } = (result || {});

  if (validationError) {
    throw new Error([
      'Something went wrong while running the AMP validation. ',
      'Please ensure you have an active internet connection.',
      lineBreak,
      validationError.message,
    ].join(''));
  }

  if (typeof errors === 'undefined') {
    throw new Error('No error report found in AMP validation results');
  }

  const formatedErrors = formatErrors(errors);
  const pass = formatedErrors.length === 0;

  const message = () => {
    if (pass) {
      return { pass: true };
    }

    return [
      matcherHint(`.${toBeValidAmpHtml.name}`),
      'Expected valid AMP HTML:',
      formatedErrors,
      horizontalLine,
      diffableHtml(body).trim(),
      horizontalLine,
    ].join(lineBreak);
  };

  return {
    actual: errors,
    message,
    pass,
  };
};
