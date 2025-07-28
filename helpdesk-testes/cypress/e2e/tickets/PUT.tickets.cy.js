describe("PUT /tickets/{id}", () => {
  it("Deve atualizar o status de um ticket com sucesso", () => {
    cy.createUser().then((userId) => {
      cy.createTicket(userId).then((ticketId) => {
        const newStatus = { status: "In Progress" };

        cy.api("PUT", `/tickets/${ticketId}/status`, newStatus)
          .its("status")
          .should("eq", 200);

        cy.api("GET", `/tickets/${ticketId}`)
          .its("body.status")
          .should("eq", newStatus.status);
      });
    });
  });

  it("Deve retornar 404 ao tentar atualizar um ticket inexistente", () => {
    cy.api({
      method: "PUT",
      url: "/tickets/99999999/status",
      body: { status: "Closed" },
      failOnStatusCode: false,
    })
      .its("status")
      .should("eq", 404);
  });
});
