import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { Segment, Grid, Dimmer, Loader } from "semantic-ui-react";
import getUser from "../../helpers/user";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const TeacherHomePage = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (!auth) {
            return router.push("/login");
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
