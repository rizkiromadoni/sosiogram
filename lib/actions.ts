"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "./prisma"
import { z } from "zod"

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

export const switchBlock = async (userId: string) => {
    const { userId: currentUserId } = auth()
    if (!currentUserId) throw new Error("Unauthorized")

    try {
        const existingBlock = await prisma.block.findFirst({
            where: { blockedId: userId, blockerId: currentUserId },
        })

        if (existingBlock) {
            await prisma.block.delete({
                where: { id: existingBlock.id },
            })
        } else {
            await prisma.block.create({
                data: { blockedId: userId, blockerId: currentUserId }
            })
        }
    } catch (error) {
        console.log(error)
        throw new Error("Something went wrong")
    }
}

export const acceptFollowRequest = async (userId: string) => {
    const { userId: currentUserId } = auth()
    if (!currentUserId) throw new Error("Unauthorized")

    try {
        const existingRequest = await prisma.followRequest.findFirst({
            where: { senderId: userId, receiverId: currentUserId }
        })

        if (existingRequest) {
            await prisma.followRequest.delete({
                where: { id: existingRequest.id },
            })
            await prisma.follower.create({
                data: { followerId: userId, followingId: currentUserId }
            })
        }
    } catch (error) {
        console.log(error)
        throw new Error("Something went wrong")
    }
}

export const declineFollowRequest = async (userId: string) => {
    const { userId: currentUserId } = auth()
    if (!currentUserId) throw new Error("Unauthorized")

    try {
        const existingRequest = await prisma.followRequest.findFirst({
            where: { senderId: userId, receiverId: currentUserId }
        })

        if (existingRequest) {
            await prisma.followRequest.delete({
                where: { id: existingRequest.id },
            })
        }
    } catch (error) {
        console.log(error)
        throw new Error("Something went wrong")
    }
}

export const updateProfile = async (
    prevState: { success: boolean, error: boolean },
    payload: { formData: FormData, cover: string }
) => {
    const { userId } = auth()
    if (!userId) {
        return { ...prevState, error: true }
    }

    const { formData, cover } = payload

    const fields = Object.fromEntries(formData)
    const filteredFields = Object.fromEntries(
        Object.entries(fields).filter(([_, value]) => value !== "")
    )
    const pofileSchema = z.object({
        cover: z.string().optional(),
        name: z.string().max(60).optional(),
        surname: z.string().max(60).optional(),
        description: z.string().max(225).optional(),
        city: z.string().max(60).optional(),
        work: z.string().max(60).optional(),
        school: z.string().max(60).optional(),
        website: z.string().max(60).optional(),
    })

    const validated = pofileSchema.safeParse({...filteredFields, cover})
    if (!validated.success) {
        return { ...prevState, error: true }
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: validated.data
        })

        return { ...prevState, success: true }
    } catch (error) {
        console.log(error)
        return { ...prevState, error: true }
    }
}













