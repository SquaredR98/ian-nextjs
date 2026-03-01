import type { Endorsement } from "@/lib/types";

export const mockEndorsements: Endorsement[] = [
  {
    id: 1,
    attorney_name: "Carlos Leach",
    firm_name: "The Leach Firm",
    practice_areas: ["Employment Law", "Personal Injury", "Workers' Compensation"],
    locations: ["Florida", "Georgia"],
    website: "https://theleachfirm.com",
    photo_url: "v1//uploads/attorney-endorsement/17246883213576.jpg",
  },
  {
    id: 2,
    attorney_name: "Yulric Abercrombie",
    firm_name: "Abercrombie, P.A.",
    practice_areas: ["Personal Injury"],
    locations: ["Winter Park", "Winter Haven", "Tampa"],
    website: "https://abercrombiepa.com",
    photo_url: "v1//uploads/attorney-endorsement/17246883282696.jpg",
  },
  {
    id: 3,
    attorney_name: "Michael A. Mills",
    firm_name: "The Injury Assistance Law Firm",
    practice_areas: ["Personal Injury", "Truck Accidents", "Wrongful Death", "Motorcycle Accidents", "Property Damage", "Bicycle Accidents", "Car Accidents", "Slip and Fall", "Mass Tort"],
    locations: ["Orlando, FL", "Winter Haven, FL"],
    website: "https://injuryassistancelawfirm.com",
    photo_url: "v1//uploads/attorney-endorsement/17246883358022.jpg",
  },
  {
    id: 4,
    attorney_name: "Rafael Nunez",
    firm_name: "The Nunez Law Firm",
    practice_areas: ["Personal Injury"],
    locations: ["Orlando", "Fort Myers"],
    website: "https://thenunezlawfirm.com",
    photo_url: "v1//uploads/attorney-endorsement/17246883435513.jpg",
  },
];
