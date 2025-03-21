import "./api";
import "./services/tx-listener";
import "./services/fund-metrics";
// TODO move non active services to different folder

if (!process.env.NODE_ENV) {
  throw new Error("NODE_ENV is not set");
}

// Start the server
console.log("Starting server...");
