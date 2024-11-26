import React from "react";
import "./Footer.css"; // Make sure to create this CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>OUR LOCATION</h3>
          <p>No. 50, Moraketiya Road, Pallegama, Embilipitiya.</p>
          <a
            href="https://www.google.com/maps/place/Bika+Embilipitiya+-+%E0%B6%B6%E0%B7%92%E0%B6%9A+%E0%B6%87%E0%B6%B9%E0%B7%92%E0%B6%BD%E0%B7%92%E0%B6%B4%E0%B7%92%E0%B6%A7%E0%B7%92%E0%B6%BA/@6.334122,80.8523661,17z/data=!3m1!4b1!4m6!3m5!1s0x3ae401077d86a5b1:0x275bc8a8671bbb36!8m2!3d6.334122!4d80.854941!16s%2Fg%2F11l1jm11_v?entry=ttu&g_ep=EgoyMDI0MDgyMS4wIKXMDSoASAFQAw%3D%3D"
            className="get-direction-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Direction
          </a>
        </div>
        <div className="footer-section">
          <h3>OPENING HOURS</h3>
          <p>
            <strong>MONDAY TO FRIDAY</strong>
            <br />
            11AM - 10PM
          </p>
          <p>
            <strong>SATURDAY TO SUNDAY</strong>
            <br />
            11AM - 10PM
          </p>
        </div>
        <div className="footer-section">
          <h3>CONNECT WITH US</h3>
          <p>Stay updated with the latest news, offers, and more on our social media platforms.</p>
          <div className="social-icons1">
            <a
              href="https://www.facebook.com/people/Bika-Embilipitiya-Restaurant-%E0%B6%B6%E0%B7%92%E0%B6%9A-%E0%B6%87%E0%B6%B9%E0%B7%92%E0%B6%BD%E0%B7%92%E0%B6%B4%E0%B7%92%E0%B6%A7%E0%B7%92%E0%B6%BA/61551519525412/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/asankanchandima?igsh=MTdub3NkdzN3NDV6cg=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.tiktok.com/@biriyanikade?_t=8oxzwrN6MPC&_r=1https://www.instagram.com/asankanchandima?igsh=MTdub3NkdzN3NDV6cg==https://wa.me/94777123766https://www.facebook.com/people/Bika-Embilipitiya-Restaurant-%E0%B6%B6%E0%B7%92%E0%B6%9A-%E0%B6%87%E0%B6%B9%E0%B7%92%E0%B6%BD%E0%B7%92%E0%B6%B4%E0%B7%92%E0%B6%A7%E0%B7%92%E0%B6%BA/61551519525412/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2024</p>
        <p>Powered by Bika Embilipitiya</p>
      </div>
    </footer>
  );
};

export default Footer;
