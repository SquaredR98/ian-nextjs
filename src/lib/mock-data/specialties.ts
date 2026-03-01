import type { Specialty } from "@/lib/types";

export const mockSpecialties: Specialty[] = [
  // Medical Assistance (8 with images + 2 without)
  { id: 1, name: "Chiropractors", slug: "chiropractors", category: "medical", group: "Medical Assistance", image_url: "v1//uploads/business-speciality/17375458012721.jpg", featured_icon_url: "v1//uploads/featured-business-speciality/17376335708243.png", description: "Chiropractor and Back Pain Providers in Orlando for your Personal Injury" },
  { id: 2, name: "Diagnostic Imaging", slug: "diagnostic-imaging", category: "medical", group: "Medical Assistance", image_url: "v1//uploads/business-speciality/17375458202789.jpg", featured_icon_url: "v1//uploads/featured-business-speciality/17376336565501.png", description: "MRI, X-Ray, Diagnostic Imaging Providers for your Personal Injury" },
  { id: 3, name: "Pain Management", slug: "pain-management", category: "medical", group: "Medical Assistance", image_url: "v1//uploads/business-speciality/17375458414067.jpg", featured_icon_url: "v1//uploads/featured-business-speciality/17473205591141.jpg", description: "Pain Management Providers for your Personal Injury" },
  { id: 4, name: "Neurologist", slug: "neurologist", category: "medical", group: "Medical Assistance", image_url: "v1//uploads/business-speciality/17375458637014.jpg", featured_icon_url: "v1//uploads/featured-business-speciality/17473205131841.jpg", description: "Neurologists for your Personal Injury" },
  { id: 5, name: "Neurosurgeon", slug: "neurosurgeon", category: "medical", group: "Medical Assistance", image_url: "v1//uploads/business-speciality/17375458798868.jpg", description: "Neurosurgeons for your Personal Injury" },
  { id: 6, name: "Orthopedic-Spine", slug: "orthopedic-spine", category: "medical", group: "Medical Assistance", image_url: "v1//uploads/business-speciality/17375458952144.jpg", featured_icon_url: "v1//uploads/featured-business-speciality/17376339644286.png", description: "Orthopedic Help for your Personal Injury" },
  { id: 7, name: "Walk-In Clinics", slug: "walk-in-clinics", category: "medical", group: "Medical Assistance", image_url: "v1//uploads/business-speciality/17375459585678.jpg", featured_icon_url: "v1//uploads/featured-business-speciality/17376338781812.png", description: "Walk-In Clinics for your Personal Injury" },
  { id: 8, name: "Traumatic Brain Injury", slug: "traumatic-brain-injury", category: "medical", group: "Medical Assistance", image_url: "v1//uploads/business-speciality/17375460036091.jpg", description: "Traumatic Brain Injury specialists for your Personal Injury" },
  { id: 13, name: "Medical Doctor", slug: "medical-doctor", category: "medical", group: "Medical Assistance", image_url: null, description: "Medical Doctors for your Personal Injury" },
  { id: 14, name: "Comprehensive Medical Facility", slug: "comprehensive-medical-facility", category: "medical", group: "Medical Assistance", image_url: null, description: "Comprehensive Medical Facilities for your Personal Injury" },
  // Therapeutic Assistance (2)
  { id: 9, name: "Physical Therapist", slug: "physical-therapist", category: "medical", group: "Therapeutic Assistance", image_url: "v1//uploads/business-speciality/17375460232466.jpg", description: "Physical Therapists in Orlando providers for your Personal Injury" },
  { id: 10, name: "Occupational Therapist", slug: "occupational-therapist", category: "medical", group: "Therapeutic Assistance", image_url: "v1//uploads/business-speciality/17375460386524.jpg", description: "Occupational Therapists in Orlando providers for your Personal Injury" },
  // Medication Assistance (2)
  { id: 11, name: "Pharmacy", slug: "pharmacy", category: "medical", group: "Medication Assistance", image_url: "v1//uploads/business-speciality/17375465437574.jpg", description: "Find a Pharmacy in Orlando to help with medication assistance for Personal Injury Accidents" },
  { id: 12, name: "Dispensary", slug: "dispensary", category: "medical", group: "Medication Assistance", image_url: "v1//uploads/business-speciality/Dispensary_080725.jpg", description: "Dispensary providers for your Personal Injury" },
  // Legal (12)
  { id: 15, name: "Car Accident Attorney", slug: "car-accident-attorney", category: "legal", group: "Personal Injury Service", image_url: "v1//uploads/business-speciality/17375466216683.jpg", description: "Personal injury lawyers specializing in car accidents in Florida." },
  { id: 16, name: "Commercial Truck Accident Attorney", slug: "commercial-truck-accident-attorney", category: "legal", group: "Personal Injury Service", image_url: "v1//uploads/business-speciality/17375466417083.jpg", description: "Find an attorney specializing in commercial truck accidents in Florida." },
  { id: 17, name: "Mass Tort Attorney", slug: "mass-tort-attorney", category: "legal", group: "Personal Injury Service", image_url: "v1//uploads/business-speciality/17375466595173.jpg", description: "Find experienced attorneys to file a mass tort case in Florida." },
  { id: 18, name: "Motor Vehicle Accident Attorney", slug: "motor-vehicle-accident-attorney", category: "legal", group: "Personal Injury Service", image_url: "v1//uploads/business-speciality/17375466963719.jpg", description: "Find attorneys in Florida specializing in motor vehicle accidents." },
  { id: 19, name: "Workplace Injuries Attorney", slug: "workplace-injuries-attorney", category: "legal", group: "Personal Injury Service", image_url: "v1//uploads/business-speciality/17375467167525.jpg", description: "Find the best workplace injury attorneys in Florida." },
  { id: 20, name: "Wrongful Death Attorney", slug: "wrongful-death-attorney", category: "legal", group: "Personal Injury Service", image_url: "v1//uploads/business-speciality/17375467323142.jpg", description: "Attorneys in Florida specializing in wrongful death cases." },
  { id: 21, name: "Medical Malpractice", slug: "medical-malpractice", category: "legal", group: "Personal Injury Service", image_url: "v1//uploads/business-speciality/17375468099746.jpg", description: "Find attorneys experienced in medical malpractice cases in Florida." },
  { id: 22, name: "Birth Accident Attorney", slug: "birth-accident-attorney", category: "legal", group: "Personal Injury Service", image_url: "v1//uploads/business-speciality/17375468242255.jpg", description: "Find experienced birth accident attorneys in Florida." },
  { id: 23, name: "Slip and Fall Accident Attorney", slug: "slip-and-fall-accident-attorney", category: "legal", group: "Personal Injury Service", image_url: "v1//uploads/business-speciality/personal-injry_080725.jpg", description: "Attorneys experienced in slip and fall accident cases in Florida." },
  { id: 24, name: "Personal Injury", slug: "personal-injury", category: "legal", group: "Personal Injury Service", image_url: "v1//uploads/business-speciality/personal-injry_080725.jpg", description: "Personal Injury" },
  { id: 25, name: "Dog Bite Attorney", slug: "dog-bite-attorney", category: "legal", group: "Personal Injury Service", image_url: "v1//uploads/business-speciality/dog-bite-attorney_080725.jpg" },
  { id: 26, name: "Traffic Collision Attorney", slug: "traffic-collision-attorney", category: "legal", group: "Personal Injury Service", image_url: "v1//uploads/business-speciality/Traffic-Collision_080725.jpg" },
  // Service - Financial Assistance (3)
  { id: 27, name: "Settlement Services", slug: "settlement-services", category: "service", group: "Financial Assistance", image_url: null },
  { id: 28, name: "Funding Companies", slug: "funding-companies", category: "service", group: "Financial Assistance", image_url: null },
  { id: 29, name: "Financial Advisors", slug: "financial-advisors", category: "service", group: "Financial Assistance", image_url: null },
  // Service - Service Assistance (3)
  { id: 30, name: "Home Keeping", slug: "home-keeping", category: "service", group: "Service Assistance", image_url: null },
  { id: 31, name: "Collision Centres", slug: "collision-centres", category: "service", group: "Service Assistance", image_url: null },
  { id: 32, name: "Auto Dealerships", slug: "auto-dealerships", category: "service", group: "Service Assistance", image_url: null },
];
