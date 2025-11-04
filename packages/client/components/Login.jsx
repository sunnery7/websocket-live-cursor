import { useState } from "react";

export function Login({ onSubmit }) {
    const [username, setUsername] = useState('');

    return(
        <>
            <h1>Welcome</h1>
            <p>What should we call you?</p>

            <form onSubmit={e => {
                e.preventDefault();
                onSubmit(username);
            }}>
                <input 
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}