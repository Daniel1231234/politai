import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistance } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toPusherKey(key: string) {
  return key.replace(/:/g, "__")
}

export function hrefContructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort()
  return `${sortedIds[0]}--${sortedIds[1]}`
}

export const getInitialTopics = () => {
  let headlines = [
    "General",
    "Flag_March",
    "Gaza_Protests",
    "Jerusalem_Shutdown",
    "Haifa_Homes",
    "Hebrew_Bible",
    "Flag_Day",
    "UN_Suspension",
    "Judicial_Overhaul",
    "Gaza_Strip",
    "West_Bank",
    "Climate_Change",
    "Income_Inequality",
    "Global_Power_Dynamics",
  ]
  return headlines.map((topic) => {
    return {
      value: topic,
      label: topic,
    }
  })
}

export const formatedDistance = (timestamp: any) => {
  let opinionDate = new Date(timestamp)
  return formatDistance(opinionDate, new Date(Date.now()), {
    addSuffix: true,
  })
}

export function formatDate(date: Date | string, lang: string = "en"): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  if (!(date instanceof Date)) {
    date = new Date(date)
    if (isNaN(date.getTime())) {
      return "Invalid Date"
    }
  }

  return date.toLocaleDateString(lang, options)
}

export function formatDateHHMM(
  date: Date | string,
  lang: string = "en"
): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }

  // Guard clause
  if (!(date instanceof Date)) {
    console.warn("Invalid date object", date)
    date = new Date(date)
    if (isNaN(date.getTime())) {
      return "Invalid Time"
    }
  }

  return date.toLocaleTimeString(lang, options).slice(0, 5)
}

export function generateRandomId(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"
  let id = ""
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    id += chars[randomIndex]
  }
  return id
}
