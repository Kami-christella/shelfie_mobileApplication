import { createContext, useState } from "react";
import { databases } from "../lib/appwrite";

const DATABASE_ID="kamikazi"
const COLLECTION_ID="684a6d00002eab70c037"

export const BooksContext = createContext()

export function BooksProvider({ children}){
    const [books, setBooks] = useState([])

    async function fetchBooks() {
        try {

        } catch(error){
            console.log(error.message)
        }
    }
    async function fetchBookById(id) {
         try {

        } catch(error){
            console.log(error.message)
        }
    }

    async function createBook(data) {
         try {

        } catch(error){
            console.log(error.message)
        }
    }
    async function deleteBook(id) {
         try {

        } catch(error){
            console.log(error.message)
        }
    }
    return (
        <BooksContext.Provider 
          value={{books, fetchBooks,fetchBookById, createBook,deleteBook}}
        >
          {children}  
        </BooksContext.Provider>
    )
}