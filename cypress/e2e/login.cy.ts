/**
 * - Login Spec
 * - should display login page correctly
 * - should display alert when email is empty
 * - should display alert when password is empty
 * - should display alert when email and password are wrong
 * - should display homepage when email and password are correct
 */

describe('Login Spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('input[placeholder="Email"]').then(($input) => {
      expect(($input[0] as HTMLInputElement).validationMessage).to.eq(
        'Please fill out this field.',
      );
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('test@example.com');
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('input[placeholder="Password"]').then(($input) => {
      expect(($input[0] as HTMLInputElement).validationMessage).to.eq(
        'Please fill out this field.',
      );
    });
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('salah@test.com');
    cy.get('input[placeholder="Password"]').type('salah123');
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    const uniqueSeed = Date.now();
    const email = `test${uniqueSeed}@example.com`;
    const password = 'password123';
    const name = `User${uniqueSeed}`;

    cy.visit('http://localhost:5173/register');

    cy.get('input[placeholder="John Doe"]').type(name);
    cy.get('input[placeholder="john@example.com"]').type(email);
    cy.get('input[placeholder="••••••"]').type(password);

    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.get('button').contains('Go to Login').click();

    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('button[title="Logout"]').should('be.visible');
  });
});
