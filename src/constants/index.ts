import { FaHome } from "react-icons/fa"

export const sidebarOpts: any[] = [
  {
    id: 1,
    name: "Feed",
    href: "/feed",
    Icon: FaHome,
  },
  {
    id: 3,
    name: "chat GPT",
    href: "/dashboard/chat/gpt",
    Icon: "MessageCircle",
  },
]

export const AVATAR = "/images/placeholder.jpg"

export enum PoliticalType {
  LEFT = "left",
  RIGHT = "right",
  LIBERTARIAN = "libertarian",
  CENTRIST = "centrist",
  CONSERVATIVE = "conservative",
  PROGRESSIVE = "progressive",
  SOCIALIST = "socialist",
  GREEN = "green",
  NATIONALIST = "nationalist",
  FASCIST = "fascist",
  ANARCHIST = "anarvhist",
  SOCIALDEMOCRAT = "socialDemocrat",
  COMMUNIST = "communist",
  MODERATE = "moderate",
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
