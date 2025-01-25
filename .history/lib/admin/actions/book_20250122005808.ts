'use server'

const createBook = async (book: BookParams) => {
    try{
        const newBook = await db
    }catch(e){
        console.log(e)
        return {
            success : false,
            message : 'Failed to create book' 
        }
    }
}