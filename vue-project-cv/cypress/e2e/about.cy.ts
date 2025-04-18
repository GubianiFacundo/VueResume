describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('should load the About page and display all sections', () => {
    cy.visit('/about');

    cy.get('.about-container').should('exist');

    cy.get('.about-me-section').should('exist');
    cy.get('.about-me-section .section-title').should('contain.text', 'About Me');
    cy.get('.about-me-section h2').should('contain.text', '');
    cy.get('.about-me-section h3').should('contain.text', '');

    cy.get('.background-section').should('exist');
    cy.get('.experience-section').should('exist');
    cy.get('.degrees-section').should('exist');
    cy.get('.navigation').should('exist');
  });

  it('should render InfoSection components with correct data', () => {
    cy.intercept('/api/resources').as('getResources');

    cy.reload();

    cy.get('.background-section').within(() => {
      cy.get('h2').should('contain.text', 'Academic Background');
    });

    cy.get('.experience-section').within(() => {
      cy.get('h2').should('contain.text', 'Work Experience');
    });

    cy.get('.degrees-section').within(() => {
      cy.get('h2').should('contain.text', 'Certificates / Courses / Degrees');
    });
  });

  it('should navigate to the Skills page when the navigation button is clicked', () => {
    cy.get('.navigation button').click();
    cy.url().should('include', '/skills');
    cy.get('.skills-container').should('exist');
  });
});