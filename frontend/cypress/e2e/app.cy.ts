describe('Inventario DDJW - Prueba E2E base', () => {
  it('Debe cargar la aplicación correctamente', () => {
    cy.visit('/');

    cy.get('body').should('be.visible');

    cy.location('pathname').should((pathname) => {
      expect(pathname).to.be.a('string');
    });
  });
});