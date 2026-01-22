import { CalendarDate, parseDate } from "@internationalized/date";
import type { Dayjs } from "dayjs";
import type { DateValue } from "@react-types/datepicker";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

// ----------------------------------------------------------------------

export type DatePickerFormat =
  | Dayjs
  | Date
  | string
  | number
  | null
  | undefined;

export const formatPatterns = {
  dateTime: "DD MMM YYYY h:mm a", // 17 Apr 2022 12:00 am
  date: "DD MMM YYYY", // 17 Apr 2022
  time: "h:mm a", // 12:00 am
  split: {
    dateTime: "DD/MM/YYYY h:mm a", // 17/04/2022 12:00 am
    date: "DD/MM/YYYY", // 17/04/2022
  },
  paramCase: {
    dateTime: "DD-MM-YYYY h:mm a", // 17-04-2022 12:00 am
    date: "DD-MM-YYYY", // 17-04-2022
  },
};

const isValidDate = (date: DatePickerFormat) =>
  date !== null && date !== undefined && dayjs(date).isValid();

// ----------------------------------------------------------------------

/**
 * @output 17 Apr 2022 12:00 am
 */
export function fDateTime(date: DatePickerFormat, template?: string): string {
  if (!isValidDate(date)) {
    return "Invalid date";
  }

  return dayjs(date).format(template ?? formatPatterns.dateTime);
}

// ----------------------------------------------------------------------

/**
 * @output 17 Apr 2022
 */
export function fDate(date: DatePickerFormat, template?: string): string {
  if (!isValidDate(date)) {
    return "Invalid date";
  }

  return dayjs(date).format(template ?? formatPatterns.date);
}

// ----------------------------------------------------------------------

/**
 * @output a few seconds, 2 years
 */
export function fToNow(date: DatePickerFormat): string {
  if (!isValidDate(date)) {
    return "Invalid date";
  }

  return dayjs(date).toNow(true);
}


/**
 * Safely converts various date formats to CalendarDate
 * Supports: CalendarDate objects, ISO date strings (YYYY-MM-DD), null/undefined
 */
export function toDateValue(value: any): DateValue | null {
  if (!value) return null;
  
  // Already a DateValue object
  if (value && typeof value === "object" && "year" in value && "month" in value && "day" in value) {
    return value as DateValue;
  }
  
  // Handle string dates (YYYY-MM-DD format)
  if (typeof value === "string") {
    try {
      // Use parseDate for ISO format strings
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return parseDate(value);
      }
      
      // Fallback: manual parsing with validation
      const parts = value.split("-");
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        
        // Validate parsed values
        if (
          !isNaN(year) && 
          !isNaN(month) && 
          !isNaN(day) &&
          year > 0 && 
          month >= 1 && 
          month <= 12 && 
          day >= 1 && 
          day <= 31
        ) {
          return new CalendarDate(year, month, day);
        }
      }
    } catch (error) {
      console.warn(`Failed to parse date string: "${value}"`, error);
      return null;
    }
  }
  
  console.warn(`Unsupported date value format:`, value);
  return null;
}