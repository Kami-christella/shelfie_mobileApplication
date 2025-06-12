import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Spacer from "../../../components/Spacer";
import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView"
import ThemedCard from "../../../components/ThemedCard"
import ThemedButton from './../../../components/ThemedButton';

const BookDetails =()=>{
    const {id} = useLocalSearchParams()

    return (
       <ThemedView safe={true} style={styles.container}>
           <ThemedText>Book Details - {id}</ThemedText>
       </ThemedView>
    )
}
export default BookDetails

const styles  =StyleSheet.create({
  container:{
    flex:1,
    alignItems:"stretch"
  }
})
