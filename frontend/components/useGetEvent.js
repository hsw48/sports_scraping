import axios from "axios";
import { useInfiniteQuery, useQuery } from "react-query";

const getEvent = async (
    event_id
) => {

    const { data } = await axios.post(
        "https://y34eaogv52.execute-api.us-east-1.amazonaws.com/event/id",
        {
            event_id: event_id
        },
        {
            withCredentials: true,
            headers: {
                authorization: "test"
            }
        }
    ).catch(error => {
        if (error.response) {
            throw new Error("AXIOS_ERROR_IN_RESPONSE");
        } else if (error.request) {
            throw new Error("AXIOS_ERROR_IN_REQUEST");
        } else {
            throw new Error("AXIOS_ERROR_OTHER");
        }
    });
    return data;
};

const useGetEvent = (event_id, options) => {

    return useQuery(["/event/id", event_id], () =>
        getEvent(event_id),
        options
    );
}

export default useGetEvent;