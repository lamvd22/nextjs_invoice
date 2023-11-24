describe('Navigation', () => {
  it('should navigate to invoice detail page', () => {
    cy.visit('/')

    cy.get('a[href*="invoice/RT3080"]').click()

    cy.url().should('include', '/invoice/RT3080')

    cy.get('h3').contains('RT3080')
  })
})