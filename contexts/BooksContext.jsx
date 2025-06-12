import { createContext, useState } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Role } from "react-native-appwrite";
import { useUser } from './../hooks/useUser';

const DATABASE_ID="kamikazi"
const COLLECTION_ID="684a6d00002eab70c037"

export const BooksContext = createContext()

export function BooksProvider({ children}){
    const [books, setBooks] = useState([])
    const {user} = useUser()

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
          const newBook = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {...data, userId:user.$id},
            [
                Permission.read(Role.user(user.$id)),
                Permission.update(Role.user(user.$id)),
                Permission.delete(Role.user(user.$id)),
            ]
          )
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