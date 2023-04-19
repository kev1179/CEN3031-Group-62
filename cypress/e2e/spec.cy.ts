describe('goes from about to login page', () => {
  it("goes from home page to login page", () => {
    cy.visit("http://localhost:4200/about")
    cy.get("#logPage").click()
  })
})

describe('Login User', () => {
  it('Fills out the login form', () => {
    cy.visit('http://localhost:4200/login')

    cy.get("#userN").type("testUser")
    cy.get("#pass").type("1234567")
    cy.get("#login").click()
  })
})

describe ('Register User', () => {
    it('Fills out user-registrstion from', () => {
      
      cy.visit('http://localhost:4200/user-registration')

      cy.get("#fName").type("John")
      cy.get("#lName").type("Smith")
      cy.get("#userN").type("JohnSmith123")
      cy.get("#email").type("johnsmith@gmail.com")
      cy.get("#pass").type("1234567")
      cy.get("#register").click()
  })
})

describe ('searches for restaurants on map' , () => {
  it('find restaurants on map', () => {
    cy.visit("http://localhost:4200/restaurantFinder")

    
  })
})

describe('looks at recipes', () => {
  it("looks at select recipes", () => {
    cy.visit("http://localhost:4200/recipes")
  })
})