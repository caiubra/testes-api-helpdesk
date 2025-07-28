describe("POST /tickets", () => {
  it("Deve criar um novo ticket com sucesso", () => {
    cy.createUser().then((userId) => {
      const ticket = { userId, description: "Problema na impressora" };
      cy.api("POST", "/tickets", ticket).then((response) => {
        expect(response.status).to.eq(201);

        expect(response.body).to.have.property("id");
      });
    });
  });

  it("Não deve criar ticket com dados inválidos (sem descrição)", () => {
    cy.createUser().then((userId) => {
      cy.api({
        method: "POST",
        url: "/tickets",
        body: { userId },
        failOnStatusCode: false,
      })
        .its("status")
        .should("eq", 400);
    });
  });
});
