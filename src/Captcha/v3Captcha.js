import React, { useState } from 'react'
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";

function V3captcha() {
    const [username, setValue] = useState("");
    const [captchaValue, setToken] = useState("");
    const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

    const HandleChange = (e) => {
        setValue(e.target.value);
        console.log(username);
    }

    const HandleSubmit = async (e) => {
        alert(captchaValue)
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8000/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    captchaValue,
                }),
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            setRefreshReCaptcha(!refreshReCaptcha);
            console.log(err);
        }
    };

    const setTokenFunc = (getToken) => {
        // console.log("TOkenValue: " + getToken);
        setToken(getToken);
    };
    return (
        <>
            <h3>V3 Captcha using React</h3>
            <div>
                <form onSubmit={HandleSubmit}>
                    <label>Enter Name please</label>
                    <p>
                        <input type='text' name='username' onChange={HandleChange}></input>
                    </p>
                    <p>
                        <button type='submit'>Submit</button>
                    </p>
                    <GoogleReCaptchaProvider reCaptchaKey="6LfKoQgqAAAAAK11E5PYIQzHShGe35-w4spuXrCh">
                        <GoogleReCaptcha
                            className="google-recaptcha-custom-class"
                            onVerify={setTokenFunc}
                            refreshReCaptcha={refreshReCaptcha}
                        />
                    </GoogleReCaptchaProvider>
                </form>
            </div>
        </>
    )
};


export default V3captcha;
