import React, { useState, useRef } from "react";
import Layout from "../../components/Layout";
import {
    Form,
    Input,
    Message,
    Icon,
    Checkbox,
    Button,
    Dropdown,
} from "semantic-ui-react";
import styles from "../../styles/pages/signup-teacher.module.css";
import axios from "../../helpers/axios";

export default function SignupInstitute() {
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [emailError, setEmailError] = useState(null);

    const boardRef = useRef();

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    async function submitForm(event) {
        const form = event.target;
        console.log(form.elements);
        const [
            name,
            email,
            phoneNumber,
            website,
            username,
            password,
            confirmPassword,
            firstCondition,
            secondCondition,
        ] = form.elements;
        const board = boardRef.current?.state?.value;

        console.log({ boardRef });
        console.log({ board });

        if (name.value?.length == 0) {
            alert("Last Name cannot be empty");
            return;
        }

        if (email.value.length == 0) {
            alert("Email cannot be empty");
            return;
        }

        if (!validateEmail(email.value)) {
            alert("Invalid email address");
            return;
        }

        if (username.value.length == 0) {
            alert("Please select a username");
            return;
        }

        if (password.value.length <= 5) {
            alert("Password must be atleast 6 characters long.");
            return;
        }

        if (confirmPassword.value != password.value) {
            setPasswordMismatch(true);
            return;
        } else {
            setPasswordMismatch(false);
        }

        if (!firstCondition.checked || !secondCondition.checked) {
            alert(
                "You must agree to the terms and conditions before proceeding."
            );
        }

        const data = {
            name: name.value,
            email: email.value,
            phoneNumber: phoneNumber.value,
            website: website.value,
            username: username.value,
            password: password.value,
            board: JSON.stringify(board),
        };

        // console.log(data);
        try {
            const response = await axios.post("/api/auth/signups", data);
            console.log({ response });
            if (
                response.status == 200 &&
                response.data == "User registration successful"
            ) {
                alert("User registration successful");
                setErrorMessage(null);
            } else {
                setErrorMessage(response.data);
            }
        } catch (error) {
            console.error({ error });
            setErrorMessage(error.message);
        }
    }

    async function emailBlurEvent(event) {
        const email = event.target.value;
        const ok = validateEmail(email);
        if (!ok) {
            return;
        }
        try {
            const response = await axios.get("/api/auth/emailverifications", {
                params: {
                    email,
                },
            });
            if (response.status == 200) {
                setEmailError(null);
                console.log("Email ok");
                return;
            } else {
                setEmailError({
                    color: "red",
                });
            }
        } catch (error) {
            console.error({ error });
        }
    }

    async function validateUsername(username) {
        try {
            const response = await axios.get(
                "/api/auth/usernameverifications",
                {
                    params: {
                        username,
                    },
                }
            );
            console.log({ response });
            if (response.status == 200) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error({ err });
            return false;
        }
    }

    function usernameOnFocus(event) {
        console.log("Hello");
        const username = event.target.value;
        if (username.length <= 6) return;
        setUsernameError({
            heading: "Just one second",
            message: "Validating username",
            color: "teal",
            icon: "circle notched",
        });

        const id = setInterval(async () => {
            const usernameValidated = await validateUsername(username);
            if (usernameValidated) {
                clearInterval(id);
                setUsernameError({
                    heading: "Kudos",
                    message: "Username available",
                    color: "green",
                    icon: "check circle",
                });
            } else {
                setUsernameError({
                    heading: "Oops",
                    message: "Username already taken",
                    color: "red",
                    icon: "close",
                });
            }
        }, 2000);
    }

    return (
        <Layout>
            <h1>School Signup</h1>
            <Form onSubmit={submitForm}>
                <Form.Group widths="equal">
                    <Form.Input
                        fluid
                        label="Name of Institution"
                        placeholder="ABC University"
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Email</label>
                        <input
                            label="Email"
                            placeholder="john@abc.com"
                            onBlur={emailBlurEvent}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Phone Number</label>
                        <Form.Input
                            type="number"
                            minLength="10"
                            maxLength="10"
                        ></Form.Input>
                    </Form.Field>
                </Form.Group>
                {emailError && (
                    <Message icon size="mini" color={emailError.color}>
                        <Icon name="cross" />
                        <Message.Content>
                            <Message.Header>Oops</Message.Header>
                            Email is already taken by another user
                        </Message.Content>
                    </Message>
                )}
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Boards</label>
                        <Dropdown
                            placeholder="Board of Education"
                            fluid
                            multiple
                            selection
                            ref={boardRef}
                            options={[
                                { key: "CBSE", text: "CBSE", value: "CBSE" },
                                { key: "ICSE", text: "ICSE", value: "ICSE" },
                            ]}
                        />
                    </Form.Field>
                    <Form.Input
                        fluid
                        label="Website Link"
                        placeholder="https://www.abc.com"
                    />
                </Form.Group>
                <Form.Field width="16">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="john_doe"
                        height="100%"
                        onFocus={usernameOnFocus}
                    />
                </Form.Field>
                {usernameError && (
                    <Message icon size="mini" color={usernameError.color}>
                        <Icon
                            name={usernameError.icon}
                            loading={usernameError.icon == "circle notched"}
                        />
                        <Message.Content>
                            <Message.Header>
                                {usernameError.heading}
                            </Message.Header>
                            {usernameError.message}
                        </Message.Content>
                    </Message>
                )}
                <Form.Field>
                    <label>Password</label>
                    <Form.Input type="password"></Form.Input>
                </Form.Field>
                <Form.Field>
                    <label>Confirm Password</label>
                    <Form.Input type="password"></Form.Input>
                </Form.Field>
                {passwordMismatch && (
                    <Message size="mini" negative>
                        <Message.Content>
                            <Message.Header>
                                Passwords do not match
                            </Message.Header>
                        </Message.Content>
                    </Message>
                )}

                <Checkbox
                    label={
                        <label>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Harum facilis eveniet velit id! Nisi dolore ea
                            adipisci? Laudantium provident, debitis officia
                            reprehenderit molestias inventore deserunt, quaerat
                            cum autem fuga eum.
                        </label>
                    }
                />
                <Checkbox
                    label={
                        <label>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Tenetur inventore voluptate magnam, laborum
                            impedit necessitatibus fuga, maiores ipsam eius aut
                            natus reprehenderit odit maxime delectus eum illo
                            voluptatem explicabo nemo quisquam voluptates
                            deserunt excepturi velit itaque dolore. Harum,
                            officia facilis?
                        </label>
                    }
                />

                {errorMessage && (
                    <Message size="mini" negative>
                        <Message.Content>
                            <Message.Header>{errorMessage}</Message.Header>
                        </Message.Content>
                    </Message>
                )}
                <br />
                <div className={styles.btnDiv}>
                    <Button primary type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </Layout>
    );
}
