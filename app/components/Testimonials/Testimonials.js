"use client";
import "./testimonials.css";

const testimonials = [
  {
    text: "YourBank has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances a breeze.",
    name: "Sara T",
  },
  {
    text: "I recently started my own business, and YourBank has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance and tailored solutions have been invaluable.",
    name: "John D",
  },
  {
    text: "I love the convenience of YourBank’s mobile banking app. It allows me to stay on top of my finances and make transactions on the go. The app is user-friendly and secure, giving me peace of mind.",
    name: "Emily G",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
        <div className="max-width">
      <div className="testimonials-header">
        <h2>
          Our <span>Testimonials</span>
        </h2>
        <p>
          Discover how YourBank has transformed lives with innovative digital solutions and personalized customer service.
        </p>
      </div>

      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial">
            <blockquote>
              <span className="quote-mark">“</span>
              {testimonial.text}
            </blockquote>
            <p className="testimonial-name">{testimonial.name}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
