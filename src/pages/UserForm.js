import React, { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';

const UserForm = () => {

    const [userDetails, setUsers] = useState({
        email: "",
        exp: "",
        description: "",
        experience: "",
        languages: [],
        image: null
    });
    const [validationErrors, setValidationErrors] = useState({});
    const emailRef = useRef();
    const experienceRef = useRef();

    const handleEvent = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            // Handle checkbox inputs (languages)
            setUsers(prevUserDetails => ({
                ...prevUserDetails, languages: checked ? [...prevUserDetails.languages, value] : prevUserDetails.languages.filter(lang => lang !== value),
            }));
        } else if (type === 'file') {
            // Handle file input (image)
            setUsers((prevUserDetails) => ({
                ...prevUserDetails,
                [name]: files[0].name, // Store the selected image file in the state
            }));
        } else {
            // Handle other inputs
            setUsers(prevUserDetails => ({
                ...prevUserDetails,
                [name]: value,
            }));
        }
    }
    const validateForm = (formData) => {
        const errors = {};

        // Perform validation on each field and update the 'errors' object
        if (!formData.email) {
            errors.email = "Email address is required.";
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(formData.email)) {
                errors.email = "Invalid email address.";
            }
        }
        // Exp select option
        if (!formData.exp) {
            errors.exp = "Please select any one.";
        }
        if (!formData.description) {
            errors.description = "Please write anything.";
        }
        // Exp select option
        if (!userDetails.experience) {
            errors.experience = "Please select an option for experience.";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(userDetails);
        console.log(errors);
        setValidationErrors(errors);

        // Check if there are any validation errors
        if (Object.keys(errors).length === 0) {
            console.log("Form submitted:", userDetails);
            // You can perform further actions like API calls or data submission here
        }
    };

    return (
        <>
            <div className='container card mt-5'>
                <h3 style={{ fontWeight: "bold", textAlign: "center" }}>User-Form</h3><hr />
                <form onSubmit={handleSubmit}>
                    <div className="form-group mt-2">
                        <label htmlFor="exampleFormControlInput1">Email address</label>
                        <input
                            type="email"
                            onChange={handleEvent}
                            ref={emailRef}
                            value={userDetails.email}
                            name="email"
                            className={`form-control ${validationErrors.email ? "is-invalid" : ""}`}
                            id="exampleFormControlInput1"
                            placeholder="name@example.com"
                        />
                        {validationErrors.email && <div className="invalid-feedback">{validationErrors.email}</div>}
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="exampleFormControlSelect1">Level select</label>
                        <select name="exp" onChange={handleEvent} ref={experienceRef} className={`form-control ${validationErrors.exp ? "is-invalid" : ""}`} value={userDetails.exp} >
                            <option value="">-- select level --</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        {validationErrors.exp && <div className="invalid-feedback">{validationErrors.exp}</div>}
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="exampleFormControlTextarea1">Description</label>
                        <textarea onChange={handleEvent} name='description' value={userDetails.description} className={`form-control ${validationErrors.description ? "is-invalid" : ""}`} id="exampleFormControlTextarea1" rows={3} />
                        {validationErrors.description && <div className="invalid-feedback">{validationErrors.description}</div>}
                    </div>
                    <div className=' mt-2'>
                        <label>Experienced : </label>
                        <label>
                            <input
                                type="radio"
                                name="experience"
                                value="Yes"
                                checked={userDetails.experience === 'Yes'}
                                onChange={handleEvent}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="experience"
                                value="No"
                                checked={userDetails.experience === 'No'}
                                onChange={handleEvent}
                            />
                            No
                        </label>
                        <span>{validationErrors.experience && <div className="invalid-feedback" style={{ display: 'block' }}>{validationErrors.experience}</div>}</span>
                    </div>
                    <div className=' mt-2'>
                        <label>Languages : </label>
                        <label>
                            <input
                                type="checkbox"
                                name="languages"
                                value="English"
                                checked={userDetails.languages.includes('English')}
                                onChange={handleEvent}
                            />
                            English
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="languages"
                                value="Hindi"
                                checked={userDetails.languages.includes('Hindi')}
                                onChange={handleEvent}
                            />
                            Hindi
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="languages"
                                value="Gujarati"
                                checked={userDetails.languages.includes('Gujarati')}
                                onChange={handleEvent}
                            />
                            Gujarati
                        </label>
                    </div>
                    <div className=' mt-2'>
                        <label className="form-check-label" htmlFor="img">Select image : </label>
                        <input onChange={handleEvent} type="file" id="img" name="image" accept="image/*" />
                    </div>
                    <button type='submit' className='btn btn-success'>Save</button>
                </form><br></br>
            </div>
        </>
    )
}

export default UserForm