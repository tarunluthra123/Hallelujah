import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import styles from "../../styles/pages/signup-index.module.css";
import { Button } from "semantic-ui-react";

const Signup = (props) => {
    return (
        <Layout>
            <div className={styles.loginRedirectDiv}>
                Already a member ? <Link href="/login">Log In here</Link>
            </div>
            <div className={styles.containerDiv}>
                <div className={styles.teacherSide}>
                    <h1>Looking for a Job ?</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequatur beatae doloribus quaerat dignissimos quos
                        saepe, corporis pariatur, explicabo exercitationem quis
                        nisi aliquam fugit? Excepturi animi ad modi neque atque,
                        laboriosam corrupti error culpa voluptatem nihil
                        quisquam quo doloremque soluta ipsam?
                    </p>
                    <Link href="/signup/teacher">
                        <Button color="blue" size="huge">
                            Teacher
                        </Button>
                    </Link>
                </div>
                <div className={styles.schoolSide}>
                    <h1>Looking to hire some mentors ? </h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequatur beatae doloribus quaerat dignissimos quos
                        saepe, corporis pariatur, explicabo exercitationem quis
                        nisi aliquam fugit? Excepturi animi ad modi neque atque,
                        laboriosam corrupti error culpa voluptatem nihil
                        quisquam quo doloremque soluta ipsam?
                    </p>
                    <Link href="/signup/institute">
                        <Button color="violet" size="huge">
                            Institute
                        </Button>
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default Signup;
