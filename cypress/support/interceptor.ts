import { HttpResponseInterceptor, RouteMatcher, StaticResponse } from 'cypress/types/net-stubbing';

type ResponseSender = {
  send: () => void;
};

const createDeferredPromise = (): [Promise<void>, () => void] => {
  let resolvePromise: () => void = () => {};

  const promise = new Promise<void>(resolve => {
    resolvePromise = resolve;
  });

  return [promise, resolvePromise];
};

/**
 * Intercepts a request indefinitely until `send` is called.
 * @param requestMatcher - The criteria to match the request.
 * @param response - The response to send when resolved.
 * @param alias - An optional alias for the intercepted request.
 * @returns An object with a `send` method to trigger the response.
 */
export const interceptForever = (
  requestMatcher: RouteMatcher,
  response?: StaticResponse | HttpResponseInterceptor,
  alias?: string,
): ResponseSender => {
  const [deferredPromise, resolveDeferredPromise] = createDeferredPromise();

  cy.intercept(requestMatcher, request =>
    deferredPromise.then(() => {
      request.reply(response);
    }),
  ).as(alias || 'request');

  return { send: resolveDeferredPromise };
};

// ----------
// EXAMPLE
// ----------
// const resultLoginMessage = interceptForever({ pathname: '/api/login_message/1' }, { fixture: "login_message.json"})
// const resultLoginMessageLogo = interceptForever('/api/login_message/logo/1', { fixture: "login_message_logo.json"})
//
// cy.visit('/login').then(() => {
//   resultLoginMessage.send()
//   resultLoginMessageLogo.send()
// })
//
// cy.get('input[name="email"]').type(email)
// const resultPreAuth = interceptForever({ pathname : '/api/auth/preauth' }, { statusCode: 200, body: { ok: true, message: ""}})
// cy.get('a[id="sign_in1"]').click({ force: true }).then(() => {
//   resultPreAuth.send()
// })