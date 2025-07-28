export const ticketSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    userId: { type: "integer" },
    description: { type: "string" },
    status: { type: "string", enum: ["Open", "In Progress", "Closed"] },
  },
  required: ["id", "userId", "description", "status"],
};
