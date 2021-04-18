import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";
import { Segment, Grid, Dimmer, Loader } from "semantic-ui-react";
import getUser from "../../components/user";
import { useRouter } from "next/router";

const TeacherHomePage = (props) => {
    const { currentUser, setCurrentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push("/login");
        }
    }, []);

    return (
        <Layout>
            <Segment>
                {!currentUser?.profilePic && (
                    <Dimmer active>
                        <Loader size="mini">Loading</Loader>
                    </Dimmer>
                )}
                {currentUser?.profilePic && (
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10}>
                                <Header>{currentUser.name}</Header>
                                <p>{currentUser.description}</p>
                            </Grid.Column>
                            <Grid.Column width={6}></Grid.Column>
                        </Grid.Row>
                    </Grid>
                )}
            </Segment>
        </Layout>
    );
};

export default TeacherHomePage;
