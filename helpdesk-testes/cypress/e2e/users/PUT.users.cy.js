describe("PUT /users/{id}", () => {
  it("Deve atualizar um usuário com sucesso", () => {
    cy.createUser().then((userId) => {
      const updatedData = {
        name: "Nome Atualizado",
        email: `updated.${Date.now()}@example.com`,
      };
      cy.api("PUT", `/users/${userId}`, updatedData).then((response) => {
        expect(response.status).to.eq(200);

        cy.api("GET", `/users/${userId}`)
          .its("body.name")
          .should("eq", updatedData.name);
      });
    });
  });

  it("Deve retornar 404 ao tentar atualizar um usuário inexistente", () => {
    cy.api({
      method: "PUT",
      url: "/users/99999999",
      body: { name: "Fantasma" },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
