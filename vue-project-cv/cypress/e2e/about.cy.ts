describe('About Page', () => {
  const mockBackground = [
    { id: 1, name: 'Education 1', category: 'Education', description: 'Description 1', fromdate: '2020-01-01', todate: '2022-01-01' },
  ];
  const mockJobs = [
    { id: 2, name: 'Job 1', category: 'Job', description: 'Description 2', fromdate: '2018-01-01', todate: '2020-01-01' },
  ];
  const mockDegrees = [
    { id: 3, name: 'Course 1', category: 'Course', description: 'Description 3', fromdate: '2019-01-01', todate: '2021-01-01' },
  ];

  const mockResources = [...mockBackground, ...mockJobs, ...mockDegrees];

  beforeEach(() => {  
    cy.intercept('GET', 'http://localhost:3000/resources', {
      statusCode: 200,
      body: mockResources,
    }).as('getResources');

    cy.visit('/about');
  });

  it('should load the About page and display all sections', () => {
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
    cy.wait('@getResources');

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