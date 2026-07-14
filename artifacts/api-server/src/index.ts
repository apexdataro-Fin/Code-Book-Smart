import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// P1 fix: validate DATABASE_URL before the server starts listening.
// Without this, @workspace/db would fail later inside a request handler
// with a less actionable error. We check as early as possible given that
// ES module imports run before the module body; if @workspace/db ever
// adds an import-time DB connection, move this into a dedicated
// `validate-env.ts` module and import it FIRST.
const databaseUrl = process.env["DATABASE_URL"];
if (!databaseUrl || databaseUrl.trim().length === 0) {
  throw new Error(
    "DATABASE_URL environment variable is required but was not provided. " +
      "Set it to a Postgres connection string before starting the api-server.",
  );
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
