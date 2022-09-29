import { useState } from "react";

export default async function signupAction(values){

    const email = values.email;
    const password = values.password;

    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }

    console.log(data);
    return 'hi';

}
