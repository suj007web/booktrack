'use server'

import { db } from "@/database/drizzle"

const createBook = async (book: BookParams) => {
    try{
        const newBook = await db.
    }catch(e){
        console.log(e)
        return {
            success : false,
            message : 'Failed to create book' 
        }
    }
}