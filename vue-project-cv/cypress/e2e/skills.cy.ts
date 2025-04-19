describe('Skills Page', () => {
  const mockSkills = [
    { id: 1, name: 'Skill 1', type: 'Frontend Skills', icon: 'mdi-vuejs', link: null },
    { id: 2, name: 'Skill 2', type: 'Backend Skills', icon: null, link: 'https://example.com/skill2.png' },
    { id: 3, name: 'Skill 3', type: 'Frontend Skills', icon: 'mdi-react', link: null },
  ];

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/skills', {
      statusCode: 200,
      body: mockSkills,
    }).as('getSkills');

    cy.visit('/skills');
  });

  it('should load the Skills page and display all sections', () => {
    cy.get('.skills-container').should('exist');
    cy.get('.skills-title').should('exist').and('contain.text', 'Skills');
    cy.get('.skills-groups-grid').should('exist');
  });

  it('should render skill groups with correct data', () => {
    cy.wait('@getSkills');
    cy.get('.skills-groups-grid .boxSection').should('have.length', 10);

    cy.get('.skills-groups-grid .boxSection').eq(0).within(() => {
      cy.get('h2').should('contain.text', 'Frontend Skills');
      cy.get('.skills-grid .skill-box').should('have.length', 2);
    });
  });

  it('should render skills with correct icons or images', () => {
    cy.wait('@getSkills');
    cy.get('.skills-grid .skill-box').eq(0).within(() => {
      cy.get('.skill-icon').should('have.class', 'mdi-vuejs');
      cy.get('.skill-image').should('not.exist');
    });
  });

  it('should navigate to the Projects page when the navigation button is clicked', () => {
    cy.get('.skill-navigation button').click();
    cy.url().should('include', '/projects');
    cy.get('.projects-container').should('exist');
  });
});