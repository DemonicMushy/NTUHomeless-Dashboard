const response = [
  {
    id: "D",
    question: "Year of Admission",
    options: [
      "Year 1",
      "Year 2",
      "Year 3",
      "Year 4",
      ">=Year 5",
      "NIE PGDE",
      "Post Graduate",
    ],
  },
  {
    id: "E",
    question: "Type of individual",
    options: [
      "International Student",
      "Local Student (<=30 min travel time)",
      "Local Student (>30 min, <=1 hr travel time)",
      "Local Student (>1 hr travel time)",
      "PR with no Local Residence",
      "Local Student (No Local Residence)"
    ],
  },
  {
    id: "F",
    question: "Currently allocated room during semester break?",
    options: [
      "Yes",
      "No"
    ]
  },
  {
    id: "G",
    question: "Funding method",
    options: [
      "Self-Funded (Own funding, Bursary)",
      "Internal Scholarship (Nanyang Scholarship, REP, LKC etc)",
      "External Scholarship (Organisations)",
      "Other"
    ]
  },
  {
    id: "H",
    question: "Room Type Applied",
    options: [
      "Single (Non A/C)",
      "Single (AC)",
      "Double (Non A/C)",
      "Double (A/C)",
      "Single Room (Attached Bath, Non A/C)",
      "Single Room (Attached Bath, A/C)"
    ]
  },
  {
    id: "I",
    question: "Specific Room Applied",
    options: [
      "Same Room as Last Semester",
      "Same Hall, but Different Room from Last Semester",
      "Different Hall from Last Semester",
      "Freshmen/Non-Resident Last Semester"
    ]
  },
  {
    id: "J",
    question: "Hall Allocation Status (Most Recent)",
    options: [
      "Allocated",
      "Allocated (Processing)",
      "Not Allocated",
      "Not Allocated (Received Wait-list email)",
      "Successfully Prioritised",
      "Balloting at a Later Date"
    ] 
  },
  {
    id: "K",
    question: "If Allocated Hall, was the allocated room the room you selected?",
    options: [
      "Yes",
      "No",
      "N/A"
    ]
  },
  {
    id: "L",
    question: "Were you on the Rec List?",
    options: [
      "Yes",
      "No"
    ]
  },
  {
    id: "M",
    question: "ECA Points",
    options: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "N/A or Unsure"
    ]
  }
];

module.exports = response