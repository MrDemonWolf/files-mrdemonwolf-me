const express = require("express");
const logger = require("morgan");
const consola = require("consola");
const compression = require("compression");
const helmet = require("helmet");
const requestIp = require("request-ip");
const cors = require("cors");

/**
 * Load environment variables from the .env file, where API keys and passwords are stored.
 */
require("dotenv").config();

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration (compression, logging, body-parser,methodoverride)
 */
app.set("host", process.env.IP || "127.0.0.1");
app.set("port", process.env.PORT || 5050);
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

const corsOptions = {
  origin: process.env.FULL_DOMAIN,
};

switch (process.env.NODE_ENV) {
  case "production ":
    app.use(logger("combined"));
    app.use(cors(corsOptions));
    break;
  default:
    app.use(logger("dev"));
}

/**
 * Helmet - security for HTTP headers
 * Learn more at https://helmetjs.github.io/
 */
app.use(helmet());

/**
 * Prod settings
 */
if (!process.env.NODE_ENV === "development") {
  app.enable("trust proxy");
  app.set("trust proxy", 1);
  app.use(compression());
}

/**
 * CSRF
 */
app.use((req, res, next) => {
  if (
    req.path === "/api" ||
    RegExp("/api/.*").test(req.path) ||
    process.env.NODE_ENV === "test"
  ) {
    // Multer multipart/form-data handling needs to occur before the Lusca CSRF check.
    // eslint-disable-next-line no-underscore-dangle
    res.locals._csrf = "";
    next();
  } else {
    lusca.referrerPolicy("same-origin");
    lusca.csrf()(req, res, next);
  }
});

/**
 * Limiters - this is rate limiters per API or other requests.
 */

/**
 * Load middlewares
 */

/**
 * Load vaildation middleware
 */

/**
 * Primary app routes.
 */

/**
 * Handle 404 errors
 */
app.use((req, res, next) => {
  res.status(404);

  if (req.path === "/api" || RegExp("/api/.*").test(req.path)) {
    return res
      .status(404)
      .json({ error: "Whoops, this resource or route could not be found" });
  }
  res.type("txt").send("Not found");
});

/**
 * Express actions
 */

app.listen(app.get("port"), () => {
  // Log infomation after everything is started.
  consola.log("----------------------------------------");
  consola.info(`Environment: ${app.get("env")}`);
  consola.info(`App URL: http://localhost:${app.get("port")}`);
  consola.log("----------------------------------------");
});
