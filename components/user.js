import React from "react";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import useSWR from "swr";

const getUser = (props) => {
    const { currentUser, setCurrentUser } = useAuth();
    const router = useRouter();
    if (!currentUser || currentUser == "undefined") {
        router.push("/login");
        return;
    }

    if (currentUser?.profilePic) {
        return currentUser;
    }

    const { data, error } = useSWR(
        "",
        (url) => {
            axios.post(url).then((response) => response.data);
        },
        {
            onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
                // Only retry up to 3 times.
                if (retryCount >= 3) return;

                // Retry after 5 seconds.
                setTimeout(
                    () => revalidate({ retryCount: retryCount + 1 }),
                    5000
                );
            },
        }
    );
    if (error) {
        console.error(error);
        return {
            error,
        };
    }
    setCurrentUser(data);
    return {
        ...currentUser,
        ...data,
    };
};

export default getUser;
