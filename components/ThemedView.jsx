import { View, useColorScheme } from "react-native";
import Colors from "../constants/Colors";

const ThemedView = ({ }) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
  return (
    <View>
    
    </View>
  );
};

export default ThemedView;
