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

        console.log(data);

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
                    <Form.Field
                        control={Input}
                        label="Email"
                        placeholder="john@abc.com"
                    />
                    <Form.Field>
                        <label>Date of Birth</label>
                        <Form.Input type="date"></Form.Input>
                    </Form.Field>
                </Form.Group>
                <Form.Field width="16">
                    <label>Username</label>
                    <Form.Input
                        type="text"
                        placeholder="john_doe"
                        height="100%"
                    ></Form.Input>
                </Form.Field>
                <Message icon size="mini">
                    <Icon name="circle notched" loading />
                    <Message.Content>
                        <Message.Header>Just one second</Message.Header>
                        Validating username
                    </Message.Content>
                </Message>
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
