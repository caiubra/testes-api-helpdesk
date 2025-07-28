import { ticketSchema } from "./ticket.schema";

export const listTicketsSchema = {
  type: "array",
  items: ticketSchema,
};
