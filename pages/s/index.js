import Layout from "../../components/Layout";
import { Segment, Grid, Dimmer, Loader } from "semantic-ui-react";
import getProfile from "../helpers/profile";
import { useSelector } from "react-redux";

const SchoolHomePage = (props) => {
    const auth = useSelector((state) => state.auth);
    const profile = getProfile();

    console.log({ auth, profile });

    return (
        <Layout>
            <Segment>
                {!profile?.loaded && (
                    <Dimmer active>
                        <Loader size="mini">Loading</Loader>
                    </Dimmer>
                )}
                {profile?.loaded && (
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10}>
                                <Header>{profile.name}</Header>
                                <p>{profile?.description}</p>
                            </Grid.Column>
                            <Grid.Column width={6}></Grid.Column>
                        </Grid.Row>
                    </Grid>
                )}
            </Segment>
        </Layout>
    );
};

export default SchoolHomePage;
