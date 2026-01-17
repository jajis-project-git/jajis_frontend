# Jajis Frontend - React Application

A modern React frontend for the Jajis Django REST API, featuring a comprehensive beauty and lifestyle services website.

## Features

- **Modern UI/UX**: Built with Tailwind CSS for beautiful, responsive design
- **React Router**: Client-side routing for smooth navigation
- **API Integration**: Connected to Django REST API backend
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Loading States**: Proper loading and error handling
- **Form Handling**: Interactive contact form with validation

## Pages

1. **Home** - Landing page with banner images and service overview
2. **Salons** - Beauty salon services and offerings
3. **Cosmetics** - Beauty products and categories
4. **Event Hall** - Event venue booking and services
5. **Food Court** - Restaurant options and dining information
6. **Designing & Stitching** - Custom fashion design services
7. **Academy** - Training programs and courses
8. **Franchise** - Franchise opportunities and information
9. **About Us** - Company information and team details
10. **Contact** - Contact form and business information

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Django backend running on `http://localhost:8000`

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd jajis_frondend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation component
│   └── Footer.jsx      # Footer component
├── pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── Salons.jsx      # Salons page
│   ├── Cosmetics.jsx   # Cosmetics page
│   ├── EventHall.jsx   # Event Hall page
│   ├── FoodCourt.jsx   # Food Court page
│   ├── DesigningStitching.jsx  # Designing & Stitching page
│   ├── Academy.jsx     # Academy page
│   ├── Franchise.jsx   # Franchise page
│   ├── AboutUs.jsx     # About Us page
│   └── Contact.jsx     # Contact page
├── services/           # API services
│   └── api.js         # API configuration and functions
├── App.jsx            # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles (Tailwind)
```

## API Integration

The frontend connects to the Django REST API with the following endpoints:

- `GET /api/pages/home/` - Home page data
- `GET /api/pages/salons/` - Salons page data
- `GET /api/pages/cosmetics/` - Cosmetics page data
- `GET /api/pages/event-hall/` - Event Hall page data
- `GET /api/pages/food-court/` - Food Court page data
- `GET /api/pages/designing-stitching/` - Designing & Stitching page data
- `GET /api/pages/academy/` - Academy page data
- `GET /api/pages/franchise/` - Franchise page data
- `GET /api/pages/about-us/` - About Us page data
- `GET /api/pages/contact/` - Contact page data

## Styling

The application uses **Tailwind CSS** for styling with:
- Purple and pink gradient theme
- Responsive grid layouts
- Hover effects and transitions
- Modern card designs
- Mobile-first responsive design

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Configuration

### API Base URL
The API base URL is configured in `src/services/api.js`. Update the `baseURL` if your Django backend runs on a different port or host.

### Environment Variables
Create a `.env` file in the root directory for environment-specific configurations:

```env
VITE_API_BASE_URL=http://localhost:8000/api/pages/
```

## Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your web server or hosting platform.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository.
