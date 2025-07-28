import { userSchema } from "../fixtures/schemas/user.schema.js";
import { listUsersSchema } from "../fixtures/schemas/list.users.schema.js";
import { ticketSchema } from "../fixtures/schemas/ticket.schema.js";
import { listTicketsSchema } from "../fixtures/schemas/list.tickets.schema.js";

Cypress.Commands.add("createUser", () => {
  const randomId = Date.now();
  const user = {
    name: `Test User ${randomId}`,
    email: `test.user.${randomId}@example.com`,
  };

  return cy
    .api({
      method: "POST",
      url: "/users",
      body: user,
      failOnStatusCode: false,
    })
    .then((response) => {
      expect(
        response.status,
        "Status da criação de usuário deve ser 201"
      ).to.eq(201);

      return cy.wrap(response.body.id);
    });
});

Cypress.Commands.add("createTicket", (userId) => {
  const ticket = {
    userId: userId,
    description: `Ticket de teste - ${new Date().toISOString()}`,
  };

  return cy
    .api({
      method: "POST",
      url: "/tickets",
      body: ticket,
      failOnStatusCode: false,
    })
    .then((response) => {
      expect(response.status, "Status da criação de ticket deve ser 201").to.eq(
        201
      );
      return cy.wrap(response.body.id);
    });
});

Cypress.Commands.add("validateSchema", (response, schemaName) => {
  const schemas = {
    userSchema,
    listUsersSchema,
    ticketSchema,
    listTicketsSchema,
  };

  const schema = schemas[schemaName];
  if (!schema) {
    throw new Error(
      `Schema '${schemaName}' não encontrado. Verifique o commands.js.`
    );
  }

  cy.log(`Validando schema: ${schemaName}`);
  expect(
    response.body,
    `Corpo da resposta deve corresponder ao schema ${schemaName}`
  ).to.be.jsonSchema(schema);
});
