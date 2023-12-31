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
  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    id += chars[randomIndex]
  }
  return id
}

export function getEmptyOpinion() {
  return {
    title: "",
    body: "",
    images: [],
    topics: [],
  }
}

export function isHebrew(text: string) {
  const hebrew = /[\u0590-\u05FF]/
  return hebrew.test(text)
}
