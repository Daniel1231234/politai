"use client"

import React, { useEffect, useState } from "react"
import { BsSearch } from "react-icons/bs"
import AppLogo from "./AppLogo"
import MenuDropdown from "./MenuDropdown"
import { FriendRequest } from "@/types"
import { User } from "next-auth"
import { getSearchResults } from "@/actions"
import SearchResults from "./SearchResults"
import { Listbox } from "@headlessui/react"
import { useRouter } from "next/navigation"

interface FeedHeaderProps {
  user: User
  friendRequests: FriendRequest[]
}

const FeedHeader: React.FC<FeedHeaderProps> = ({ user, friendRequests }) => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any>(null)
  const [selectedTerm, setSelectedTerm] = useState<any>(null)

  useEffect(() => {
    const fetchSearchRes = async () => {
      try {
        if (searchTerm.trim()) {
          const res = await getSearchResults(searchTerm)
          console.log(res)
          setSearchResults(res)
        } else {
          setSearchResults(null)
        }
      } catch (error) {
        console.error("Failed to fetch search results:", error)
      }
    }

    const timeoutId = setTimeout(fetchSearchRes, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const handleSearch = async (term: any) => {
    if (term.type === "user") {
      router.push(`/profile/${term.id}`)
      setSearchResults(null)
      return
    }
  }

  return (
    <div className="py-2 border-b-2 px-7 flex items-center justify-between">
      <div className="left-side relative">
        <div
          id="search-bar"
          className="rounded-3xl bg-bg-feed w-60 shadow-sm relative flex items-center"
        >
          <BsSearch className="h-4 ml-2" />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            name="search"
            placeholder="Search Everything"
            className="border-none outline-none rounded-3xl ml-2"
          />
        </div>
        {searchResults && (
          <SearchResults results={searchResults} handleSearch={handleSearch} />
        )}
      </div>

      <AppLogo className="pl-4" />

      <div id="right-size">
        <MenuDropdown user={user} friendRequests={friendRequests} />
      </div>
    </div>
  )
}

export default FeedHeader
