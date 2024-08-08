declare namespace Cypress {
  interface Chainable {
    // Define the structure of your custom commands here
    login(user: string): Chainable<Element>;
  }
}