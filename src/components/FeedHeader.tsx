"use client"

import React, { useEffect, useState } from "react"
import { BsSearch } from "react-icons/bs"
import AppLogo from "./AppLogo"
import MenuDropdown from "./MenuDropdown"
import { FriendRequest } from "@/types"
import { UserDocument } from "@/models/user"

interface FeedHeaderProps {
  user: any
  friendRequests: FriendRequest[]
}

const FeedHeader: React.FC<FeedHeaderProps> = ({ user, friendRequests }) => {
  return (
    <div className="py-2 border-b-2 px-7 flex items-center justify-between">
      <div className="left-side">
        <div
          id="search-bar"
          className="rounded-3xl bg-bg-feed w-60 shadow-sm relative flex items-center"
        >
          <BsSearch className="h-4 ml-2" />
          <input
            type="text"
            name="search"
            placeholder="Search Everything"
            className="border-none outline-none rounded-3xl ml-2"
          />
        </div>
      </div>

      <AppLogo className="pl-4" />

      <div id="right-size">
        <MenuDropdown user={user} friendRequests={friendRequests} />
      </div>
    </div>
  )
}

export default FeedHeader
