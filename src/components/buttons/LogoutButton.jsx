'use client'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signOut } from 'next-auth/react'
import React from 'react'

const LogoutButton = () => {
  return (
    <button className='flex items-center gap-2 border p-1 px-4 shadow-sm' onClick={()=>signOut()}>Logout <span><FontAwesomeIcon icon={faRightFromBracket} /></span></button>
  )
}

export default LogoutButton