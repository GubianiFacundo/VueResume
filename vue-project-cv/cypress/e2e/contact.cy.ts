describe('Contact Page', () => {
  const devName = 'Facundo Gubiani';
  const devEmail = 'gubiani.facundo@gmail.com';
  const devLinkedin = 'https://www.linkedin.com/in/facundo-gubiani/';
  const devGithub = 'https://github.com/GubianiFacundo';

  const description = `I'm always open to new opportunities and collaborations. If you would like to get in touch, feel free to reach out via the following methods`;

  beforeEach(() => {
    cy.visit('/contact');
  });

  it('should load the Contact page and display all sections', () => {
    cy.get('.contact-container').should('exist');

    cy.get('.contact-header').should('exist');
    cy.get('.section-title').should('contain.text', 'Contact Me');
    cy.get('.contact-description').should('contain.text', description);

    cy.get('.contact-methods').should('exist');
    cy.get('.contact-box').should('have.length', 3);
  });

  it('should render the email contact method correctly', () => {
    cy.get('.contact-box').eq(0).within(() => {
      cy.get('h2').should('contain.text', 'Email');
      cy.get('a').should('have.attr', 'href', 'mailto:gubiani.facundo@gmail.com');
      cy.get('a').should('contain.text', 'gubiani.facundo@gmail.com');
    });
  });

  it('should render the LinkedIn contact method correctly', () => {
    cy.get('.contact-box').eq(1).within(() => {
      cy.get('h2').should('contain.text', 'LinkedIn');
      cy.get('a').should('have.attr', 'href', `${devLinkedin}`);
      cy.get('a').should('have.attr', 'target', '_blank');
      cy.get('a').should('contain.text', devName);
    });
  });

  it('should render the GitHub contact method correctly', () => {
    cy.get('.contact-box').eq(2).within(() => {
      cy.get('h2').should('contain.text', 'GitHub');
      cy.get('a').should('have.attr', 'href', `${devGithub}`);
      cy.get('a').should('have.attr', 'target', '_blank');
      cy.get('a').should('contain.text', devName);
    });
  });

  it('should navigate to the correct links when clicked', () => {
    cy.get('.contact-box').eq(0).within(() => {
      cy.get('a').should('have.attr', 'href', `mailto:${devEmail}`);
    });

    cy.get('.contact-box').eq(1).within(() => {
      cy.get('a').should('have.attr', 'href', `${devLinkedin}`);
    });

    cy.get('.contact-box').eq(2).within(() => {
      cy.get('a').should('have.attr', 'href', `${devGithub}`);
    });
  });
});