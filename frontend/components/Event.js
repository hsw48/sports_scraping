import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import BackIcon from "../assets/BackIcon.svg";
import ArticlePreview from './ArticlePreview';
import useGetEvent from './useGetEvent';

export default function Event({ event_id, set_event_id }) {

  const { data } = useGetEvent(event_id);

  const go_back = () => {
    set_event_id(null)
  }

  if (data === undefined) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text>
          Loading...
        </Text>
      </View>
    )
  }

  return (
    <View
      style={{
        marginTop: 60
      }}
    >
      <Pressable
        onPress={go_back}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginLeft: 16
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <BackIcon
              height={17}
              width={10}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 12,
              color: "#0066FF"
            }}
          >
            Back
          </Text>
        </View>
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginHorizontal: 16
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: 600,
            marginTop: 12
          }}
        >
          {data.event_name}
        </Text>
        <Text
          style={{
            color: "#71767D",
            position: "relative",
            bottom: 3
          }}
        >
          {data.articles.length + " Articles"}
        </Text>
      </View>
      <FlatList
        keyExtractor={item => item.article_id}
        data={data.articles}
        renderItem={({ item, index }) => {
          return (
            <ArticlePreview
              data={item}
            />
          );
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: 200
            }}
          />
        }
      />
    </View>
  )
}
