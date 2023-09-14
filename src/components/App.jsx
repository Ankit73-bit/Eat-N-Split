import FriendList from './FriendList'
import FormAddFriend from './FormAddFriend'
import Button from './Button'
import FormSplitBill from './FormSplitBill'
import {useState} from 'react'

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
]

export default function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [showAddFriend, setShowAdddFriend] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState(null)

  // Show FormAddFriend
  function handleShowAddFriend() {
    setShowAdddFriend(show => !show)
  }

  function handleAddFriend(friend) {
    setFriends(friends => [...friends, friend])
    setShowAdddFriend(false)
  }

  function handleSelection(friend) {
    setSelectedFriend(curFriend =>
      curFriend?.id === friend.id ? null : friend,
    )
    setShowAdddFriend(false)
  }

  function handleSplitBill(value) {
    setFriends(friends =>
      friends.map(friend =>
        friend.id === selectedFriend.id
          ? {...friend, balance: friend.balance + value}
          : friend,
      ),
    )

    setSelectedFriend(null)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  )
}
