describe('Projects Page', () => {
  const mockProjects = [
    { id: 1, name: 'Project 1', description: { en: 'Description 1' }, data: { en: 'Data 1'} },
    { id: 2, name: 'Project 2', description: { en: 'Description 2' }, data: { en: 'Data 2'} },
  ];

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/projects', {
      statusCode: 200,
      body: mockProjects,
    }).as('getProjects');

    cy.visit('/projects');
  });

  it('should load the Projects page and display all sections', () => {
    cy.get('.projects-container').should('exist');
    cy.get('.projects-title').should('exist').and('contain.text', 'My Projects');
    cy.get('.projects-list').should('exist');
  });

  it('should render ProjectComponent components with correct data', () => {
    cy.wait('@getProjects');

    cy.get('.project-component').should('have.length', mockProjects.length);
    cy.get('.project-component').eq(0).within(() => {
      cy.get('.project-name').should('contain.text', 'Project 1');
      cy.get('.project-description').should('contain.text', 'Description 1');
      cy.get('.project-data').should('contain.text', 'Data 1');
    });
  });

  it('should navigate to the Contact page when the navigation button is clicked', () => {
    cy.get('.project-navigation button').click();
    cy.url().should('include', '/contact');
    cy.get('.contact-container').should('exist');
  });
});