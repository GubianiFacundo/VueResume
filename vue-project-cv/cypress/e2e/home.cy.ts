describe('Home Page', () => {
  it('should load the home page and display the banner', () => {
    cy.visit('/');
    cy.get('.banner-container').should('exist');
    cy.get('.banner-image').should('be.visible');
  });

  it('should navigate to the About page', () => {
    cy.visit('/');
    cy.get('a[href="/about"]').click();
    cy.url().should('include', '/about');
    cy.get('.about-container').should('exist');
  });
});