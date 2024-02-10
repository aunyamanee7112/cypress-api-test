
describe('Test Logout', () => { 

    beforeEach("login to App" , () => {
        cy.loginToPage()
    })

    it("verify user can logout successfully", () => {
        cy.contains("Settings").click()
        cy.get('.btn .btn-outline-danger').click()
        cy.get("nav").should("contain","Sign up")
    })
 })