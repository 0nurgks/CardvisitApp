import { GestureHandlerRootView } from "react-native-gesture-handler";
import ContainerPage from "./ContainerPage"
import { View } from "react-native";
export default function Index() {

  return (<GestureHandlerRootView><View><ContainerPage/><View/><GestureHandlerRootView/>);

}
