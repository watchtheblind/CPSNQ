import Database from "@tauri-apps/plugin-sql";

async function setupDatabase() {
  const db = await Database.load("sqlite:CPSNQDB.db");
  await db.execute(`

CREATE INDEX idx_patient_id ON Surgeries(patient_id);
CREATE INDEX idx_medic_id ON Surgeries(medic_id);
CREATE INDEX idx_surgery_id ON SurgicalNotes(surgery_id);

CREATE TABLE IF NOT EXISTS Medics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    second_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    second_last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    ID_document TEXT NOT NULL,
    password TEXT NOT NULL,
    CHECK(length(name) <= 50),
    CHECK(length(second_name) <= 50),
    CHECK(length(last_name) <= 50),
    CHECK(length(second_last_name) <= 50),
    CHECK(length(email) <= 100),
    CHECK(length(phone) <= 15),
    CHECK(length(ID_document) <= 20),
    CHECK(length(password) <= 100)
);

CREATE TABLE IF NOT EXISTS Patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    second_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    second_last_name TEXT NOT NULL,
    op_note_number INTEGER NOT NULL,
    birth_day DATE NOT NULL,
    gender TEXT CHECK(gender IN ('Masculino', 'Femenino')) NOT NULL,
    diagnosis TEXT NOT NULL,
    status TEXT CHECK(status IN ('Vivo', 'Fallecido')) NOT NULL,
    CHECK(length(name) <= 50),
    CHECK(length(second_name) <= 50),
    CHECK(length(last_name) <= 50),
    CHECK(length(second_last_name) <= 50),
    CHECK(length(diagnosis) <= 255)
);

CREATE TABLE IF NOT EXISTS Surgeries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    medic_id INTEGER NOT NULL,
    employed_tecniques TEXT NOT NULL,
    pathologic_diagnosis TEXT NOT NULL,
    surgical_procedures TEXT NOT NULL,
    surgery_datetime DATETIME NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES Patients(id),
    FOREIGN KEY (medic_id) REFERENCES Medics(id),
    CHECK(length(employed_tecniques) <= 255),
    CHECK(length(pathologic_diagnosis) <= 255),
    CHECK(length(surgical_procedures) <= 255)
);

CREATE TABLE IF NOT EXISTS SurgicalNotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    surgery_id INTEGER NOT NULL,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (surgery_id) REFERENCES Surgeries(id),
    CHECK(length(description) <= 1000)
);
`);

  console.log("Base de datos y tabla creadas exitosamente");
}

// async function insertUser(nombre: string, email: string) {
//   const db = await Database.load("sqlite:CPSNQDB.db");
//   await db.execute(
//     `
//         INSERT INTO usuarios (nombre, email) VALUES (?, ?)
//     `,
//     [nombre, email]
//   );
//   console.log("Usuario insertado exitosamente");
// }

// Llamar a las funciones
setupDatabase()
  .then(() => {
    null;
    // insertUser("Juan Pérez", "juan@example.com").catch(console.error);
  })
  .catch(console.error);
