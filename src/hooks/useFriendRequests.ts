import { FriendRequest } from "@/types"
import { create, StoreApi } from "zustand"

interface FriendRequestsState {
  friendRequests: FriendRequest[]
  setFriendRequests: (requests: FriendRequest[]) => void
  addFriendRequest: (request: FriendRequest) => void
  removeFriendRequest: (senderId: string) => void
}

const useFriendRequests = create<FriendRequestsState>(
  (set: StoreApi<FriendRequestsState>["setState"]) => ({
    friendRequests: [],
    setFriendRequests: (requests) => set({ friendRequests: requests }),
    addFriendRequest: (request) =>
      set((state) => ({ friendRequests: [...state.friendRequests, request] })),
    removeFriendRequest: (senderId) =>
      set((state) => ({
        friendRequests: state.friendRequests.filter(
          (request) => request.senderId !== senderId
        ),
      })),
  })
)

export default useFriendRequests
