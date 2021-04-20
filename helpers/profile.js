import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../redux/profile";
import useSWR from "swr";

export default function getProfile() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);
    if (!auth?.isLoggedIn) {
        return Router.push("/login");
    }

    if (profile?.loaded) {
        return profile;
    }

    const { data, error } = useSWR("/api/school/profile", (url) => {
        axios
            .post(url, {
                userId: auth.userId,
            })
            .then((response) => response.data);
    });
    if (error) {
        return {
            loaded: false,
        };
    }

    dispatch(set(data));
    return data;
}
