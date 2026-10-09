/**
 * DroneTV Rule-Based Chatbot Engine
 * ============================================================================
 * Handles intent detection, keyword matching, predefined responses,
 * pre-selection for the lead enquiry flow, and polite fallbacks.
 * No external LLM or AI API required.
 * ============================================================================
 */

import { siteContent } from '../data/siteContent';

// 7 Required Predefined Questions
export const PREDEFINED_QUESTIONS = [
  { id: 'services', label: 'What services does DroneTV provide?' },
  { id: 'courses', label: 'What courses / training are available?' },
  { id: 'contact', label: 'How can I contact DroneTV?' },
  { id: 'register', label: 'How can I register?' },
  { id: 'interested_service', label: 'I am interested in a service.' },
  { id: 'student', label: 'I am a student.' },
  { id: 'speak_someone', label: 'I want to speak with someone.' }
];

/**
 * Default Welcome Message generated when the chat starts or resets
 */
export const getInitialMessages = () => [
  {
    id: 'welcome-msg',
    sender: 'bot',
    text: `Hello! 👋 Welcome to DroneTV AI Support. I am your automated assistant for industrial drone solutions and DGCA pilot certifications.\n\nHow can I help you today? Choose a quick question below or type your query:`,
    timestamp: new Date().toISOString(),
    quickReplies: PREDEFINED_QUESTIONS.map((q) => q.label)
  }
];

/**
 * Normalizes text by lowercasing, trimming, and stripping redundant symbols
 * 
 * @param {string} text - Raw input
 * @returns {string} Normalized string
 */
const normalizeText = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s\?]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Core query processor that evaluates user text against rule sets
 * 
 * @param {string} rawQuery - Text input from user
 * @returns {{ text: string, quickReplies: string[], action: Object|null }}
 */
export const matchUserQuery = (rawQuery) => {
  const query = normalizeText(rawQuery);

  if (!query) {
    return {
      text: "Please type a question or click one of the quick options below.",
      quickReplies: PREDEFINED_QUESTIONS.map((q) => q.label),
      action: null
    };
  }

  // 1. Check for specific Services (e.g. from card "Ask Bot About This" links)
  for (const s of siteContent.services) {
    const sTitleLower = s.title.toLowerCase();
    const keywords = sTitleLower.replace(/[^a-z0-9]/g, ' ').split(/\s+/).filter((w) => w.length > 3);
    const matchesAllKeywords = keywords.length > 0 && keywords.every((w) => query.includes(w));

    if (query.includes(sTitleLower) || matchesAllKeywords) {
      return {
        text: `Here are the operational details for **${s.title}** (${s.category}):\n\n${s.fullDescription}\n\n• Capabilities:\n${s.features.map((f) => `  - ${f}`).join('\n')}\n• Target Sectors: ${s.idealFor}\n• Turnaround: ${s.turnaroundTime}\n\nWould you like a customized proposal or quote? Please confirm your contact details below:`,
        quickReplies: [
          'I am interested in a service.',
          'What courses / training are available?',
          'How can I contact DroneTV?'
        ],
        action: {
          type: 'OPEN_ENQUIRY',
          preselect: {
            userType: 'Customer',
            interest: s.title,
            source: 'service_specific_query'
          }
        }
      };
    }
  }

  // 2. Check for specific Courses (e.g. from course card "Ask Bot About This" links)
  for (const c of siteContent.courses) {
    const cTitleLower = c.title.toLowerCase();
    const keywords = cTitleLower.replace(/[^a-z0-9]/g, ' ').split(/\s+/).filter((w) => w.length > 3);
    const matchesAllKeywords = keywords.length > 0 && keywords.every((w) => query.includes(w));

    if (query.includes(cTitleLower) || matchesAllKeywords) {
      return {
        text: `Here are the curriculum details for **${c.title}** (${c.duration}):\n\n${c.fullDescription}\n\n• Eligibility: ${c.eligibility}\n• Key Syllabus Modules:\n${c.syllabus.map((m) => `  - ${m}`).join('\n')}\n• Schedule: ${c.batchSchedule}\n\nWould you like to reserve a seat in the upcoming batch? Share your details below:`,
        quickReplies: [
          'How can I register?',
          'I am a student.',
          'How can I contact DroneTV?'
        ],
        action: {
          type: 'OPEN_ENQUIRY',
          preselect: {
            userType: 'Student',
            interest: c.title,
            source: 'course_specific_query'
          }
        }
      };
    }
  }

  // 3. "I am a student." (Pre-selects Student in enquiry flow)
  if (
    query.includes('student') ||
    query.includes('i am a student') ||
    query.includes("i'm a student") ||
    query.includes('college') ||
    query.includes('undergraduate')
  ) {
    return {
      text: siteContent.faqAnswers.studentInterest,
      quickReplies: [
        'What courses / training are available?',
        'How can I register?',
        'How can I contact DroneTV?'
      ],
      action: {
        type: 'OPEN_ENQUIRY',
        preselect: {
          userType: 'Student',
          interest: 'DGCA Remote Pilot Certificate (RPC)',
          source: 'student_quick_reply'
        }
      }
    };
  }

  // 4. "I am interested in a service." (Pre-selects Customer in enquiry flow)
  if (
    query.includes('interested in a service') ||
    query.includes('interested in service') ||
    query.includes('hire drone') ||
    query.includes('need drone service') ||
    query.includes('service quote') ||
    query.includes('commercial enquiry')
  ) {
    return {
      text: siteContent.faqAnswers.serviceInterest,
      quickReplies: [
        'What services does DroneTV provide?',
        'How can I contact DroneTV?',
        'I want to speak with someone.'
      ],
      action: {
        type: 'OPEN_ENQUIRY',
        preselect: {
          userType: 'Customer',
          interest: 'Agricultural Spraying & Crop Health',
          source: 'service_interest_quick_reply'
        }
      }
    };
  }

  // 5. "How can I register?" (Enquiry lead flow)
  if (
    query.includes('register') ||
    query.includes('how can i register') ||
    query.includes('how do i register') ||
    query.includes('admission') ||
    query.includes('enroll') ||
    query.includes('enrol') ||
    query.includes('apply for course')
  ) {
    return {
      text: siteContent.faqAnswers.registration,
      quickReplies: [
        'What courses / training are available?',
        'I am a student.',
        'How can I contact DroneTV?'
      ],
      action: {
        type: 'OPEN_ENQUIRY',
        preselect: {
          userType: 'Student',
          interest: 'DGCA Remote Pilot Certificate (RPC)',
          source: 'registration_flow'
        }
      }
    };
  }

  // 6. "I want to speak with someone." (Enquiry lead flow)
  if (
    query.includes('speak with someone') ||
    query.includes('talk with someone') ||
    query.includes('speak to someone') ||
    query.includes('talk to someone') ||
    query.includes('human') ||
    query.includes('call back') ||
    query.includes('call me') ||
    query.includes('representative')
  ) {
    return {
      text: siteContent.faqAnswers.speakWithSomeone,
      quickReplies: [
        'How can I contact DroneTV?',
        'What services does DroneTV provide?',
        'What courses / training are available?'
      ],
      action: {
        type: 'OPEN_ENQUIRY',
        preselect: {
          userType: 'Customer',
          interest: 'Custom Drone Solutions & Consulting',
          source: 'speak_to_someone'
        }
      }
    };
  }

  // 7. "What services does DroneTV provide?"
  if (
    query.includes('services') ||
    query.includes('service') ||
    query.includes('provide') ||
    query.includes('offer')
  ) {
    return {
      text: siteContent.faqAnswers.services,
      quickReplies: [
        'I am interested in a service.',
        'What courses / training are available?',
        'How can I contact DroneTV?'
      ],
      action: null
    };
  }

  // 8. "What courses / training are available?"
  if (
    query.includes('course') ||
    query.includes('courses') ||
    query.includes('training') ||
    query.includes('pilot license') ||
    query.includes('dgca') ||
    query.includes('rpc') ||
    query.includes('license') ||
    query.includes('learn') ||
    query.includes('classes') ||
    query.includes('syllabus') ||
    query.includes('academy')
  ) {
    return {
      text: siteContent.faqAnswers.courses,
      quickReplies: [
        'I am a student.',
        'How can I register?',
        'How can I contact DroneTV?'
      ],
      action: null
    };
  }

  // 9. "How can I contact DroneTV?"
  if (
    query.includes('contact') ||
    query.includes('phone') ||
    query.includes('email') ||
    query.includes('address') ||
    query.includes('office') ||
    query.includes('location') ||
    query.includes('whatsapp') ||
    query.includes('reach') ||
    query.includes('timing') ||
    query.includes('hours')
  ) {
    return {
      text: siteContent.faqAnswers.contact,
      quickReplies: [
        'I want to speak with someone.',
        'What services does DroneTV provide?',
        'What courses / training are available?'
      ],
      action: null
    };
  }

  // Graceful Fallback for unknown queries
  return {
    text: `I'm not quite sure about "${rawQuery}". As DroneTV's support assistant, I can answer questions about our industrial drone services, DGCA pilot licensing, registration, and contact details.\n\nPlease select one of the popular topics below, or leave an enquiry and our team will get back to you:`,
    quickReplies: [
      'What services does DroneTV provide?',
      'What courses / training are available?',
      'How can I contact DroneTV?',
      'I want to speak with someone.'
    ],
    action: {
      type: 'OFFER_ENQUIRY',
      preselect: {
        userType: 'Customer',
        interest: 'Custom Drone Solutions & Consulting',
        source: 'fallback_unknown_query'
      }
    }
  };
};
