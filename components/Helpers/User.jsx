"use client"
import Image from "next/image"
import { signOut } from "next-auth/react"
import { useState } from "react"

const User = ({ session }) => {
    const [showLogout, setShowLogout] = useState(false)
    return (
        <div>
            {session?.user?.image && <div onClick={() => setShowLogout(!showLogout)} className="flex flex-col items-center justify-center relative">
                {/* <span className="hidden sm:block sm:text-xs">{session?.user?.name}</span> */}
                <Image src={session.user.image} alt="logged_img" className="rounded-full" width={35} height={35} />

                {showLogout && <button
                    onClick={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}/signup` })} className="hidden sm:block absolute -bottom-6">Logout</button>}

            </div>}

        </div>
    )
}

export default User
