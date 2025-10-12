import { db } from "./db";
import { hospitals } from "@shared/schema";

const hospitalData = [
  // Cardiac Hospitals
  {
    name: "Apollo Heart Centre",
    specialization: "Cardiac",
    address: "123 Medical Plaza, Downtown",
    distance: "2.1 km",
    contactNumber: "+1 (555) 100-2000",
    emergencyServices: ["24/7 Cardiac Care", "ICU", "Ambulance", "Cath Lab"],
    mapUrl: "https://maps.google.com/?q=Apollo+Heart+Centre",
    available: true,
    latitude: "40.7128",
    longitude: "-74.0060",
  },
  {
    name: "Fortis Cardiac Unit",
    specialization: "Cardiac",
    address: "456 Health Street, Medical District",
    distance: "3.4 km",
    contactNumber: "+1 (555) 200-3000",
    emergencyServices: ["Advanced Cardiology", "Emergency Surgery", "ICU"],
    mapUrl: "https://maps.google.com/?q=Fortis+Cardiac+Unit",
    available: true,
    latitude: "40.7589",
    longitude: "-73.9851",
  },
  {
    name: "CityCare Heart Hospital",
    specialization: "Cardiac",
    address: "789 Wellness Ave, City Center",
    distance: "4.7 km",
    contactNumber: "+1 (555) 300-4000",
    emergencyServices: ["Cardiac Support", "Monitoring", "Ambulance"],
    mapUrl: "https://maps.google.com/?q=CityCare+Heart+Hospital",
    available: true,
    latitude: "40.7580",
    longitude: "-73.9855",
  },

  // Trauma Centers
  {
    name: "Metro Trauma Center",
    specialization: "Trauma",
    address: "321 Emergency Blvd, North Quarter",
    distance: "1.8 km",
    contactNumber: "+1 (555) 400-5000",
    emergencyServices: ["Level 1 Trauma", "Emergency Surgery", "Helicopter Transport", "ICU"],
    mapUrl: "https://maps.google.com/?q=Metro+Trauma+Center",
    available: true,
    latitude: "40.7614",
    longitude: "-73.9776",
  },
  {
    name: "Regional Emergency Hospital",
    specialization: "Trauma",
    address: "654 Rescue Road, East Side",
    distance: "3.2 km",
    contactNumber: "+1 (555) 500-6000",
    emergencyServices: ["Trauma Care", "Orthopedic Surgery", "Ambulance"],
    mapUrl: "https://maps.google.com/?q=Regional+Emergency+Hospital",
    available: true,
    latitude: "40.7489",
    longitude: "-73.9680",
  },

  // Neurological Centers
  {
    name: "NeuroHealth Institute",
    specialization: "Neurological",
    address: "987 Brain Way, Science Park",
    distance: "2.5 km",
    contactNumber: "+1 (555) 600-7000",
    emergencyServices: ["Stroke Unit", "Neurosurgery", "CT/MRI 24/7", "Ambulance"],
    mapUrl: "https://maps.google.com/?q=NeuroHealth+Institute",
    available: true,
    latitude: "40.7549",
    longitude: "-73.9840",
  },
  {
    name: "Central Neuroscience Center",
    specialization: "Neurological",
    address: "147 Neural Plaza, Medical Hub",
    distance: "4.1 km",
    contactNumber: "+1 (555) 700-8000",
    emergencyServices: ["Emergency Neurology", "Stroke Care", "ICU"],
    mapUrl: "https://maps.google.com/?q=Central+Neuroscience+Center",
    available: true,
    latitude: "40.7505",
    longitude: "-73.9934",
  },

  // Respiratory Centers
  {
    name: "PulmonaryCare Hospital",
    specialization: "Respiratory",
    address: "258 Breath Street, Health District",
    distance: "2.9 km",
    contactNumber: "+1 (555) 800-9000",
    emergencyServices: ["Respiratory ICU", "Ventilator Support", "Pulmonology", "Ambulance"],
    mapUrl: "https://maps.google.com/?q=PulmonaryCare+Hospital",
    available: true,
    latitude: "40.7484",
    longitude: "-73.9857",
  },
  {
    name: "Airways Medical Center",
    specialization: "Respiratory",
    address: "369 Oxygen Lane, West End",
    distance: "3.8 km",
    contactNumber: "+1 (555) 900-1000",
    emergencyServices: ["Emergency Breathing Support", "Asthma Care", "COVID Unit"],
    mapUrl: "https://maps.google.com/?q=Airways+Medical+Center",
    available: true,
    latitude: "40.7690",
    longitude: "-73.9781",
  },

  // Burn Centers
  {
    name: "SkinCare Burn Unit",
    specialization: "Burn",
    address: "741 Recovery Road, South District",
    distance: "5.2 km",
    contactNumber: "+1 (555) 101-2000",
    emergencyServices: ["Burn ICU", "Plastic Surgery", "Wound Care", "Ambulance"],
    mapUrl: "https://maps.google.com/?q=SkinCare+Burn+Unit",
    available: true,
    latitude: "40.7282",
    longitude: "-73.9942",
  },
  {
    name: "Advanced Burn Treatment Center",
    specialization: "Burn",
    address: "852 Healing Ave, Medical Campus",
    distance: "6.1 km",
    contactNumber: "+1 (555) 202-3000",
    emergencyServices: ["Specialized Burn Care", "Skin Grafting", "Rehabilitation"],
    mapUrl: "https://maps.google.com/?q=Advanced+Burn+Treatment",
    available: true,
    latitude: "40.7410",
    longitude: "-73.9896",
  },

  // Orthopedic Centers
  {
    name: "BoneCare Orthopedic Hospital",
    specialization: "Orthopedic",
    address: "963 Fracture Street, Sports Complex",
    distance: "3.5 km",
    contactNumber: "+1 (555) 303-4000",
    emergencyServices: ["Fracture Care", "Emergency Orthopedic Surgery", "Sports Medicine"],
    mapUrl: "https://maps.google.com/?q=BoneCare+Orthopedic",
    available: true,
    latitude: "40.7614",
    longitude: "-73.9598",
  },

  // General Emergency
  {
    name: "General City Hospital",
    specialization: "General",
    address: "159 Main Street, City Square",
    distance: "1.2 km",
    contactNumber: "+1 (555) 404-5000",
    emergencyServices: ["24/7 Emergency", "General Surgery", "ICU", "Ambulance"],
    mapUrl: "https://maps.google.com/?q=General+City+Hospital",
    available: true,
    latitude: "40.7580",
    longitude: "-73.9819",
  },
  {
    name: "Community Medical Center",
    specialization: "General",
    address: "357 Community Blvd, Suburban Area",
    distance: "7.3 km",
    contactNumber: "+1 (555) 505-6000",
    emergencyServices: ["Emergency Room", "Urgent Care", "Family Medicine"],
    mapUrl: "https://maps.google.com/?q=Community+Medical+Center",
    available: true,
    latitude: "40.7831",
    longitude: "-73.9712",
  },
];

async function seed() {
  try {
    console.log("Starting database seed...");

    // Check if hospitals already exist
    const existingHospitals = await db.select().from(hospitals);
    
    if (existingHospitals.length > 0) {
      console.log(`Database already has ${existingHospitals.length} hospitals. Skipping seed.`);
      return;
    }

    // Insert hospital data
    for (const hospital of hospitalData) {
      await db.insert(hospitals).values(hospital);
      console.log(`Added hospital: ${hospital.name}`);
    }

    console.log(`✅ Successfully seeded ${hospitalData.length} hospitals`);
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seed();
