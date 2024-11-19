describe('Header Component', () => {
  beforeEach(() => {
      cy.visit('/');
  });

  it('should display logo, links, and shopping cart on large screens', () => {
      cy.viewport(1024, 768);

      cy.get('a.flex.items-center').should('be.visible');
      
      cy.get('a.block.underline.hover\\:underline').should('have.length.at.least', 1).each((link) => {
          cy.wrap(link).should('be.visible');
      });

      cy.get('button.px-4.relative').should('be.visible');
  });

  it('should display the mobile menu when toggled', () => {


      cy.get('button[aria-controls="navbar-default"]').should('be.visible').click();
      
      cy.get('a.block.underline.hover\\:underline').should('have.length.at.least', 1).each((link) => {
          cy.wrap(link).should('be.visible');
      });
  });
});
