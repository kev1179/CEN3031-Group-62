describe('Login User', () => {
  it('Fills out the login form', () => {
    cy.visit('http://localhost:4200/login')

    cy.get("#userN").type("testUser")

    cy.get("#pass").type("1234567")
  })
})