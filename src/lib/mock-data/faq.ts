import type { FAQSection } from "@/lib/types";

export const mockFAQ: FAQSection[] = [
  {
    title: "Medical Treatment After Accidents",
    items: [
      { id: 1, question: "How soon should I go to the doctor after being involved in an accident?", answer: "Under current Florida law, you have 14 days to seek medical treatment after being involved in a motor vehicle accident. It is important to seek medical attention as soon as possible to document your injuries and begin treatment." },
      { id: 2, question: "Does minimal property damage mean I am not injured?", answer: "Injuries can manifest even when vehicle damage is negligible. The force of impact can cause soft tissue injuries, whiplash, and other conditions that may not be immediately apparent. A professional medical evaluation is necessary regardless of the extent of property damage." },
      { id: 3, question: "Who covers my medical expenses after an accident?", answer: "Generally, your own insurance or the at-fault party's insurance may cover your medical bills, depending on the circumstances of the accident and the type of coverage you have." },
      { id: 4, question: "What type of physician should I consult after an accident?", answer: "Depending on your injuries, you may need to see a primary care physician, chiropractor, orthopedist, neurologist, or other specialists. The type of doctor depends on the nature and severity of your injuries." },
      { id: 5, question: "Should I go to the hospital after an accident?", answer: "If you have serious injuries or are experiencing severe pain, it's advisable to go to the hospital immediately. Even if your injuries seem minor, getting checked out can help identify issues that might worsen over time." },
      { id: 6, question: "Is an MRI necessary after an accident?", answer: "An MRI may be necessary to diagnose certain injuries, especially those related to the spine or head. Your doctor will determine if imaging studies are needed based on your symptoms and examination findings." },
      { id: 7, question: "When do symptoms from an accident usually appear?", answer: "Pain from injuries sustained in an accident may not always be immediately apparent. It could take hours, days, or even weeks for symptoms to develop fully. This is why prompt medical evaluation is crucial." },
      { id: 8, question: "How much does insurance cover for accident treatment?", answer: "Coverage amounts depend on individual policy limits. Policyholders should review their specific insurance documents to understand the extent of their coverage for accident-related medical treatment." },
    ],
  },
  {
    title: "Slip and Fall Injuries",
    items: [
      { id: 9, question: "Should I see a doctor after a slip and fall?", answer: "Yes, medical evaluation is important following a slip and fall accident to properly assess any injuries and receive appropriate treatment. Some injuries from falls may not be immediately apparent." },
      { id: 10, question: "How soon should I seek medical care after a slip and fall?", answer: "You should seek medical attention promptly, particularly when experiencing pain or discomfort. Early documentation of your injuries is important for both your health and any potential legal claims." },
      { id: 11, question: "What type of doctor should I see for slip and fall injuries?", answer: "Options include primary care physicians, orthopedists, neurologists, or other relevant specialists based on the type and severity of your injury. Your primary care doctor can help refer you to the appropriate specialist." },
    ],
  },
];
