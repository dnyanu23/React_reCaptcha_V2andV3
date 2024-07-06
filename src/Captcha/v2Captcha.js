import React, { useRef } from 'react'
import ReCAPTCHA from "react-google-recaptcha";

function V2captcha() {

    const captchaRef = useRef(null);

    const HandleSubmit = async (e) => {
        e.preventDefault();
        const captchaValue = captchaRef.current.getValue();

        if (!captchaValue) {
            alert("Please fill the captach first");
        }
        else {
            const res = await fetch("http://localhost:8000/verify", {
                method: "POST",
                body: JSON.stringify({ captchaValue }),
                headers: {
                    "content-type": "application/json",
                },
            });
            const data = await res.json();
            if (data.success) {
                // make form submission
                console.log(data);
                alert("Form submission successful!");
            } else {
                alert("reCAPTCHA validation failed!");
            }
        }


        captchaRef.current.reset();
    }


    return (
        <>
            <h3>V2 Captcha using React</h3>
            <form onSubmit={HandleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" className="input" />

                <ReCAPTCHA
                    sitekey="6LdDewgqAAAAABiRaD92Croo69rVsl9vahSntj2T"
                    ref={captchaRef}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
};


export default V2captcha;
