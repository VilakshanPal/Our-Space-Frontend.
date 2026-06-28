import React from 'react'
import UserCard from '../../../components/ui/postMoment/UserCard'
const Page = () => {
  return (
    <div>
      <UserCard
  user={{
    firstName: "Tina",
    profilePicture: null,
  }}
  partner={{
    firstName: "Noah",
  }}
/>
    </div>
  )
}

export default Page
