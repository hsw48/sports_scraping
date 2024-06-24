
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import AddReaction from "../assets/AddReaction.svg"
import Article from "../assets/article.svg"

export default function EventPreview({ data, set_event_id }) {

    return (
        <Pressable
            onPress={() => set_event_id(data.event_id)}
        >
            <View
                style={{
                    flexDirection: "column",
                    backgroundColor: "white",
                    marginTop: 16,
                    marginHorizontal: 16,
                    padding: 16,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: '#E5E7EB'
                }}
            >
                <View
                    style={{
                        flexDirection: "row"
                    }}
                >
                    <View
                        style={{
                            flexDirection: "column",
                            flex: 1
                        }}
                    >

                        <Text
                            style={{
                                color: "#71767D",
                                fontWeight: 600,

                            }}
                        >
                            {data.event_league}
                        </Text>
                        <Text
                            style={{
                                fontSize: 22,
                                color: "black",
                                fontWeight: 700
                            }}
                        >
                            {data.event_name}
                        </Text>
                    </View>
                    <View>
                        <View
                            style={{
                                flexDirection: "column",
                                flex: 1,
                                justifyContent: "center"
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",

                                }}
                            >
                                <Article
                                    height={20}
                                    width={20}
                                />
                                <View style={{ width: 4 }} />
                                <Text
                                    style={{
                                        color: "#0066FF",
                                        fontSize: 17,
                                        fontWeight: 500
                                    }}
                                >
                                    {data.num_articles}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}
