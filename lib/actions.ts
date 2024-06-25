"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "./prisma"

export const switchFollow = async (userId: string) => {
    const { userId: currentUserId } = auth()
    if (!currentUserId) throw new Error("Unauthorized")

    try {
        const existingFollow = await prisma.follower.findFirst({
            where: { followerId: currentUserId, followingId: userId },
        })

        if (existingFollow) {
            await prisma.follower.delete({
                where: { id: existingFollow.id },
            })
        } else {
            const existingRequest = await prisma.followRequest.findFirst({
                where: { senderId: currentUserId, receiverId: userId }
            })

            if (existingRequest) {
                await prisma.followRequest.delete({
                    where: { id: existingRequest.id },
                })
            } else {   
                await prisma.followRequest.create({
                    data: { senderId: currentUserId, receiverId: userId }
                })
            }
        }
    } catch (error) {
        console.log(error)
        throw new Error("Something went wrong")
    }
}