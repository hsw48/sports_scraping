import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Events from './components/Events';
import Event from './components/Event';
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {

  const query_client = new QueryClient();
  const [event_id, set_event_id] = React.useState(null)

  return (
    <QueryClientProvider client={query_client}>
      <View style={{ flex: 1 }}>
        {event_id === null ? <Events set_event_id={set_event_id}/> : <Event event_id={event_id} set_event_id={set_event_id}/>}
      </View>
    </QueryClientProvider>
  )
}

