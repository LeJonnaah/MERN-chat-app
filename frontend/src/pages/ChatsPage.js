import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function ChatPage() {

  const [chats, setChats] = useState([])

  const API_URL = 'http://localhost:3001'

  const fetchChats = async () => {
    const { data } = await axios.get(`${API_URL}/api/chats`)
    setChats(data)
  }
    
  useEffect(() => {
    fetchChats()
  }, [])

  return (
    <div>
      <h1>Chats</h1>
      {chats.map(chat => (
        <div key={chat._id}>
          <h3>{chat.chatName}</h3>
        </div>
      ))}
    </div>
  )
}