/**
 * DroneTV Master Site Content
 * ============================================================================
 * ALL DroneTV business content (services, courses, contact details, FAQ answers)
 * is maintained in this single editable file.
 * ============================================================================
 */

export const siteContent = {
  // Company Overview & Identity
  company: {
    name: "DroneTV",
    tagline: "India's Premier Industrial Drone Solutions & DGCA Pilot Academy",
    shortDescription: "Pioneering commercial aerial intelligence, precision agricultural drone operations, and DGCA-certified pilot training across India.",
    foundedYear: "2021",
    headquarters: "Bengaluru, Karnataka, India",
    registrationId: "DTV-UAM-KA03-2021",
    dgcaAccreditation: "DGCA RPTO Authorization No. RPTO/048/2022"
  },

  // Contact Information
  contact: {
    email: "contact@dronetv.in",
    supportEmail: "support@dronetv.in",
    phone: "+91 98000 00000",
    whatsapp: "+91 98000 00000",
    officeAddress: "Suite 402, Aerospace Tech Park, Electronic City, Bengaluru, Karnataka 560100",
    flyingFieldAddress: "DroneTV Flight Testing Range & Airfield, Devanahalli, Bengaluru Rural 562110",
    workingHours: "Monday – Saturday: 9:30 AM – 6:30 PM IST (Sundays by appointment)",
    socialLinks: {
      linkedin: "https://linkedin.com/company/dronetv",
      youtube: "https://youtube.com/@dronetv",
      instagram: "https://instagram.com/dronetv.in",
      twitter: "https://x.com/dronetv"
    }
  },

  // Industrial Drone Services Offered
  services: [
    {
      id: "agricultural-spraying",
      title: "Agricultural Spraying & Crop Health",
      category: "Agriculture",
      shortDescription: "Ultra-low volume fertilizer and pesticide spraying with multi-spectral crop stress mapping.",
      fullDescription: "Deploy high-payload agricultural drones designed to treat up to 30 acres per day. Reduce chemical waste by 30%, safeguard farmer health, and pinpoint crop stress using normalized difference vegetation index (NDVI) telemetry.",
      features: [
        "Up to 30 liters payload capacity",
        "Autonomous obstacle avoidance and terrain following",
        "Precision variable-rate liquid application",
        "NDVI multispectral vegetation analysis"
      ],
      idealFor: "Farming cooperatives, corporate plantations, agri-input enterprises",
      turnaroundTime: "24 to 48 hours per cluster"
    },
    {
      id: "aerial-survey-mapping",
      title: "Aerial Survey & 3D Photogrammetry",
      category: "GIS & Surveying",
      shortDescription: "Centimeter-accurate topographic mapping, LiDAR terrain models, and GIS contour generation.",
      fullDescription: "High-precision aerial surveying utilizing RTK/PPK enabled drones and LiDAR sensors. Deliver engineering-grade orthomosaics, digital surface models (DSM), and volumetric stockpiling calculations.",
      features: [
        "Sub-3cm GSD absolute spatial accuracy",
        "Dense point-cloud classification and contour generation",
        "High-density LiDAR penetration through dense foliage",
        "Seamless CAD, GIS, and BIM file export compatibility"
      ],
      idealFor: "Highways, railway corridors, urban planning, mining sectors",
      turnaroundTime: "3 to 5 business days per project"
    },
    {
      id: "infrastructure-inspection",
      title: "Infrastructure & Solar Inspection",
      category: "Energy & Utilities",
      shortDescription: "High-resolution radiometric thermal audits for solar PV parks, powerlines, and bridges.",
      fullDescription: "Prevent catastrophic equipment downtime with autonomous thermal and optical inspections. Rapidly spot defective solar PV cells, micro-cracks, insulator flashovers, and civil structural fatigue without hazardous human climbing.",
      features: [
        "Radiometric thermal anomaly detection down to 0.05°C delta",
        "AI-assisted solar defect categorization",
        "Zero shutdown time during inspection flight",
        "Comprehensive geo-tagged audit reports"
      ],
      idealFor: "Solar developers, EPC contractors, power transmission utilities",
      turnaroundTime: "48 hours for 25MW audit report"
    },
    {
      id: "aerial-cinematography",
      title: "Drone Aerial Cinematography",
      category: "Media & Cinema",
      shortDescription: "Licensed heavy-lift cinema rigs and acrobatic FPV cameras for films, commercials, and broadcast.",
      fullDescription: "Bring cinematic visions to life with DGCA-compliant cinema drone crews. We fly RED, ARRI, and high-speed FPV setups capable of up to 140 km/h dynamic chase captures.",
      features: [
        "Dual-operator heavy-lift gimbal rigs (Pilot + DP Camera Operator)",
        "Custom high-speed FPV racing and pursuit drones",
        "4K/6K RAW uncompressed video capture",
        "Full DGCA airspace clearance and liability insurance"
      ],
      idealFor: "Feature films, advertising agencies, tourism boards, live sports",
      turnaroundTime: "Customized per shooting schedule"
    },
    {
      id: "custom-drone-consulting",
      title: "Custom Drone Solutions & Consulting",
      category: "Advisory & R&D",
      shortDescription: "Tailored UAV hardware architecture, fleet software integration, and regulatory compliance advisory.",
      fullDescription: "From enterprise drone dock stations to last-mile medical delivery corridors, our engineers provide end-to-end UAV consulting, hardware selection, and SOP certification under Indian Drone Rules.",
      features: [
        "Airspace authorization and DigitalSky portal compliance",
        "Custom sensor payload integration",
        "Drone-in-a-box autonomous charging station setup",
        "Fleet management software architecture"
      ],
      idealFor: "Smart city projects, defense vendors, logistics conglomerates",
      turnaroundTime: "Milestone-based advisory schedule"
    }
  ],

  // Drone Training & DGCA Pilot License Courses
  courses: [
    {
      id: "dgca-rpc-certification",
      title: "DGCA Remote Pilot Certificate (RPC)",
      category: "Certification",
      duration: "5 Days (Intensive In-Person)",
      eligibility: "Class 10th pass, age 18 to 65, valid Indian Passport",
      shortDescription: "Government-recognized DGCA drone pilot license for Small Category (< 25 kg) commercial UAVs.",
      fullDescription: "Official DGCA syllabus conducted at our approved Remote Pilot Training Organization (RPTO). Includes simulator flying, theory of flight, air regulations, emergency procedures, and dual-control solo flight hours with flight test certification.",
      syllabus: [
        "Module 1: Regulations & DigitalSky Airspace Classification",
        "Module 2: Basic Principles of Flight & Drone Aerodynamics",
        "Module 3: Weather, Airspace, and Emergency Flight Procedures",
        "Module 4: 10+ Hours Computer Simulator Flight Training",
        "Module 5: Practical Dual-Control Flying at DGCA Flight Field",
        "Module 6: Written and Practical Skill Flight Test Assessment"
      ],
      batchSchedule: "New batches start every Monday & Alternate Weekends",
      courseFee: "Subsidized admissions rate available on application"
    },
    {
      id: "agri-drone-operations",
      title: "Precision Agriculture Drone Operations",
      category: "Specialized Training",
      duration: "3 Days (Theory + Farm Field Operations)",
      eligibility: "Basic drone flying experience or DGCA RPC holders",
      shortDescription: "Master agricultural spray calibration, flight safety, chemical handling, and automated grid spraying.",
      fullDescription: "Specialized vocational training for agricultural pilots. Learn crop-specific spraying speeds, spray droplet atomization, battery swapping safety in rural environments, and post-flight maintenance.",
      syllabus: [
        "Agricultural drone architectures (10L to 30L capacities)",
        "Nozzle selection, flow-rate sensor calibration, droplet drift safety",
        "Terrain-following radar and mission flight plan setup",
        "Agrochemical safety protocols and emergency wash procedures"
      ],
      batchSchedule: "Twice a month on Thursday-Saturday",
      courseFee: "State agricultural subsidy applicable"
    },
    {
      id: "drone-assembly-maintenance",
      title: "Drone Assembly, Repair & Maintenance",
      category: "Hardware & Engineering",
      duration: "4 Days (Hands-on Lab Workshop)",
      eligibility: "Open to students, diploma holders, and hobbyist engineers",
      shortDescription: "Hands-on hardware lab covering brushless motors, ESCs, flight controllers, wiring, and telemetry tuning.",
      fullDescription: "Gain practical workbench skills to build, configure, and troubleshoot quadcopters and hexacopters from scratch. Includes solder techniques, flight controller flashing, ESC calibration, and fail-safe safety configuration.",
      syllabus: [
        "Frame geometry, payload balance, and propulsion calculation",
        "Soldering, power distribution boards (PDB), and BEC circuits",
        "Flight controller firmware flashing (PX4 / ArduPilot / Betaflight)",
        "PID tuning, sensor calibration, and diagnostic log analysis"
      ],
      batchSchedule: "Monthly weekend hands-on workshops",
      courseFee: "Complete lab toolkit and materials included"
    },
    {
      id: "aerial-mapping-lidar",
      title: "GIS Aerial Photogrammetry & LiDAR Processing",
      category: "Software & Data Processing",
      duration: "3 Days (Intensive CAD/GIS Lab)",
      eligibility: "Civil engineers, surveyors, architects, GIS specialists",
      shortDescription: "From raw aerial images to 3D point clouds, DEM generation, and volumetrics using Pix4D, Agisoft, and QGIS.",
      fullDescription: "Learn professional photogrammetric data processing workflows. Set up ground control points (GCPs), rectify lens distortions, process dense point clouds, create digital elevation models, and export contour vector layers.",
      syllabus: [
        "Flight planning with RTK/PPK geotagging best practices",
        "GCP target placement and surveyor coordinate systems",
        "Point cloud alignment, densification, and mesh generation",
        "Cut-and-fill volume measurement and orthomosaic export"
      ],
      batchSchedule: "First and third Saturday of each month",
      courseFee: "Enterprise & academic discounts available"
    }
  ],

  // Predefined Chatbot Knowledge Base & Quick Replies
  faqAnswers: {
    services: "DroneTV provides end-to-end industrial drone solutions across India, including:\n• Agricultural Spraying & Crop Health Mapping\n• Aerial Surveying, LiDAR & 3D Photogrammetry\n• Infrastructure & Solar Radiometric Thermal Audits\n• Cinema Heavy-Lift & Dynamic FPV Cinematography\n• Custom UAV Hardware & Regulatory Consulting.\n\nWould you like to enquire about a specific service?",
    courses: "DroneTV conducts government-recognized drone training programs:\n• DGCA Remote Pilot Certificate (RPC) (5-day intensive license course)\n• Precision Agriculture Drone Operations (3-day practical)\n• Drone Assembly, Repair & Maintenance (4-day hands-on lab)\n• Aerial Photogrammetry & LiDAR GIS Processing.\n\nAre you looking to obtain your pilot license or specialize in a technical field?",
    contact: "You can reach DroneTV through the following channels:\n• Email: contact@dronetv.in\n• Phone / WhatsApp: +91 98000 00000\n• Bengaluru Flight Academy: Aerospace Tech Park, Electronic City, Bengaluru\n• Working Hours: Mon–Sat, 9:30 AM to 6:30 PM IST.\n\nYou can also submit an enquiry right here and our coordinator will call you back!",
    registration: "To register for a DGCA pilot course or book a drone service:\n1. Choose your course or service of interest.\n2. Submit your enquiry with your contact details.\n3. Our admissions officer or solutions consultant will verify eligibility and schedule your batch or field demonstration.\n\nWould you like to begin your registration now?",
    serviceInterest: "We are delighted you are exploring our commercial drone services! Whether you need agricultural crop spraying, terrain surveys, or solar inspections, please fill in your details below and an operations specialist will contact you with a tailored proposal.",
    studentInterest: "Welcome future drone pilot! India's drone sector is expanding rapidly under DGCA guidelines. We offer certified pilot licensing and hands-on assembly workshops. Share your contact details below to receive syllabus information and upcoming batch dates.",
    speakWithSomeone: "We would be glad to connect you with a DroneTV specialist! Please share your name, phone number, and brief requirement in the form below, and our coordinator will get in touch directly."
  },

  // Frequently Asked Questions for the Contact & FAQ page
  faqs: [
    {
      question: "Is the DGCA Remote Pilot Certificate valid throughout India?",
      answer: "Yes, the DGCA Remote Pilot Certificate (RPC) issued upon successful completion of training at our authorized training partner is legally recognized across all states in India for commercial drone operations up to 25 kg."
    },
    {
      question: "What are the eligibility criteria for the DGCA drone pilot license?",
      answer: "You must be at least 18 years of age, have passed at least 10th standard (high school), hold a valid Indian Passport, and be medically fit as per DGCA guidelines."
    },
    {
      question: "Do you provide drones for training or do I need my own?",
      answer: "All simulator sessions, training drones, batteries, controllers, and safety gear are provided by DroneTV during the course. You do not need to purchase equipment beforehand."
    },
    {
      question: "How quickly can your drone team deploy for industrial surveys or spraying?",
      answer: "Depending on airspace clearance and location, our certified flight crews can mobilize across southern and western India within 24 to 72 hours."
    },
    {
      question: "Are DroneTV operations insured and DGCA compliant?",
      answer: "Yes, all our commercial flight missions operate with third-party liability insurance, geo-fenced safety boundaries, and full DigitalSky airspace permissions."
    }
  ]
};

export default siteContent;
