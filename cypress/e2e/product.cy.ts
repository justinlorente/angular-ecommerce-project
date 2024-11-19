describe('Product Component', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('app-product').should('exist');
  });

  it('it should show the image correctly', () => {
    cy.get('app-product').should('be.visible');
    cy.get('app-product img')
    .should('have.attr', 'src')
  });

  it('it should show the price correctly', () => {
    cy.get('app-product p.text-lg.font-medium').each(($el) => {
      const productPrice = $el.text();
      expect(productPrice).to.match(/^\$\d+(,\d{3})*(\.\d{2})?$/);
    });
  });

  it('it should show the title in uppercase', () => {
    cy.get('app-product h3').each(($el) => {
      const productName = $el.text();

      expect(productName).to.equal(productName.toUpperCase());
    });

    it('should add a product to the cart when "Add to Cart" button is clicked', () => {
        cy.get('button').contains('Add to cart').should('be.visible').click();
        cy.get('.cart-counter').should('contain', '1'); 
        cy.get('button.px-4.relative').click();
        cy.get('.cart-item').should('have.length.at.least', 1);
    });
  });
});
