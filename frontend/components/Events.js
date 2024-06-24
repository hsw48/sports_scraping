import React from 'react';
import { FlatList, Text, View } from 'react-native';
import EventPreview from './EventPreview';
import useGetEvents from './useGetEvents';

export default function Events({ set_event_id }) {

    const { data, fetchNextPage } = useGetEvents({
        getNextPageParam: (lastPage, allPages) => lastPage.length !== 3 ? undefined : allPages.length * 3,
    });
    const flattenData = React.useMemo(() => data?.pages?.flatMap((page) => [...page]) || [], [data?.pages]);

    const onEndReached = () => {
        fetchNextPage();
    };

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
                marginTop: 100
            }}
        >
            <Text
                style={{
                    marginLeft: 16,
                    fontSize: 32,
                    fontWeight: 600
                }}
            >
                Articles
            </Text>
            <FlatList
                keyExtractor={item => item.event_id}
                data={flattenData}
                renderItem={({ item, index }) => {
                    return (
                        <EventPreview
                            data={item}
                            set_event_id={set_event_id}
                        />
                    );
                }}
                onEndReachedThreshold={0.2}
                onEndReached={onEndReached}
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
