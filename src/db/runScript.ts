import fs from "fs";
import path from "path";
import db from "./db";

export const executeSqlScript = async (fileName: string) => {
  try {
    const filePath = path.join(process.cwd(), fileName);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ El archivo SQL no existe en la ruta: ${filePath}`);
      return;
    }

    const sql = fs.readFileSync(filePath, "utf8");

    console.log(`⏳ Ejecutando script: ${fileName}...`);

    await db.query(sql);

    console.log("✅ Script ejecutado y base de datos poblada con éxito.");
  } catch (error) {
    console.error("❌ Error al ejecutar el archivo SQL:", error);
    throw error;
  }
};
