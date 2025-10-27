export const capitalizeFirstLetter = (str) => {
  if (typeof str !== "string" || str.length === 0) {
    return str; // Handle empty or non-string inputs
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const removeControlCharacters = (text) => {
  // The regular expression /[\\r\\n\\f]/g matches all occurrences of
  // carriage return, newline, or form feed characters globally (g flag).
  return text.replace(/[\\r\\n\\f]/g, "");
};
