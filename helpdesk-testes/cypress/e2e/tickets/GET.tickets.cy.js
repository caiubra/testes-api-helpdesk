describe("GET /tickets", () => {
  it("Deve buscar um ticket por ID e validar seu schema", () => {
    cy.createUser().then((userId) => {
      cy.createTicket(userId).then((ticketId) => {
        cy.api("GET", `/tickets/${ticketId}`).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("id", ticketId);
          cy.validateSchema(response, "ticketSchema");
        });
      });
    });
  });

  it("Deve retornar 404 ao buscar um ticket inexistente", () => {
    cy.api({ method: "GET", url: "/tickets/99999999", failOnStatusCode: false })
      .its("status")
      .should("eq", 404);
  });
});
