
import { Sequelize } from "sequelize";
import { sequelize } from "./models/db.js";
import { User } from "./models/userModel.js";
import { Product } from "./models/Product.js";
import inquirer from "inquirer";

const DB_PASSWORD = "$@*wuorna3930n^&*@#@$%!@^$^4f402W4J872346HT0W0#@$%$%#^9hr0JHN409hr0$%%#$$0R38";
const rootSequelize = new Sequelize("", "root", DB_PASSWORD, {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

const { createDb } = await inquirer.prompt([
  {
    type: "confirm",
    name: "createDb",
    message: "Database 'XianFire-Flores' may not exist. Create it?",
    default: true,
  },
]);

if (createDb) {
  try {
    await rootSequelize.query("CREATE DATABASE IF NOT EXISTS `XianFire-Flores`;");
    console.log("✅ Database created (if it did not exist)");
  } catch (err) {
    console.warn("⚠️  Could not create database as root (continuing, it may already exist):", err.message);
  } finally {
    await rootSequelize.close();
  }
}

try {
  await sequelize.authenticate();
  console.log("✅ Connected to MySQL database!");
  await sequelize.sync({ force: true });
  console.log("✅ Tables created for all models!");
} catch (err) {
  console.error("❌ Migration failed:", err);
} finally {
  process.exit();
}
