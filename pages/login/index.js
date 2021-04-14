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

const LoginPage = (props) => {
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

            console.table(response);
            if (response.status == 200) {
                const { authenticationToken, refreshToken, userId } = response;
                setToken(authenticationToken, refreshToken);
                console.log({ authenticationToken, refreshToken });
            } else {
                alert("Username and password do not match");
                return;
            }
        } catch (error) {
            console.error(error);
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
                        New to us? <a href="#">Sign Up</a>
                    </Message>
                </Grid.Column>
            </Grid>
        </Layout>
    );
};

export default LoginPage;
