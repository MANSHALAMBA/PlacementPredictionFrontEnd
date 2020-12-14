export const save = (KEY, VALUE) => {
  try {
    localStorage.setItem(KEY, VALUE);
  } catch (e) {
    throw new Error("Error storing value to storage.");
  }
};

export const saveJSON = (KEY, VALUE) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(VALUE));
  } catch (e) {
    throw new Error("Error storing value to storage.");
  }
};

export const read = KEY => {
  try {
    const value = localStorage.getItem(KEY);
    return value;
  } catch (e) {
    throw new Error("Error reading value from store.");
  }
};

export const readJSON = KEY => {
  try {
    const value = localStorage.getItem(KEY);
    return JSON.parse(value);
  } catch (e) {
    throw new Error("Error reading value from store.");
  }
};

export const remove = KEY => {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {
    throw new Error("Error removing value from store.");
  }
};

const storage = {
  save,
  read,
  remove,
  saveJSON,
  readJSON
};

export default storage;
