import "./commands.js";
import "cypress-mochawesome-reporter/register";
import "cypress-plugin-api";
import chaiJsonSchema from "chai-json-schema";
chai.use(chaiJsonSchema);
