import { openDB } from "idb";

const DB_NAME = "cocktailDB";
const DB_VERSION = 2;
const STORE_NAME = "favorites";

// Open or upgrade the database
export const openDatabase = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

// Save a drink
export const saveDrink = async (drink) => {
  // Check if idDrink exists
  if (!drink.id) {
    console.error("Missing idDrink:", drink);
    return; // Don't save the drink if id is missing
  }

  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  
  const fullDrink = {
    id: drink.id,  // Ensure this is set correctly
    name: drink.name,
    image: drink.image,
    category: drink.category || "Unknown",
    glass: drink.glass || "Unknown",
    alcoholic: drink.alcoholic || "Unknown",
    instructions: drink.instructions || "No instructions available",
    ingredients: drink.ingredients || "No ingredients available",
  };

  store.put(fullDrink);  // Store the drink in the object store
  await tx.done;  // Wait for transaction to finish
};

// Get all saved drinks
export const getAllDrinks = async () => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const drinks = await store.getAll();
  return drinks;
};


// Delete a drink
export const deleteDrink = async (id) => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.delete(id);
  await tx.done;
};
