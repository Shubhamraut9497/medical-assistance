# GeminiHealthTrack - AI-Powered Medical Assistance Platform

A comprehensive healthcare application that uses Google's Gemini AI to analyze medical conditions and provide intelligent hospital recommendations based on symptoms, location, and specialization.

## 🚀 Features

### Core Functionality
- **AI-Powered Analysis**: Uses Gemini AI to analyze symptoms and categorize medical emergencies
- **Smart Hospital Matching**: Recommends hospitals based on specialization and proximity
- **Real-time Location Detection**: GPS-based location services for accurate distance calculations
- **Emergency Services**: Ambulance booking and emergency contact information

### Enhanced Features
- **Disease Information Database**: Comprehensive information about common medical conditions
- **Hospital Details**: Images, ratings, facilities, insurance acceptance, and visiting hours
- **Ambulance Services**: Real-time ambulance availability and booking
- **Progress Tracking**: AI analysis accuracy monitoring and improvement suggestions

## 🏥 Supported Medical Specializations

- **Cardiac**: Heart conditions, chest pain, cardiovascular emergencies
- **Neurological**: Stroke, brain injuries, neurological disorders
- **Respiratory**: Breathing difficulties, lung conditions, asthma
- **Trauma**: Accidents, injuries, emergency trauma care
- **Burn**: Burn injuries, thermal injuries, chemical burns
- **Orthopedic**: Fractures, bone injuries, joint problems
- **General**: General emergencies, multi-specialty care

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** components
- **React Query** for data fetching
- **Wouter** for routing

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Drizzle ORM** for database operations
- **PostgreSQL** with Neon database
- **Google Gemini AI** for medical analysis

### Development Tools
- **ESBuild** for bundling
- **Drizzle Kit** for database migrations
- **Concurrently** for running multiple processes

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shubhamraut9497/medical-assistance.git
   cd medical-assistance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your credentials:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   PORT=5000
   NODE_ENV=development
   VITE_API_URL=http://localhost:5000
   ```

4. **Set up the database**
   ```bash
   # Generate migrations
   npx drizzle-kit generate
   
   # Apply migrations
   npx drizzle-kit migrate
   
   # Seed the database
   npx tsx server/seed.ts
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🚀 Usage

### Development
```bash
# Start both client and server
npm run dev

# Start only the server
npm run server

# Start only the client
npm run client
```

### Production
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📱 How It Works

1. **Symptom Input**: User describes their symptoms or medical condition
2. **AI Analysis**: Gemini AI analyzes the input and categorizes the emergency
3. **Specialization Mapping**: System maps the analysis to hospital specializations
4. **Location Detection**: GPS detects user location for distance calculations
5. **Hospital Matching**: Finds hospitals matching the required specialization
6. **Results Display**: Shows recommended hospitals with detailed information
7. **Additional Services**: Provides disease information, ambulance services, and emergency contacts

## 🏥 Hospital Information

Each hospital includes:
- **Basic Info**: Name, address, contact number, specialization
- **Visual Details**: Images, ratings, descriptions
- **Services**: Emergency services, facilities, visiting hours
- **Practical Info**: Insurance acceptance, wait times, ambulance availability
- **Location**: GPS coordinates, distance, navigation links

## 🚑 Emergency Features

- **Ambulance Booking**: Direct contact with nearby ambulance services
- **Emergency Contacts**: Quick access to hospital emergency numbers
- **First Aid Information**: Step-by-step first aid instructions
- **Emergency Levels**: Color-coded emergency severity indicators
- **Real-time Updates**: Live ambulance availability and wait times

## 🔧 API Endpoints

### Core Endpoints
- `POST /api/analyze-condition` - Analyze medical condition
- `GET /api/latest-analysis` - Get latest analysis results
- `GET /api/hospitals` - Get all hospitals
- `GET /api/progress` - Get progress analytics

### Enhanced Endpoints
- `POST /api/location` - Get user location
- `GET /api/diseases` - Get all diseases
- `GET /api/diseases/:name` - Get specific disease info
- `GET /api/hospitals/ambulance` - Get hospitals with ambulance services

## 🗄️ Database Schema

### Tables
- **hospitals**: Hospital information and services
- **diseases**: Disease information and first aid
- **condition_analyses**: Analysis history and tracking
- **progress_analyses**: AI accuracy and improvement tracking

## 🎨 UI Components

- **Hospital Cards**: Detailed hospital information with images
- **Disease Info**: Comprehensive disease information with first aid
- **Ambulance Services**: Real-time ambulance availability
- **Location Display**: GPS coordinates and address information
- **Analysis Summary**: AI analysis results and recommendations

## 🔒 Security & Privacy

- **Data Protection**: No personal medical data stored permanently
- **Secure API**: Environment variables for sensitive information
- **CORS Protection**: Configured for secure cross-origin requests
- **Input Validation**: Zod schemas for data validation

## 📈 Performance Features

- **Image Optimization**: Optimized image loading with fallbacks
- **Caching**: React Query for efficient data caching
- **Lazy Loading**: Components loaded on demand
- **Error Handling**: Comprehensive error handling and fallbacks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for medical analysis capabilities
- **Unsplash** for medical imagery
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for utility-first styling

## 📞 Support

For support, email support@medicalassistance.com or create an issue in the repository.

---

**⚠️ Medical Disclaimer**: This application is for informational purposes only and should not replace professional medical advice. Always consult with qualified healthcare professionals for medical emergencies.
