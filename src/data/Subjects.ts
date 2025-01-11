// components/data.ts

export type Subject = keyof typeof subjectsWithChapters;

export const subjectsWithChapters = {
    "Accountancy": [
        "Introduction to Accounting",
        "Theory Base of Accounting",
        "Recording of Transactions-I",
        "Recording of Transactions-II",
        "Bank Reconciliation Statement",
        "Trial Balance and Rectification of Errors",
        "Depreciation, Provisions and Reserves",
        "Bill of Exchange"
    ],
    "Business Studies": [
        "Nature and Purpose of Business",
        "Forms of Business Organizations",
        "Public, Private and Global Enterprises",
        "Business Services",
        "Emerging Modes of Business",
        "Social Responsibility of Business",
        "Business Environment",
        "Internal Trade"
    ],
    "Economics": [
        "Introduction to Economics",
        "Demand and Supply",
        "Production and Costs",
        "Market Structures",
        "Government and the Economy",
        "International Trade",
        "Economic Development",
        "Current Economic Issues"
    ],
    "English": [
        "Reading Comprehension",
        "Writing Skills",
        "Literature",
        "Grammar",
        "Vocabulary",
        "Listening Skills",
        "Speaking Skills",
        "Presentation Skills"
    ],
    "Entrepreneurship": [
        "Entrepreneurship: Concept and Importance",
        "Entrepreneurial Opportunities",
        "Business Planning",
        "Financial Management",
        "Marketing Management",
        "Human Resource Management",
        "Legal Aspects of Business",
        "Social Entrepreneurship"
    ],
    "Physical Education": [
        "Physical Fitness",
        "Sports and Games",
        "Health and Nutrition",
        "Yoga and Meditation",
        "First Aid and Safety",
        "Physical Education and Society",
        "Sports Psychology",
        "Fitness Assessment"
    ]
};