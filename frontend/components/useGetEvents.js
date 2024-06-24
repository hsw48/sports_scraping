import axios from "axios";
import { useInfiniteQuery } from "react-query";

const getEvents = async (
    pageParam
) => {

    const { data } = await axios.post(
        "https://y34eaogv52.execute-api.us-east-1.amazonaws.com/event/all",
        {
            offset: pageParam,
            limit: 3
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

const useGetEvents = (options) => {

    return useInfiniteQuery(
        [
            "/event/all"
        ],
        ({ pageParam = 0 }) => getEvents(
            pageParam
        ),
        {
            ...options
        }
    );
}

export default useGetEvents;