import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { Button } from "semantic-ui-react";

const Signup = (props) => {
    return (
        <Layout>
            <div className="flex container mx-auto h-96 items-center mt-5">
                <div className="text-center bg-blue-200 p-20">
                    <h1 className="text-5xl font-semibold h-16">
                        Looking for a Job ?
                    </h1>
                    <p className="text-xl">
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
                <div className="text-center bg-purple-100 p-20">
                    <h1 className="text-5xl font-semibold h-16">
                        Looking to hire some mentors ?
                    </h1>
                    <p className="text-xl">
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

            <div className="bg-red-200 h-15 text-2xl mt-6 text-center p-5">
                Already a member ? <Link href="/login">Log In here</Link>
            </div>
        </Layout>
    );
};

export default Signup;
