// Validar letras incluyendo tildes y caracteres especiales
export const validateLetters = (value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value);

// Validar solo números
export const validateNumbers = (value) => /^[0-9]*$/.test(value);

// Validar letras sin números
export const validateLettersWithoutNumbers = (value) => /^[^\d]*$/.test(value);

// Validar letras incluyendo tildes, caracteres especiales y signos de puntuación
export const validateLettersWithPunctuationMarks = (value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;:!?¿¡'"-]*$/.test(value);

