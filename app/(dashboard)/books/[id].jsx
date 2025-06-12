import { StyleSheet, Text, Alert } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { useBooks } from "../../../hooks/useBooks"
import { Colors } from "../../../constants/Colors"

// themed components
import ThemedText from "../../../components/ThemedText"
import ThemedButton from "../../../components/ThemedButton"
import ThemedView from "../../../components/ThemedView"
import Spacer from "../../../components/Spacer"
import ThemedCard from "../../../components/ThemedCard"
import ThemedLoader from "../../../components/ThemedLoader"
import ThemedTextInput from "../../../components/ThemedTextInput"

const BookDetails = () => {
  const [book, setBook] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Edit form state
  const [editTitle, setEditTitle] = useState("")
  const [editAuthor, setEditAuthor] = useState("")
  const [editDescription, setEditDescription] = useState("")

  const { id } = useLocalSearchParams()
  const { fetchBookById, updateBook, deleteBook } = useBooks()
  const router = useRouter()

  const handleEdit = () => {
    setEditTitle(book.title)
    setEditAuthor(book.author)
    setEditDescription(book.description)
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditTitle("")
    setEditAuthor("")
    setEditDescription("")
  }

  const handleSaveEdit = async () => {
    if (!editTitle.trim() || !editAuthor.trim()) {
      Alert.alert("Error", "Title and Author are required fields")
      return
    }

    setIsLoading(true)
    try {
      const updatedBook = await updateBook(id, {
        title: editTitle.trim(),
        author: editAuthor.trim(),
        description: editDescription.trim()
      })
      
      setBook(updatedBook)
      setIsEditing(false)
      Alert.alert("Success", "Book updated successfully!")
    } catch (error) {
      Alert.alert("Error", "Failed to update book: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Book",
      "Are you sure you want to delete this book? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            setIsLoading(true)
            try {
              await deleteBook(id)
              router.replace('/books')
            } catch (error) {
              Alert.alert("Error", "Failed to delete book: " + error.message)
              setIsLoading(false)
            }
          }
        }
      ]
    )
  }

  useEffect(() => {
    async function loadBook() {
      try {
        setIsLoading(true)
        const bookData = await fetchBookById(id)
        setBook(bookData)
      } catch (error) {
        Alert.alert("Error", "Failed to load book details")
        router.back()
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      loadBook()
    }

    return () => {
      setBook(null)
      setIsEditing(false)
    }
  }, [id])

  if (isLoading || !book) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    )
  }

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedCard style={styles.card}>
        {isEditing ? (
          // Edit Mode
          <>
            <ThemedText style={styles.editLabel}>Title:</ThemedText>
            <ThemedTextInput
              style={styles.input}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Book title"
            />
            <Spacer height={15} />

            <ThemedText style={styles.editLabel}>Author:</ThemedText>
            <ThemedTextInput
              style={styles.input}
              value={editAuthor}
              onChangeText={setEditAuthor}
              placeholder="Author name"
            />
            <Spacer height={15} />

            <ThemedText style={styles.editLabel}>Description:</ThemedText>
            <ThemedTextInput
              style={[styles.input, styles.textArea]}
              value={editDescription}
              onChangeText={setEditDescription}
              placeholder="Book description"
              multiline
              numberOfLines={4}
            />
            <Spacer height={20} />

            {/* Edit Action Buttons */}
            <ThemedView style={styles.editButtons}>
              <ThemedButton 
                onPress={handleSaveEdit} 
                style={[styles.button, styles.saveButton]}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? "Saving..." : "Save"}
                </Text>
              </ThemedButton>
              
              <ThemedButton 
                onPress={handleCancelEdit} 
                style={[styles.button, styles.cancelButton]}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </ThemedButton>
            </ThemedView>
          </>
        ) : (
          // View Mode
          <>
            <ThemedText style={styles.title}>{book.title}</ThemedText>
            <ThemedText style={styles.author}>Written by {book.author}</ThemedText>
            <Spacer height={20} />

            <ThemedText title={true}>Book description:</ThemedText>
            <Spacer height={10} />
            <ThemedText style={styles.description}>{book.description || "No description available"}</ThemedText>
            <Spacer height={30} />

            {/* View Action Buttons */}
            <ThemedView style={styles.actionButtons}>
              <ThemedButton 
                onPress={handleEdit} 
                style={[styles.button, styles.editButton]}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>Edit Book</Text>
              </ThemedButton>
              
              <ThemedButton 
                onPress={handleDelete} 
                style={[styles.button, styles.deleteButton]}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>Delete Book</Text>
              </ThemedButton>
            </ThemedView>
          </>
        )}
      </ThemedCard>
    </ThemedView>
  )
}

export default BookDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  card: {
    margin: 20,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    fontStyle: "italic",
    opacity: 0.8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  editLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  editButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: Colors.primary,
  },
  cancelButton: {
    backgroundColor: "#6c757d",
  },
  editButton: {
    backgroundColor: Colors.primary,
  },
  deleteButton: {
    backgroundColor: Colors.warning,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "600",
  },
})

// import { StyleSheet, Text } from "react-native"
// import { useLocalSearchParams, useRouter } from "expo-router"
// import { useEffect, useState } from "react"
// import { useBooks } from "../../../hooks/useBooks"
// import { Colors } from "../../../constants/Colors"

// // themed components
// import ThemedText from "../../../components/ThemedText"
// import ThemedButton from "../../../components/ThemedButton"
// import ThemedView from "../../../components/ThemedView"
// import Spacer from "../../../components/Spacer"
// import ThemedCard from "../../../components/ThemedCard"
// import ThemedLoader from "../../../components/ThemedCard"


// const BookDetails = () => {
//   const [book, setBook] = useState(null)

//   const { id } = useLocalSearchParams()
//   const { fetchBookById, deleteBook } = useBooks()
//   const router = useRouter()

//   const handleDelete = async () => {
//     await deleteBook(id)
//     setBook(null)
//     router.replace('/books')
//   }

//   useEffect(() => {
//     async function loadBook() {
//       const bookData = await fetchBookById(id)
//       setBook(bookData)
//     }

//     loadBook()

//     return () => setBook(null)
//   }, [id])

//   if (!book) {
//     return (
//       <ThemedView safe={true} style={styles.container}>
//         <ThemedLoader />
//       </ThemedView>
//     )
//   }

//   return (
//     <ThemedView safe={true} style={styles.container}>
//       <ThemedCard style={styles.card}>
//         <ThemedText style={styles.title}>{book.title}</ThemedText>
//         <ThemedText>Written by {book.author}</ThemedText>
//         <Spacer />

//         <ThemedText title={true}>Book description:</ThemedText>
//         <Spacer height={10} />

//         <ThemedText>{book.description}</ThemedText>
//       </ThemedCard>

//       <ThemedButton onPress={handleDelete} style={styles.delete}>
//         <Text style={{ color: '#fff', textAlign: 'center' }}>Delete Book</Text>
//       </ThemedButton>
//     </ThemedView>
//   )
// }

// export default BookDetails

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "stretch",
//   },
//   title: {
//     fontSize: 22,
//     marginVertical: 10,
//   },
//   card: {
//     margin: 20
//   },
//   delete: {
//     marginTop: 40,
//     backgroundColor: Colors.warning,
//     width: 200,
//     alignSelf: "center",
//   },
// })

