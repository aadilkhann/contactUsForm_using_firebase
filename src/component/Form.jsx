import React, { useState } from 'react'

const Form = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        phoneno: "",
        add: "",
        msg: "",
    })

    let name, value;
    const getUserData = (event) => {
        name = event.target.name;
        value = event.target.value;
        console.log(name)
        console.log(value)

        setUser({ ...user, [name]: value })
    }

    const postData = async (e) => {
        e.preventDefault();
        const { name, email, phoneno, add, msg } = user;
        let resp = await fetch(
            'https://contactform-49e9f-default-rtdb.firebaseio.com/contactus.json',
            {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    phoneno,
                    add,
                    msg
                })
            }
        )
        if (resp) {
            setUser({
                name: "",
                email: "",
                phoneno: "",
                add: "",
                msg: "",
            })
            alert("Form Submitted Sucessfully")
        }
    }

    return (
        <div>
            <h1>Enter Your Details</h1>
            <form method='POST'>
                <p>Your Name</p>
                <input type="text" name='name' placeholder='Enter your Name' value={user.name} onChange={getUserData} />
                <p>Email</p>
                <input type="email" name="email" id="" placeholder='Enter your email' value={user.email} onChange={getUserData} />
                <p>Phone Number</p>
                <input type="number" name="phoneno" id="   " placeholder='Enter your phone no.' value={user.phoneno} onChange={getUserData} />
                <p>Address</p>
                <input type="text" name='add' placeholder='Enter your address' value={user.add} onChange={getUserData} />
                <p>Message</p>
                <input type="text" name='msg' placeholder='Enter your message' value={user.msg} onChange={getUserData} /><br />
                <button onClick={postData}>Submit</button>

            </form>
        </div>
    )
}

export default Form
