// components/SearchResults.tsx
import { CommentDocument } from "@/models/comment"
import { OpinionDocument } from "@/models/opinion"
import { UserDocument } from "@/models/user"
import React from "react"

interface SearchResultProps {
  results: {
    opinion: OpinionDocument[]
    users: UserDocument[]
    comments: CommentDocument[]
  } | null
  handleSearch: any
}

function EmptySearch() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <div className="mb-4 text-2xl font-bold text-gray-700">
        {`No Results Found`}
      </div>
      <div className="text-gray-500">
        {`We couldn't find any items matching your search. Try different keywords
        or filters.`}
      </div>
    </div>
  )
}

const SearchResults: React.FC<SearchResultProps> = ({
  results,
  handleSearch,
}) => {
  if (!results) return null

  const { opinion, users, comments } = results

  const items = [
    ...opinion?.map((item) => ({
      id: item._id,
      label: item.title,
      type: "opinion",
    })),
    ...users?.map((item) => ({
      id: item._id,
      type: "user",
      label: `${item.name} (${item.email})`,
    })),
    ...comments?.map((item) => ({
      id: item._id,
      label: item.text,
      type: "comment",
    })),
  ]

  return (
    <div className="absolute bg-white rounded-lg shadow-lg divide-y divide-gray-200 max-h-96 overflow-y-auto">
      {items.length === 0 ? (
        <EmptySearch />
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="py-2 px-2 hover:bg-gray-200 cursor-pointer"
          >
            <div
              className="flex items-center justify-between"
              onClick={() => handleSearch(item)}
            >
              <h3 className="text-md font-semibold">{item.label}</h3>
              <span className="px-2 py-1 text-xs font-semibold uppercase rounded bg-gray-100 text-gray-700">
                {item.type}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default SearchResults
