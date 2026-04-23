import { useState } from 'react';
import PageHero from '../components/PageHero';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you" breadcrumb="Contact" />

      <div className="contact-page">
        <div className="contact-layout">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Have a question or want to learn more about our services? Reach out — we'll respond within 24 hours.</p>

            <div className="contact-items">
              {[
                { icon: '📍', label: 'Address', value: '123 Style Avenue, Suite 4\nNew York, NY 10001' },
                { icon: '📞', label: 'Phone', value: '(555) 123-4567' },
                { icon: '✉', label: 'Email', value: 'hello@luxehair.com' },
                { icon: '🕐', label: 'Hours', value: 'Mon–Fri: 9am–7pm\nSat: 9am–6pm\nSun: 10am–4pm' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="contact-item">
                  <div className="contact-item__icon">{icon}</div>
                  <div>
                    <strong>{label}</strong>
                    <p>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success__icon">✅</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Send a Message</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" required />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" required />
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Your message..." required />
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
