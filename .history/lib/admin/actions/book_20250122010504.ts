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
            success : true,
            data : JSON.stringify()
        }
    }catch(e){
        console.log(e)
        return {
            success : false,
            message : 'Failed to create book' 
        }
    }
}