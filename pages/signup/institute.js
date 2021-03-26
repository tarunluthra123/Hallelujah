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
    const boardRef = useRef();

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function submitForm(event) {
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

        axios
            .post("/api/auth/signups", data)
            .then((response) => {
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
            })
            .catch((error) => {
                console.error({ error });
                setErrorMessage(error.message);
            });
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
                    <Form.Field
                        label="Email"
                        control={Input}
                        placeholder="john@abc.com"
                    />
                    <Form.Field>
                        <label>Phone Number:</label>
                        <Form.Input
                            type="number"
                            minLength="10"
                            maxLength="10"
                        ></Form.Input>
                    </Form.Field>
                </Form.Group>
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
}
