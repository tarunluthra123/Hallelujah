import React, { useState, useRef } from "react";
import Layout from "../../components/Layout";
import {
    Form,
    Checkbox,
    Button,
    Input,
    Message,
    Icon,
    Select,
    Dropdown,
} from "semantic-ui-react";
import axios from "../../helpers/axios";
import styles from "../../styles/pages/signup-teacher.module.css";

const TeacherSignup = (props) => {
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [emailError, setEmailError] = useState(null);

    const genderRef = useRef(null);

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function submitForm(event) {
        const form = event.target;
        console.log(form);
        const [
            firstName,
            lastName,
            email,
            dob,
            username,
            password,
            confirmPassword,
            phoneNumber,
            firstCondition,
            secondCondition,
        ] = form.elements;

        if (firstName.value?.length == 0) {
            alert("First Name cannot be empty");
            return;
        }

        if (lastName.value?.length == 0) {
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

        if (dob.value.length == 0) {
            alert("Please fill in your Date of Birth");
            return;
        }

        const gender = genderRef.current?.state?.value;

        if (gender.length == 0) {
            alert("Please select a gender");
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
            name: firstName.value + " " + lastName.value,
            email: email.value,
            dob: dob.value,
            gender,
            username: username.value,
            password: password.value,
            phoneNumber: phoneNumber.value,
        };

        console.log({ data });

        axios
            .post("/api/auth/signupt", data)
            .then((r) => {
                console.log({ r });
                if (
                    r.status == 200 &&
                    r.data == "User registration successful"
                ) {
                    console.log("Successfully registered");
                    setErrorMessage(null);
                } else {
                    setErrorMessage(r.data);
                }
            })
            .catch((e) => {
                console.error({ e });
                setErrorMessage("Some error occurred.");
            });
    }

    async function emailBlurEvent(event) {
        const email = event.target.value;
        const ok = validateEmail(email);
        if (!ok) {
            return;
        }
        try {
            const response = await axios.get("/api/auth/emailverificationt", {
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
                "/api/auth/usernameverificationt",
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
            console.log({ err });
        }
    }

    function usernameOnFocus(event) {
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
            <h1>Teacher Signup</h1>
            <Form onSubmit={submitForm}>
                <Form.Group widths="equal">
                    <Form.Input
                        fluid
                        label="First name"
                        placeholder="First name"
                    />
                    <Form.Input
                        fluid
                        label="Last name"
                        placeholder="Last name"
                    />
                    <Form.Field>
                        <label>Gender</label>
                        <Dropdown
                            fluid
                            selection
                            placeholder="Gender"
                            ref={genderRef}
                            options={[
                                { key: "male", text: "Male", value: "male" },
                                {
                                    key: "female",
                                    text: "Female",
                                    value: "female",
                                },
                                { key: "other", text: "Other", value: "other" },
                            ]}
                        ></Dropdown>
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="john@abc.com"
                            onBlur={emailBlurEvent}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Date of Birth</label>
                        <Form.Input type="date"></Form.Input>
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
                <Form.Field>
                    <label>Phone Number:</label>
                    <Form.Input
                        type="number"
                        minLength="10"
                        maxLength="10"
                    ></Form.Input>
                </Form.Field>
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
                            elit. Harum facilis eveniet velit id! Nisi dolore ea
                            adipisci? Laudantium provident, debitis officia
                            reprehenderit molestias inventore deserunt, quaerat
                            cum autem fuga eum.
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
};

export default TeacherSignup;
