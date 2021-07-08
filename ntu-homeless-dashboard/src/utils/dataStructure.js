const response = [
  {
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
    question: "Type of individual",
    options: [
      "International Student",
      "Local Student (<=30 min travel time)",
      "Local Student (>30 min, <=1 hr travel time)",
      "Local Student (>1 hr travel time)",
      "PR with no Local Residence",
      "Local Student (No Local Residence)",
    ],
  },
  {
    question: "Currently allocated room during semester break?",
    options: ["Yes", "No"],
  },
  {
    question: "Funding method",
    options: [
      "Self-Funded (Own funding, Bursary)",
      "Internal Scholarship (Nanyang Scholarship, REP, LKC etc)",
      "External Scholarship (Organisations)",
      "Other",
    ],
  },
  {
    question: "Room Type Applied",
    options: [
      "Single (Non A/C)",
      "Single (AC)",
      "Double (Non A/C)",
      "Double (A/C)",
      "Single Room (Attached Bath, Non A/C)",
      "Single Room (Attached Bath, A/C)",
    ],
  },
  {
    question: "Specific Room Applied",
    options: [
      "Same Room as Last Semester",
      "Same Hall, but Different Room from Last Semester",
      "Different Hall from Last Semester",
      "Freshmen/Non-Resident Last Semester",
    ],
  },
  {
    question: "Hall Allocation Status (Most Recent)",
    options: [
      "Allocated",
      "Allocated (Processing)",
      "Not Allocated",
      "Not Allocated (Received Wait-list email)",
      "Successfully Prioritised",
      "Balloting at a Later Date",
    ],
  },
  {
    question:
      "If Allocated Hall, was the allocated room the room you selected?",
    options: ["Yes", "No", "N/A"],
  },
  {
    question: "Were you on the Rec List?",
    options: ["Yes", "No"],
  },
  {
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
      "N/A or Unsure",
    ],
  },
];

export default response;
