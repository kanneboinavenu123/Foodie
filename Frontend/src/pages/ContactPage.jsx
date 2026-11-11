import React, { useState } from 'react'
import API_URL from '../config/app';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = 'Enter valid email';
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 15) e.phone = 'Enter valid phone number';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to send message");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
     <div className="p-10">
        <div className="contact-container">
            <form onSubmit={handleSubmit} className="contact-form">
           <div className="form-group">
                <label>Name</label>
                <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={errors.name ? 'error' : ''}/>
                {errors.name && <p className="error-text">{errors.name}</p>}
           </div>

            <div className="form-group">
                <label>Email:</label>
                <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={errors.email ? 'error' : ''}/>
                {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="form-group">
            <label>Mobile Number:</label>
                <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className={errors.phone ? 'error' : ''}/>
                {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>

            <div className="form-group">
                <label>Message:</label>
                <textarea
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us your thoughts..."
                className={errors.message ? 'error' : ''}>
                </textarea>
                {errors.message && <p className="error-text">{errors.message}</p>}
            </div>

            <button type="submit" className="submit-btn" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && <p role="status">Message sent successfully!</p>}
            {status && status !== 'success' && status !== 'sending' && <p role="alert">{status}</p>}
  </form>
</div>

        </div>
  )
}

export default ContactPage