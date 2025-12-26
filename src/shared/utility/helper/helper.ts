import { OrderStatus } from "../enum/enums";
import type { IAddress } from "../model/model";

export const setIntoLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item:", error);
  }
};

export const getFromLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting item:", error);
    return null;
  }
};

export const removeFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

export const getGretting = () => {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12) {
    return "Good Morning!";
  } else if (hours >= 12 && hours < 17) {
    return "Good Afternoon!";
  } else {
    return "Good Evening!";
  }
};

export const getAddressString = (address: IAddress) => {
  return `${address.addressLine1}, ${
    address.addressLine2 ? address.addressLine2 + ", " : null
  }${address.city} - ${address.pincode}`;
};

export function getFormatedDate(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata", // adjust to your timezone
  };

  const time = date.toLocaleTimeString("en-GB", options);
  const day = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

  return `${time} | ${day}`;
}

export function getInitials(fullName: string): string {
  const nameParts = fullName.trim().split(/\s+/); // Split by spaces, handling extra spaces

  const firstNameInitial = nameParts[0]?.charAt(0).toUpperCase(); // First letter of the first name
  const lastNameInitial = nameParts[nameParts.length - 1]
    ?.charAt(0)
    .toUpperCase(); // First letter of the last name

  if (firstNameInitial && lastNameInitial) {
    return `${firstNameInitial}${lastNameInitial}`; // Combine initials
  }

  return ""; // Return empty if there's no valid name
}

export const getStatusColor = (statusId: number) => {
  if (
    statusId === OrderStatus.CANCELLED ||
    statusId === OrderStatus.REJECTED ||
    statusId === OrderStatus.FAILED
  ) {
    return "red";
  } else if (
    statusId === OrderStatus.PREPARING ||
    statusId === OrderStatus.READY_FOR_PICKUP ||
    statusId === OrderStatus.OUT_FOR_DELIVERY
  ) {
    return "yellow";
  } else if (statusId === OrderStatus.DELIVERED) {
    return "green";
  } else {
    return "blue";
  }
};

/**
 * billionaire-ready formatter
 * @param amount - The value (can be Number, BigInt, or numeric string)
 */
export const formatAmount = (
  amount: number | bigint | string,
  minFrac = 0,
  maxFrac = 3
) => {
  // Convert strings to BigInt or Number to prevent precision loss during input
  const value = typeof amount === "string" ? BigInt(amount) : amount;
  const absValue =
    typeof value === "bigint" ? (value < 0n ? -value : value) : Math.abs(value);

  // Threshold: 1 Lakh (100,000)
  const isLarge =
    typeof value === "bigint" ? absValue >= 100000n : absValue >= 100000;

  const options: Intl.NumberFormatOptions = isLarge
    ? {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: maxFrac,
        useGrouping: true,
      }
    : {
        minimumFractionDigits: minFrac,
        maximumFractionDigits: maxFrac,
        useGrouping: true,
        // 2025 standard: explicitly set rounding for financial accuracy
        // roundingMode: "halfExpand",
      };

  return new Intl.NumberFormat("en-IN", options).format(value as number);
};

const rtf = new Intl.RelativeTimeFormat(undefined, {
  numeric: "auto",
});

export function formatUtcToRelativeTime(dateInput: string | Date): string {
  if (!dateInput) return "";

  // DateTimeOffset string parses correctly here
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const diffMs = date.getTime() - Date.now();
  const diffSeconds = Math.round(diffMs / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);

  if (Math.abs(diffSeconds) < 30) return "Just now";

  if (Math.abs(diffMinutes) < 60) return rtf.format(diffMinutes, "minute");

  if (Math.abs(diffHours) < 24) return rtf.format(diffHours, "hour");

  if (Math.abs(diffDays) < 7) return rtf.format(diffDays, "day");

  // fallback to absolute local date
  return formatUtcToLocal(date);
}

export function formatUtcToLocal(dateInput: string | Date): string {
  if (!dateInput) return "";

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}
