import { logout } from "@/app/lib/appwrite";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold text-3xl my-10">Welcome To RealState</Text>
      {/* <Link href="/sign-in">Sign In</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/properties/1">Properties</Link> */}
      <TouchableOpacity
        onPress={logout}
        className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
