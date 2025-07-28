describe("GET /users", () => {
  it("Deve listar todos os usuários e validar o schema da lista", () => {
    cy.api("GET", "/users").then((response) => {
      expect(response.status).to.eq(200);
      cy.validateSchema(response, "listUsersSchema");
    });
  });
  it("Deve buscar um usuário por ID e validar seu schema", () => {
    cy.createUser().then((userId) => {
      cy.api("GET", `/users/${userId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id", userId);
        cy.validateSchema(response, "userSchema");
      });
    });
  });

  it("Deve retornar 404 ao buscar um usuário com ID inexistente", () => {
    cy.api({
      method: "GET",
      url: "/users/99999999",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
