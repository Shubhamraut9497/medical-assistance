import { db } from "./db";
import { hospitals, diseases } from "@shared/schema";

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
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    rating: 5,
    description: "Leading cardiac care center with state-of-the-art facilities and expert cardiologists.",
    ambulanceAvailable: true,
    ambulanceContact: "+1 (555) 100-2001",
    facilities: ["MRI", "CT Scan", "Echocardiography", "Cardiac Surgery", "Emergency Care"],
    insuranceAccepted: ["Blue Cross", "Aetna", "Cigna", "UnitedHealth"],
    visitingHours: "24/7 Emergency, 8AM-8PM General",
    emergencyWaitTime: "15-30 minutes",
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

const diseaseData = [
  {
    name: "Cardiac Emergency",
    category: "Cardiac",
    symptoms: ["Chest pain", "Shortness of breath", "Heart palpitations", "Nausea", "Sweating"],
    severity: "Critical",
    description: "A cardiac emergency occurs when there is a sudden, life-threatening problem with the heart or blood vessels.",
    firstAid: "Call 911 immediately. Help the person sit down and rest. If they have prescribed nitroglycerin, help them take it. Monitor their breathing and pulse.",
    whenToSeekHelp: "Seek immediate medical help for chest pain lasting more than 5 minutes, severe shortness of breath, or loss of consciousness.",
    prevention: "Maintain a healthy diet, exercise regularly, avoid smoking, manage stress, and control blood pressure and cholesterol.",
    relatedSpecializations: ["Cardiac", "General"],
    emergencyLevel: 5,
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },
  {
    name: "Stroke",
    category: "Neurological",
    symptoms: ["Sudden numbness", "Confusion", "Trouble speaking", "Vision problems", "Severe headache"],
    severity: "Critical",
    description: "A stroke occurs when blood flow to part of the brain is interrupted, causing brain cells to die.",
    firstAid: "Call 911 immediately. Note the time symptoms started. Keep the person calm and comfortable. Do not give them food or water.",
    whenToSeekHelp: "Seek immediate help for any sudden onset of stroke symptoms. Time is critical for treatment.",
    prevention: "Control blood pressure, manage diabetes, quit smoking, exercise regularly, and maintain a healthy diet.",
    relatedSpecializations: ["Neurological", "General"],
    emergencyLevel: 5,
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba0ef41?w=400&h=300&fit=crop",
  },
  {
    name: "Respiratory Emergency",
    category: "Respiratory",
    symptoms: ["Difficulty breathing", "Wheezing", "Chest tightness", "Rapid breathing", "Blue lips"],
    severity: "Critical",
    description: "A respiratory emergency occurs when breathing becomes difficult or stops completely.",
    firstAid: "Call 911 immediately. Help the person sit upright. If they have an inhaler, help them use it. Monitor their breathing.",
    whenToSeekHelp: "Seek immediate help for severe breathing difficulties, blue lips or fingernails, or inability to speak.",
    prevention: "Avoid triggers, take prescribed medications, get flu vaccines, and avoid smoking.",
    relatedSpecializations: ["Respiratory", "General"],
    emergencyLevel: 4,
    imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
  },
  {
    name: "Trauma",
    category: "Trauma",
    symptoms: ["Visible injuries", "Severe pain", "Bleeding", "Loss of consciousness", "Difficulty moving"],
    severity: "Critical",
    description: "Trauma refers to physical injuries caused by external forces such as accidents, falls, or violence.",
    firstAid: "Call 911 immediately. Control bleeding with direct pressure. Keep the person still and warm. Do not move them unless necessary.",
    whenToSeekHelp: "Seek immediate help for severe injuries, heavy bleeding, loss of consciousness, or suspected spinal injury.",
    prevention: "Wear seatbelts, use safety equipment, avoid risky behaviors, and maintain safe environments.",
    relatedSpecializations: ["Trauma", "General"],
    emergencyLevel: 5,
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
  },
  {
    name: "Burn Injury",
    category: "Burn",
    symptoms: ["Red, painful skin", "Blisters", "White or charred skin", "Swelling", "Shock"],
    severity: "Moderate",
    description: "Burn injuries occur when skin or other tissues are damaged by heat, chemicals, electricity, or radiation.",
    firstAid: "Cool the burn with cool running water for 10-15 minutes. Remove jewelry and tight clothing. Cover with clean cloth.",
    whenToSeekHelp: "Seek immediate help for burns larger than 3 inches, burns on face/hands/feet, or chemical/electrical burns.",
    prevention: "Use proper safety equipment, keep hot objects away from children, and install smoke detectors.",
    relatedSpecializations: ["Burn", "General"],
    emergencyLevel: 3,
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
  },
  {
    name: "Fracture",
    category: "Orthopedic",
    symptoms: ["Severe pain", "Swelling", "Bruising", "Deformity", "Inability to move"],
    severity: "Moderate",
    description: "A fracture is a broken bone that can occur due to trauma, osteoporosis, or overuse.",
    firstAid: "Immobilize the injured area. Apply ice to reduce swelling. Do not try to realign the bone. Seek medical attention.",
    whenToSeekHelp: "Seek immediate help for open fractures, fractures with severe deformity, or if the person cannot move the limb.",
    prevention: "Maintain bone health with calcium and vitamin D, exercise regularly, and use protective equipment during sports.",
    relatedSpecializations: ["Orthopedic", "General"],
    emergencyLevel: 3,
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
  },
];

async function seedDiseases() {
  try {
    console.log("Starting disease seed...");

    // Check if diseases already exist
    const existingDiseases = await db.select().from(diseases);
    
    if (existingDiseases.length > 0) {
      console.log(`Database already has ${existingDiseases.length} diseases. Skipping disease seed.`);
      return;
    }

    // Insert disease data
    for (const disease of diseaseData) {
      await db.insert(diseases).values(disease);
      console.log(`Added disease: ${disease.name}`);
    }

    console.log(`✅ Successfully seeded ${diseaseData.length} diseases`);
  } catch (error) {
    console.error("Error seeding diseases:", error);
    throw error;
  }
}

async function seedAll() {
  try {
    console.log("Starting database seed...");

    // Check if hospitals already exist
    const existingHospitals = await db.select().from(hospitals);
    
    if (existingHospitals.length > 0) {
      console.log(`Database already has ${existingHospitals.length} hospitals. Skipping hospital seed.`);
    } else {
      // Insert hospital data
      for (const hospital of hospitalData) {
        await db.insert(hospitals).values(hospital);
        console.log(`Added hospital: ${hospital.name}`);
      }

      console.log(`✅ Successfully seeded ${hospitalData.length} hospitals`);
    }

    // Seed diseases
    await seedDiseases();
    
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seedAll();
