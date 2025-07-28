describe("POST /users", () => {
  it("Deve criar um novo usuário com sucesso", () => {
    const randomId = Date.now();
    const user = {
      name: `User ${randomId}`,
      email: `user.${randomId}@example.com`,
    };

    cy.api("POST", "/users", user).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");
      expect(response.body.id).to.be.a("number");

      cy.api("GET", `/users/${response.body.id}`)
        .its("body.name")
        .should("eq", user.name);
    });
  });

  it("Não deve criar usuário com e-mail duplicado", () => {
    const user = {
      name: "Duplicado",
      email: `duplicado.${Date.now()}@example.com`,
    };

    cy.api({
      method: "POST",
      url: "/users",
      body: user,
      failOnStatusCode: false,
    });
    cy.api({
      method: "POST",
      url: "/users",
      body: user,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(409);
    });
  });

  it("Não deve criar usuário com dados inválidos (e-mail nulo)", () => {
    cy.api({
      method: "POST",
      url: "/users",
      body: { name: "Incompleto" },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
