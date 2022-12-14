const db = require("../db");

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

const createNewTableAndInsert = async () => {
  try {
    await db.schema.createTable("options", function (table) {
      table.increments("id").notNullable();
      table.string("type").notNullable();
      table.string("value");
    });
  } catch (error) {
    console.log("error", error);
  }
};

const insertDefaultOptions = async () => {
  try {
    await db("options").insert([
      { type: "brands", value: "WorkingGirlNG" },
      { type: "brands", value: "ShirtRepublic" },
      { type: "brands", value: "OfficePlug" },
      { type: "brands", value: "OliviersCloset" },
      { type: "brands", value: "Stylestation" },
      { type: "brands", value: "Denimsng" },
      { type: "brands", value: "KhadeejahNG" },
      { type: "brands", value: "SKactive" },
      { type: "prodManagers", value: "Aighangbe Tina" },
      { type: "prodManagers", value: "Ogoh mercy chiwendu" },
      { type: "prodManagers", value: "Joseph Agnes" },
      { type: "prodManagers", value: "Ekine Kehinde" },
      { type: "prodManagers", value: "Adebimpe" },
      { type: "prodManagers", value: "Ajimoti Tunde" },
      { type: "smManagers", value: "Adebimpe Aderemi" },
      { type: "smManagers", value: "Onabanjo Azeezat Olamide" },
      { type: "smManagers", value: "Vincent Theophilus" },
      { type: "smManagers", value: "Helen Idokoe" },
      { type: "smManagers", value: "Ajimoti Tunde" },
      { type: "items", value: "Dress" },
      { type: "items", value: "Top" },
      { type: "items", value: "Skirt" },
      { type: "items", value: "Pants" },
      { type: "items", value: "Shorts" },
      { type: "items", value: "Blazers" },
      { type: "items", value: "Abaya" },
      { type: "items", value: "Blazer and Pant" },
      { type: "items", value: "Blazer and Skirt" },
      { type: "items", value: "Top and Pant" },
      { type: "items", value: "Top and Skirt" },
      { type: "itemsCost", value: "5000" },
      { type: "itemsCost", value: "6000" },
      { type: "itemsCost", value: "7000" },
      { type: "itemsCost", value: "7500" },
      { type: "itemsCost", value: "7800" },
      { type: "itemsCost", value: "8000" },
      { type: "itemsCost", value: "9000" },
      { type: "itemsCost", value: "10000" },
      { type: "itemsCost", value: "11000" },
      { type: "itemsCost", value: "12000" },
      { type: "itemsCost", value: "13000" },
      { type: "itemsCost", value: "14000" },
      { type: "itemsCost", value: "15000" },
      { type: "itemsCost", value: "16000" },
      { type: "itemsCost", value: "17000" },
      { type: "itemsCost", value: "18000" },
      { type: "itemsCost", value: "19000" },
      { type: "itemsCost", value: "20000" },
      { type: "itemsCost", value: "21000" },
      { type: "itemsCost", value: "22000" },
      { type: "itemsCost", value: "23000" },
      { type: "itemsCost", value: "24000" },
      { type: "itemsCost", value: "25000" },
      { type: "itemsCost", value: "26000" },
      { type: "itemsCost", value: "27000" },
      { type: "itemsCost", value: "28000" },
      { type: "itemsCost", value: "29000" },
      { type: "itemsCost", value: "30000" },
      { type: "cutters", value: "Jhonson" },
      { type: "cutters", value: "Friday" },
      { type: "cutters", value: "Sarah" },
      { type: "cutters", value: "Michael" },
      { type: "stitchers", value: "Ibrahim" },
      { type: "stitchers", value: "Usman" },
      { type: "stitchers", value: "Abdul-Rahmon" },
      { type: "stitchers", value: "Precious" },
      { type: "stitchers", value: "Yinka" },
      { type: "stitchers", value: "Olokodana" },
      { type: "stitchers", value: "Anu" },
      { type: "stitchers", value: "Iseoluwa" },
      { type: "stitchers", value: "Michael" },
      { type: "stitchers", value: "Janet" },
      { type: "stitchers", value: "Suliyat" },
      { type: "stitchers", value: "Kehinde" },
      { type: "stitchers", value: "George" },
      { type: "stitchers", value: "Elizabeth" },
      { type: "stitchers", value: "Shade" },
      { type: "stitchers", value: "Opeyemi Girl" },
      { type: "stitchers", value: "Imole" },
      { type: "stitchers", value: "Matthew" },
      { type: "stitchers", value: "Eniola" },
      { type: "stitchers", value: "Yetunde" },
      { type: "stitchers", value: "Ahmed" },
      { type: "stitchers", value: "Hawawu" },
      { type: "stitchers", value: "Hannah" },
      { type: "stitchers", value: "Mrs Nancy" },
      { type: "stitchers", value: "Ramota" },
      { type: "stitchers", value: "Deborah" },
      { type: "stitchers", value: "Barakat" },
      { type: "stitchers", value: "Mary" },
      { type: "stitchers", value: "Fatimoh" },
      { type: "stitchers", value: "Fatiu" },
      { type: "stitchers", value: "Wumi2" },
      { type: "stitchers", value: "Wole" },
      { type: "stitchers", value: "Funmi" },
      { type: "stitchers", value: "Abosede" },
      { type: "stitchers", value: "Toyin" },
      { type: "stitchers", value: "Opeyemi Boy" },
      { type: "stitchers", value: "Ganiyat" },
      { type: "stitchers", value: "Folashade" },
      { type: "cutCost", value: "100" },
      { type: "cutCost", value: "150" },
      { type: "cutCost", value: "200" },
      { type: "cutCost", value: "250" },
      { type: "tailoringFee", value: "400" },
      { type: "tailoringFee", value: "500" },
      { type: "tailoringFee", value: "600" },
      { type: "tailoringFee", value: "700" },
      { type: "tailoringFee", value: "800" },
      { type: "tailoringFee", value: "900" },
      { type: "tailoringFee", value: "1000" },
      { type: "tailoringFee", value: "1200" },
      { type: "tailoringFee", value: "1500" },
      { type: "tailoringFee", value: "2000" },
      { type: "tailoringFee", value: "2500" },
      { type: "tailoringFee", value: "3000" }
    ]);
  } catch (error) {
    console.log("error", error);
  }
};
