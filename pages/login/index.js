import React from "react";
import Layout from "../../components/Layout";
import {
    Form,
    Button,
    Grid,
    Header,
    Segment,
    Message,
} from "semantic-ui-react";
import axios from "../../helpers/axios";
import { setToken } from "../../helpers/token";
import { useAuth } from "../../context/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth";

const LoginPage = (props) => {
    const { setCurrentUser } = useAuth();
    const router = useRouter();
    const dispatch = useDispatch();

    async function loginFormSubmit(event) {
        const form = event.target;
        const [usernameInput, passwordInput] = form.elements;
        const username = usernameInput.value;
        const password = passwordInput.value;
        if (username.length == 0) {
            alert("No username entered");
            return;
        }
        if (password.length == 0) {
            alert("No password entered");
            return;
        }

        try {
            const response = await axios.post("/api/auth/login", {
                username,
                password,
            });

            console.log({ response });

            if (response.status == 200) {
                const { authenticationToken, refreshToken } = response.data;
                setToken(authenticationToken, refreshToken);
                console.log({ authenticationToken, refreshToken });

                setCurrentUser({
                    username: response.data.username,
                    id: response.data.userId,
                    role: response.data.userRole,
                });

                dispatch(
                    login({
                        username: response.data.username,
                        userId: response.data.userId,
                        role: response.data.userRole,
                    })
                );

                if (response.data.userRole == "teacher") {
                    router.push("/t");
                } else if (response.data.userRole == "school") {
                    router.push("/s");
                }
            } else {
                alert("Username and password do not match");
                return;
            }
        } catch (error) {
            console.error({ error });
            alert(
                `Error ${error?.response?.status} : Username and password do not match`
            );
        }
    }

    return (
        <Layout>
            <Grid
                textAlign="center"
                verticalAlign="middle"
                style={{ height: "80vh" }}
            >
                <Grid.Column style={{ maxWidth: "50vw" }}>
                    <Header as="h2" color="teal" textAlign="center">
                        Log-in to your account
                    </Header>
                    <Form size="large" onSubmit={loginFormSubmit}>
                        <Segment stacked>
                            <Form.Field>
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                />
                            </Form.Field>
                            <Button color="teal" type="submit">
                                Submit
                            </Button>
                        </Segment>
                    </Form>

                    <Message>
                        New to us? <Link href="/signup">Sign Up</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        </Layout>
    );
};

export default LoginPage;
