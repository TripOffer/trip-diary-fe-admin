import http from "@/service/request/axios.ts";

class TestApi {
    private static urls = {
        subscribe: "/sse",
    };

    static subscribeToUpdates<T>(
        onMessage: (data: T) => void,
        onError?: (error: unknown) => void,
    ) {
        const eventSource = new EventSource(
            http.defaults.baseURL + TestApi.urls.subscribe
        );

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data) as T;
                onMessage(data);
            } catch (error) {
                if (onError) {
                    onError(error);
                } else {
                    console.error("Error parsing SSE message:", error);
                }
            }
        };

        eventSource.onerror = (error) => {
            if (onError) {
                onError(error);
            }
            eventSource.close();
        }

        return () => {
            eventSource.close();
        }
    }
}

export default TestApi;