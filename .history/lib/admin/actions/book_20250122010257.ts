'use server'

import { db } from "@/database/drizzle"
import { books } from "@/database/schema"

const createBook = async (book: BookParams) => {
    try{
        const newBook = await db.insert(books)
    }catch(e){
        console.log(e)
        return {
            success : false,
            message : 'Failed to create book' 
        }
    }
}