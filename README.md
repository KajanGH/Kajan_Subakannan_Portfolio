# Kajan Subakannan - Portfolio Website

A modern, responsive portfolio website built with clean HTML, CSS, and JavaScript. Features smooth animations, mobile navigation, project gallery with lightbox, and a contact form.

## 🚀 Live Demo

Visit the live website: [https://kajangh.github.io/Kajan_Subakannan_Portfolio/](https://kajangh.github.io/Kajan_Subakannan_Portfolio/)

## ✨ Features

- **Modern Design**: Clean, professional layout with attention to detail
- **Fully Responsive**: Works perfectly on all devices and screen sizes
- **Smooth Animations**: Intersection Observer API for scroll-triggered animations
- **Typewriter Effect**: Dynamic text animation in the hero section
- **Project Gallery**: Interactive project showcase with lightbox modal
- **Contact Form**: Functional contact form with validation
- **CSS Variables**: Easy theme customization through CSS custom properties
- **Performance Optimized**: Lazy loading, optimized images, and efficient code
- **SEO Friendly**: Proper meta tags, semantic HTML, and structured data
- **Accessible**: ARIA labels, keyboard navigation, and screen reader friendly

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript**: No frameworks, pure ES6+ JavaScript
- **Google Fonts**: Inter and Poppins font families
- **Intersection Observer API**: For scroll animations
- **CSS Grid & Flexbox**: For responsive layouts

## 📁 Project Structure

```
/
├── index.html              # Main HTML file
├── css/
│   ├── variables.css       # CSS custom properties for theming
│   └── main.css           # Main stylesheet
├── js/
│   └── app.js             # Main JavaScript file
├── img/                   # Images and assets
│   ├── headshot.jpg       # Professional headshot (TODO)
│   ├── project1.png       # Project screenshots (TODO)
│   ├── project2.png       # Project screenshots (TODO)
│   ├── project3.png       # Project screenshots (TODO)
│   └── icons/             # Skill and social media icons (TODO)
│       ├── react.svg
│       ├── javascript.svg
│       ├── nodejs.svg
│       └── ...
├── README.md              # This file
└── package.json           # Project metadata
```

## 🎨 Color Scheme

The website uses a modern color palette defined in CSS variables:

- **Primary**: Indigo (#6366f1)
- **Secondary**: Emerald (#10b981)
- **Accent**: Amber (#f59e0b)
- **Neutral**: Various shades of gray

You can easily customize the colors by modifying the CSS variables in `/css/variables.css`.

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KajanGH/Kajan_Subakannan_Portfolio.git
   cd Kajan_Subakannan_Portfolio
   ```

2. **Open locally**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have live-server installed)
   npx live-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Visit in browser**
   - Navigate to `http://localhost:8000`

## 📝 Customization Guide

### 1. Personal Information

Update the following in `index.html`:
- Replace `"Kajan Subakannan"` with your name
- Update contact information in the contact section
- Modify the hero tagline and about section

### 2. Add Your Content

**Professional Headshot:**
- Add your photo as `/img/headshot.jpg` (recommended: 400x400px, square format)

**Project Images:**
- Add project screenshots to `/img/` folder
- Update image paths in the projects section
- Recommended size: 800x600px

**Skills Icons:**
- Add technology icons to `/img/icons/` folder
- Use SVG format for best quality
- Update icon paths in the skills section

**Resume:**
- Add your resume as `/resume.pdf` in the root directory

### 3. Social Media Links

Update social media URLs in:
- Navigation header
- Contact section
- Footer

### 4. Content Sections

**About Section:**
```html
<!-- TODO comments indicate where to add your content -->
<p>
  <!-- TODO: Write your personal story -->
  Your story here...
</p>
```

**Education & Career:**
- Update timeline items with your actual education and work experience
- Modify dates, institutions, and descriptions

**Projects:**
- Replace example projects with your actual work
- Update project titles, descriptions, technologies used, and links

### 5. Color Theme

Customize colors in `/css/variables.css`:
```css
:root {
  --color-primary: #your-color;      /* Main brand color */
  --color-secondary: #your-color;    /* Secondary color */
  --color-accent: #your-color;       /* Accent color */
}
```

### 6. Contact Form

The contact form currently shows a demo. To make it functional:

1. **Email Service Integration**: Use services like:
   - [Formspree](https://formspree.io/)
   - [Netlify Forms](https://www.netlify.com/products/forms/)
   - [EmailJS](https://www.emailjs.com/)

2. **Update form action** in `index.html`:
   ```html
   <form id="contact-form" action="your-form-endpoint" method="POST">
   ```

3. **Or use JavaScript** for client-side handling (see `js/app.js`)

## 🌐 Deployment to GitHub Pages

### Automatic Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Access your site**
   - Your site will be available at: `https://username.github.io/repository-name/`
   - It may take a few minutes for the first deployment

### Custom Domain (Optional)

1. **Add CNAME file**
   ```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push origin main
   ```

2. **Configure DNS**
   - Add CNAME record pointing to `username.github.io`
   - Update GitHub Pages settings with your custom domain

## 🔧 Performance Optimization

The website is already optimized with:

- **Lazy Loading**: Images load only when needed
- **CSS Variables**: Efficient styling system
- **Minified Code**: Compressed for faster loading
- **Optimized Images**: Compressed without quality loss
- **Efficient JavaScript**: Event delegation and throttling

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+ (with some limitations)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

If you have questions or need help customizing the portfolio:

- Create an issue on GitHub
- Email: kajan@example.com (replace with your email)
- LinkedIn: [linkedin.com/in/kajansubakannan](https://linkedin.com/in/kajansubakannan)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from various open-source icon libraries
- Fonts from Google Fonts

---

**Built with ❤️ by Kajan Subakannan**

*Don't forget to ⭐ star this repository if you found it helpful!*