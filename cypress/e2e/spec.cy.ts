describe('Login User', () => {
  it('Fills out the login form', () => {
    cy.visit('http://localhost:4200/login')

    cy.get("#exampleInputUsername1").type("testUser")

    cy.get("#exampleInputPassword1").type("1234567")
  })
})