import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import logo from './logo.jpg';


const ComplaintForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'complaint',
        message: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/submit`, formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Failed to submit complaint');
        }
    };

    return (
        <div className="container">
            <img src={logo} alt="NexaScale Logo" width="100" height="100" />
            <h1>Submit a Complaint or Suggestion</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Type:</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="complaint">Complaint</option>
                    <option value="suggestion">Suggestion</option>
                </select>

                <label>Message:</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>

                <button type="submit">Submit</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ComplaintForm;
