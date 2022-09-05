// create tables
const createTable = async () => {
  try {
    await db.schema.createTable("users", function (table) {
      table.increments("id").notNullable();
      table.string("username").notNullable();
      table.string("password");
      table.string("role");
      table.timestamps("create_at");
    });

    await db.schema.createTable("orders", function (table) {
      table.increments("id").notNullable();
      table.string("customer_name").notNullable();
      table.string("country");
      table.string("state");
      table.string("city");
      table.string("address");
      table.string("phone_number");
      table.string("email");
      table.string("brand");
      table.string("production_manager");
      table.string("sm_manager");
      table.specificType("items", "JSONB[]");
      table.string("uploader");
      table.timestamps("create_at");
    });
  } catch (error) {
    console.log("error", error);
  }
};

createTable();
