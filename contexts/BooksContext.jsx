import { createContext, useState } from "react";

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