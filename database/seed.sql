-- =============================================================================
-- DroneTV Database Seed Data
-- 8 realistic sample enquiries for local testing and demoing admin dashboard
-- =============================================================================

INSERT INTO enquiries (name, email, phone, user_type, interest, message, status, created_at)
VALUES
(
    'Aarav Sharma',
    'aarav.sharma@example.com',
    '+91-9820123456',
    'Student',
    'DGCA Remote Pilot License (RPC)',
    'Hello DroneTV team, I am a final year aerospace engineering student looking to obtain my DGCA certified drone pilot license. When is the next batch starting in Bengaluru?',
    'New',
    NOW() - INTERVAL '2 hours'
),
(
    'Priya Sundaram',
    'priya.sundaram@greenfarms.org',
    '+91-9840234567',
    'Customer',
    'Agricultural Spraying & Crop Health',
    'We manage 45 acres of paddy and sugarcane in Tamil Nadu. We are looking for drone-based liquid fertilizer spraying contracts for the upcoming season.',
    'Contacted',
    NOW() - INTERVAL '1 day'
),
(
    'Vikram Malhotra',
    'vikram@cineluxmedia.in',
    '+91-9811345678',
    'Customer',
    'Drone Aerial Cinematography',
    'Looking for a certified FPV and cinema heavy-lift drone crew for a 4-day commercial shoot in Mumbai and Goa next month.',
    'In Progress',
    NOW() - INTERVAL '2 days'
),
(
    'Ananya Patel',
    'ananya.patel@gujaratbuildcon.com',
    '+91-9879456789',
    'Customer',
    'Aerial Survey & 3D Photogrammetry',
    'We need topographic survey and LiDAR mapping for an upcoming highway expansion project near Ahmedabad. Please send your capability deck and quotation.',
    'Closed',
    NOW() - INTERVAL '4 days'
),
(
    'Rohan Kulkarni',
    'rohan.kulkarni@techindia.edu',
    '+91-9765567890',
    'Student',
    'Drone Assembly, Repair & Maintenance',
    'I want to specialize in drone hardware architecture and firmware tuning. Do you provide hands-on workshop kits during the training?',
    'New',
    NOW() - INTERVAL '5 hours'
),
(
    'Meera Nambiar',
    'meera.n@keralaplantations.com',
    '+91-9447678901',
    'Customer',
    'Infrastructure & Solar Panel Inspection',
    'We require thermal drone inspection for a 12MW rooftop and ground-mounted solar park to detect micro-cracks and hot spots.',
    'Contacted',
    NOW() - INTERVAL '3 days'
),
(
    'Karthik Venkat',
    'karthik.v@droneenthusiast.net',
    '+91-9980789012',
    'Student',
    'Precision Agriculture Drone Operations',
    'Interested in taking the weekend batch for agricultural drone operations. Are there any prerequisites or prior flying hours needed?',
    'In Progress',
    NOW() - INTERVAL '6 days'
),
(
    'Devika Sen',
    'devika.sen@consultcorp.in',
    '+91-9830890123',
    'Other',
    'Custom Drone Solutions & Consulting',
    'Our consulting firm is conducting a feasibility study on urban drone delivery corridors for tier-2 smart cities. Would like to schedule an advisory consultation.',
    'New',
    NOW() - INTERVAL '30 minutes'
);
