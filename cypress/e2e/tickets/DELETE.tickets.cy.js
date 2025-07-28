describe("DELETE /tickets/{id}", () => {
  it("Deve deletar um ticket com sucesso", () => {
    cy.createUser().then((userId) => {
      cy.createTicket(userId).then((ticketId) => {
        cy.api("DELETE", `/tickets/${ticketId}`)
          .its("status")
          .should("eq", 200);

        cy.api({
          method: "GET",
          url: `/tickets/${ticketId}`,
          failOnStatusCode: false,
        })
          .its("status")
          .should("eq", 404);
      });
    });
  });

  it("Deve retornar 404 ao tentar deletar um ticket inexistente", () => {
    cy.api({
      method: "DELETE",
      url: "/tickets/99999999",
      failOnStatusCode: false,
    })
      .its("status")
      .should("eq", 404);
  });
});
