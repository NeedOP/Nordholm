import "../styles/contact.css";

function Contact() {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>

            <p>
                Nordholm EL & BYGG provides electrical and construction services
                with a focus on quality, safety, and modern solutions.
            </p>

            <div className="contact-info">
                <p><strong>Email:</strong> info@nordholmbygg.se</p>
                <p><strong>Phone:</strong> +46 70 123 45 67</p>
                <p><strong>Address:</strong> Stockholm, Sweden</p>
            </div>

            <div className="contact-form">
                <input placeholder="Your name" />
                <input placeholder="Your email" />
                <textarea placeholder="Your message" />

                <button>Send Message</button>
            </div>
        </div>
    );
}

export default Contact;
