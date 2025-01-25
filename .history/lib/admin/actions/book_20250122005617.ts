'use server'

const createBook = async (book: BookParams) => {
    try{

    }catch(e){
        console.log(e)
        return {
            success : false,
            message : 'Failed to create book' 
        }
    }
}