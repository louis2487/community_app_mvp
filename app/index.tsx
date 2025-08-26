import PostCard from "@/components/PostCard";
import { Posts, type Post } from "@/lib/api";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";

export default function FeedScreen() {
  const [items, setItems] = useState<Post[]>([]);
  const [cursor, setCursor] = useState<string | undefined>();
  const [refreshing, setRefreshing] = useState(false);

  const load = async (reset = false) => {
    const data = await Posts.list(reset ? undefined : cursor);
    setItems(reset ? data.items : [...items, ...data.items]);
    setCursor(data.next_cursor);
  };

  useEffect(() => {
    load(true);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 ,backgroundColor:"#fff"}}
        data={items}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await load(true);
              setRefreshing(false);
            }}
          />
        }
      />
      <View style={{ padding: 12, backgroundColor: "#fff", borderTopWidth: 1, marginBottom:80 }}>
        <Link href="/compose" asChild>
          <Pressable style={{ backgroundColor: "#f2f2f2", padding: 12, borderRadius: 12 }}>
            <Text>무슨 생각을 하고 있나요?</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}