import {React, useEffect, useState } from 'react'
import axios from 'axios';

const ChatPage = () => {
  //usestate used to store data
  //chats to display the data and setchats to change the value of chat variable
const [chats, setChats] = useState([]); // Initialize chats as an empty array

  const fetchChat = async () => {
    const { data } = await axios.get('/api/chats');
    setChats(data.chats); //set the chat - all data goes into chats variable
    // console.log(data)
  }
  //runs when component is rendered for the first time
  useEffect(() => { fetchChat(); }, []);
  return (
 <>
    <div> {chats.map((chat) => 
      <div key={chat._id}>{chat.chatName}</div>
      )}</div>
      </>
)

};

export default ChatPage;