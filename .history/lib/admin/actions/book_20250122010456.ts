'use server'

import { db } from "@/database/drizzle"
import { books } from "@/database/schema"

const createBook = async (params: BookParams) => {
    try{
        const newBook = await db.insert(books).values({
            ...params,
            availableCopies : params.totalCopies,
        }).returning()

        return {
            succ
        }
    }catch(e){
        console.log(e)
        return {
            success : false,
            message : 'Failed to create book' 
        }
    }
}