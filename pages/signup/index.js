import React from "react";
import Link from "next/link";

const Signup = (props) => {
    return (
        <>
            <Link href="/signup/teacher">
                <button>Teacher</button>
            </Link>
            <Link href="/signup/institute">
                <button>Institue</button>
            </Link>
        </>
    );
};

export default Signup;
