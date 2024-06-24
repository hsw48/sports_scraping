
import React from 'react';
import { Linking, Pressable, Text, View, Image } from 'react-native';

export default function ArticlePreview({ data }) {

    return (
        <Pressable
            onPress={async () => await Linking.openURL(data.link)}
        >
            <View
                style={{
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    backgroundColor: "white",
                    marginHorizontal: 16,
                    borderRadius: 16,
                    padding: 16,
                    marginTop: 16
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Image
                        source={{ uri: "https://pikkit-ios-cdn.s3.amazonaws.com/super_bowl_example.png" }}
                        style={{
                            width: 400,
                            height: 200,
                            resizeMode: "contain"
                        }}
                    />
                </View>
                <View style={{ height: 8 }} />
                <Text
                    style={{
                        fontSize: 17,
                        color: "black",
                        fontWeight: 600
                    }}
                >
                    {data.title}
                </Text>
                <View style={{ height: 8 }} />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Text
                        style={{
                            color: '#B8BBBE',
                            fontSize: 13
                        }}
                    >
                        {data.date_published + " · " + data.estimated_reading_time + " read"}
                    </Text>
                    <Text
                        style={{
                            color: '#B8BBBE',
                            fontSize: 13
                        }}
                    >
                        {data.author}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}
