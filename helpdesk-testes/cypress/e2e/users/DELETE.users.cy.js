describe("DELETE /users/{id}", () => {
  it("Deve deletar um usuário com sucesso", () => {
    cy.createUser().then((userId) => {
      cy.api("DELETE", `/users/${userId}`).its("status").should("eq", 200);

      cy.api({
        method: "GET",
        url: `/users/${userId}`,
        failOnStatusCode: false,
      })
        .its("status")
        .should("eq", 404);
    });
  });

  it("Deve retornar 404 ao tentar deletar um usuário inexistente", () => {
    cy.api({
      method: "DELETE",
      url: "/users/99999999",
      failOnStatusCode: false,
    })
      .its("status")
      .should("eq", 404);
  });
});
