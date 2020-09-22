require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const usersRoute = require("./routes/users");

const app = express();

// Middle-wares
app.use(morgan("combined"));
app.use(helmet());

// Routes
app.use("/users", usersRoute);

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// Error handles function
app.use((err, req, res, next) => {
  // Response to client
  const error = process.env.ENV === "dev" ? err : {};
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: error.message,
    },
  });

  // Respond to ourselves
  console.error(err);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
