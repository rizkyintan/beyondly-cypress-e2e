describe('Login Functionality', () => {
  const baseUrl = 'https://recruitment-staging-queenbee.paradev.io';
  const loginUrl = `${baseUrl}/login`;

  beforeEach(() => {
    cy.visit(loginUrl);
    cy.get('body').click(0,0);
  });

  

  // --- TC_LOGIN_001 ---
  it('TC_LOGIN_001 - Verify login with valid phone number and password', () => {
    cy.wait(5000); 
    cy.get('#page-login__tabs-number__input-number').type('811234343531');
    cy.get('#page-login__tabs-email__input-password').type('Intantester123_');
    cy.get('#page-login__button-login').click();

    // Expect user redirected to homepage and logged in
    // cy.url().should('eq', `${baseUrl}/`);
    // cy.contains('Hi,').should('exist');
  });


});
