/**
 * Returns the uppercase alphabet string for a given language.
 * Default is English (A-Z).
 * 
 * @param {string} language - The language name (e.g., 'english', 'spanish').
 * @returns {string} The alphabet string.
 */
function getAlphabet(language) {
  const lang = (language || "english").toLowerCase();
  
  switch (lang) {
    case "spanish":
    case "es":
      // Standard Spanish alphabet contains Ñ. 
      // Accented vowels (ÁÉÍÓÚ) are often treated as distinct tiles in games.
      return "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ";
    case "german":
    case "de":
      return "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜß";
    case "french":
    case "fr":
      return "ABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÆÇÈÉÊËÎÏÔŒÙÛÜŸ";
    case "english":
    case "en":
    default:
      return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
}

module.exports = { getAlphabet };
