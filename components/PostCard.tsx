import type { Post } from "@/lib/api";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={{ pathname: "/post/[id]", params: { id: post.id } }} asChild>
      <Pressable style={{ padding: 12, borderBottomWidth: 1, borderColor: "#eee" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
          <Text style={{ fontWeight: "600" }}>{post.author.username}</Text>
          <Text style={{ color: "#666", fontSize: 12 }}>
            {new Date(post.created_at).toLocaleString()}
          </Text>
        </View>

        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{post.title}</Text>

        {post.image_url && (
          <Image
            source={{ uri: post.image_url }}
            style={{ width: "100%", height: 200, marginTop: 8, borderRadius: 12 }}
          />
        )}
      </Pressable>
    </Link>
  );
}
