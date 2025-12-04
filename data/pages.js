// Static pages data

const pages = [
  {
    id: "page_001",
    slug: "privacy-policy",
    title: "Privacy Policy",
    link: "/privacy-policy",
    content: `
      <h2>Privacy Policy</h2>
      <p>Last updated: January 1, 2024</p>
      
      <h3>1. Information We Collect</h3>
      <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
      
      <h3>2. How We Use Your Information</h3>
      <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
      
      <h3>3. Information Sharing</h3>
      <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
      
      <h3>4. Data Security</h3>
      <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or destruction.</p>
      
      <h3>5. Contact Us</h3>
      <p>If you have questions about this Privacy Policy, please contact us at support@myawesomestore.com</p>
    `,
    isActive: true,
    showInFooter: true,
    order: 1,
  },
  {
    id: "page_002",
    slug: "terms-of-service",
    title: "Terms of Service",
    link: "/terms-of-service",
    content: `
      <h2>Terms of Service</h2>
      <p>Last updated: January 1, 2024</p>
      
      <h3>1. Acceptance of Terms</h3>
      <p>By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.</p>
      
      <h3>2. Use of Service</h3>
      <p>You agree to use our service only for lawful purposes and in accordance with these Terms.</p>
      
      <h3>3. User Accounts</h3>
      <p>You are responsible for maintaining the confidentiality of your account and password.</p>
      
      <h3>4. Products and Pricing</h3>
      <p>All prices are subject to change without notice. We reserve the right to modify or discontinue any product at any time.</p>
      
      <h3>5. Limitation of Liability</h3>
      <p>We shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.</p>
    `,
    isActive: true,
    showInFooter: true,
    order: 2,
  },
  {
    id: "page_003",
    slug: "refund-policy",
    title: "Refund Policy",
    link: "/refund-policy",
    content: `
      <h2>Refund Policy</h2>
      <p>Last updated: January 1, 2024</p>
      
      <h3>1. Return Window</h3>
      <p>We offer a 30-day return policy on all products. Items must be returned in their original condition with all tags attached.</p>
      
      <h3>2. Eligibility</h3>
      <p>To be eligible for a return, your item must be unused and in the same condition that you received it.</p>
      
      <h3>3. Refund Process</h3>
      <p>Once we receive your returned item, we will inspect it and notify you of the approval or rejection of your refund.</p>
      
      <h3>4. Refund Timeline</h3>
      <p>If approved, your refund will be processed within 5-7 business days to your original payment method.</p>
      
      <h3>5. Non-Refundable Items</h3>
      <p>Certain items like perishable goods, gift cards, and downloadable software are non-refundable.</p>
    `,
    isActive: true,
    showInFooter: true,
    order: 3,
  },
  {
    id: "page_004",
    slug: "shipping-policy",
    title: "Shipping Policy",
    link: "/shipping-policy",
    content: `
      <h2>Shipping Policy</h2>
      <p>Last updated: January 1, 2024</p>
      
      <h3>1. Processing Time</h3>
      <p>Orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed the next business day.</p>
      
      <h3>2. Shipping Options</h3>
      <ul>
        <li><strong>Standard Shipping:</strong> 5-7 business days - Free on orders above ₹499</li>
        <li><strong>Express Shipping:</strong> 2-3 business days - ₹99</li>
        <li><strong>Same Day Delivery:</strong> Available in select cities - ₹199</li>
      </ul>
      
      <h3>3. Tracking</h3>
      <p>You will receive a tracking number via email and SMS once your order has been shipped.</p>
      
      <h3>4. Delivery Areas</h3>
      <p>We currently deliver across India. International shipping is not available at this time.</p>
    `,
    isActive: true,
    showInFooter: true,
    order: 4,
  },
  {
    id: "page_005",
    slug: "about-us",
    title: "About Us",
    link: "/about",
    content: `
      <h2>About Us</h2>
      
      <h3>Our Story</h3>
      <p>Founded in 2024, My Awesome Store started with a simple mission: to provide quality products at affordable prices.</p>
      
      <h3>Our Mission</h3>
      <p>We strive to deliver the best shopping experience with excellent customer service and fast delivery.</p>
      
      <h3>Our Values</h3>
      <ul>
        <li>Quality First</li>
        <li>Customer Satisfaction</li>
        <li>Integrity & Trust</li>
        <li>Innovation</li>
      </ul>
    `,
    isActive: true,
    showInFooter: false,
    order: 5,
  },
  {
    id: "page_006",
    slug: "contact-us",
    title: "Contact Us",
    link: "/contact",
    content: `
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Reach out to us through any of the following channels:</p>
      
      <h3>Email</h3>
      <p>support@myawesomestore.com</p>
      
      <h3>Phone</h3>
      <p>+91 9876543210</p>
      
      <h3>Address</h3>
      <p>123 Commerce Street, Tech Park<br>Bangalore, Karnataka 560001<br>India</p>
      
      <h3>Business Hours</h3>
      <p>Monday - Saturday: 9:00 AM - 6:00 PM<br>Sunday: Closed</p>
    `,
    isActive: true,
    showInFooter: false,
    order: 6,
  },
];

module.exports = pages;
