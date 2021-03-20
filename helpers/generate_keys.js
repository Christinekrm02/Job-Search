const crypto = require("crypto");

const secret_key = crypto.randomBytes(32).toString("hex");
const secret_key_refresh = crypto.randomBytes(32).toString("hex");
console.table({ secret_key, secret_key_refresh });
