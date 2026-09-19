import type { Language } from "@/lib/translations";

type ValidationKey =
  | "nameMin"
  | "priceMin"
  | "stockNonNegative"
  | "thresholdNonNegative"
  | "imageUrl"
  | "passwordRequired"
  | "passwordMin";

const messages: Record<Language, Record<ValidationKey, string>> = {
  en: {
    nameMin: "Name must be at least 2 characters.",
    priceMin: "Price must be at least 0.",
    stockNonNegative: "Stock cannot be negative.",
    thresholdNonNegative: "Threshold cannot be negative.",
    imageUrl: "Enter a valid image URL.",
    passwordRequired: "Password is required.",
    passwordMin: "Password must be at least 6 characters.",
  },
  ro: {
    nameMin: "Numele trebuie să aibă cel puțin 2 caractere.",
    priceMin: "Prețul trebuie să fie cel puțin 0.",
    stockNonNegative: "Stocul nu poate fi negativ.",
    thresholdNonNegative: "Pragul nu poate fi negativ.",
    imageUrl: "Introdu un URL valid pentru imagine.",
    passwordRequired: "Parola este obligatorie.",
    passwordMin: "Parola trebuie să aibă cel puțin 6 caractere.",
  },
};

export function validationMessage(language: Language, key: ValidationKey): string {
  return messages[language][key];
}

export function localizedSchemaMessage(language: Language, message?: string): string | undefined {
  if (!message) return undefined;

  if (message.includes("Name must be at least 2")) {
    return validationMessage(language, "nameMin");
  }
  if (message.includes("Price must be at least 0")) {
    return validationMessage(language, "priceMin");
  }
  if (message.includes("Stock cannot be negative")) {
    return validationMessage(language, "stockNonNegative");
  }
  if (message.includes("Threshold cannot be negative")) {
    return validationMessage(language, "thresholdNonNegative");
  }
  if (message.includes("Invalid url")) {
    return validationMessage(language, "imageUrl");
  }

  return message;
}
