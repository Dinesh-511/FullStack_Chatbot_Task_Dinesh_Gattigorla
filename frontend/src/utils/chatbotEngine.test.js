import { describe, it, expect } from 'vitest';
import {
  matchUserQuery,
  getInitialMessages,
  PREDEFINED_QUESTIONS
} from './chatbotEngine';

describe('DroneTV Chatbot Engine', () => {
  describe('Initial State', () => {
    it('should generate an initial welcome message with quick replies', () => {
      const messages = getInitialMessages();
      expect(messages).toHaveLength(1);
      expect(messages[0].sender).toBe('bot');
      expect(messages[0].text).toContain('Welcome to DroneTV AI Support');
      expect(messages[0].quickReplies.length).toBe(PREDEFINED_QUESTIONS.length);
    });
  });

  describe('Predefined Question Matching', () => {
    it('1. should match services query', () => {
      const result = matchUserQuery('What services does DroneTV provide?');
      expect(result.text).toContain('Agricultural Spraying');
      expect(result.text).toContain('Aerial Surveying');
    });

    it('2. should match courses query', () => {
      const result = matchUserQuery('What courses / training are available?');
      expect(result.text).toContain('DGCA Remote Pilot Certificate');
    });

    it('3. should match contact query', () => {
      const result = matchUserQuery('How can I contact DroneTV?');
      expect(result.text).toContain('contact@dronetv.in');
      expect(result.text).toContain('Working Hours');
    });

    it('4. should match registration query and trigger lead flow', () => {
      const result = matchUserQuery('How can I register?');
      expect(result.action).not.toBeNull();
      expect(result.action.type).toBe('OPEN_ENQUIRY');
      expect(result.action.preselect.userType).toBe('Student');
    });

    it('5. should match service interest and pre-select Customer', () => {
      const result = matchUserQuery('I am interested in a service.');
      expect(result.action).not.toBeNull();
      expect(result.action.type).toBe('OPEN_ENQUIRY');
      expect(result.action.preselect.userType).toBe('Customer');
    });

    it('6. should match student query and pre-select Student', () => {
      const result = matchUserQuery('I am a student.');
      expect(result.action).not.toBeNull();
      expect(result.action.type).toBe('OPEN_ENQUIRY');
      expect(result.action.preselect.userType).toBe('Student');
    });

    it('7. should match speak with someone query and trigger lead flow', () => {
      const result = matchUserQuery('I want to speak with someone.');
      expect(result.action).not.toBeNull();
      expect(result.action.type).toBe('OPEN_ENQUIRY');
      expect(result.action.preselect.userType).toBe('Customer');
    });
  });

  describe('Typed Text Keyword Variations', () => {
    it('should match variations of services', () => {
      const result = matchUserQuery('what kind of spraying do you offer?');
      expect(result.text).toContain('Agricultural Spraying');
    });

    it('should match variations of training/courses', () => {
      const result = matchUserQuery('I want to learn drone flying and get a dgca license');
      expect(result.text).toContain('DGCA Remote Pilot Certificate');
    });

    it('should match variations of contact information', () => {
      const result = matchUserQuery('Where is your Bengaluru office located?');
      expect(result.text).toContain('contact@dronetv.in');
    });

    it('should detect student keywords in free-form text', () => {
      const result = matchUserQuery("Hi, I am a college student from Pune looking for drone training");
      expect(result.action?.preselect.userType).toBe('Student');
    });

    it('should answer specific service query and pre-select Customer', () => {
      const result = matchUserQuery("Tell me about Agricultural Spraying & Crop Health");
      expect(result.text).toContain("Agricultural Spraying & Crop Health");
      expect(result.action?.preselect.userType).toBe('Customer');
      expect(result.action?.preselect.interest).toBe('Agricultural Spraying & Crop Health');
    });

    it('should answer specific course query and pre-select Student', () => {
      const result = matchUserQuery("Tell me about DGCA Remote Pilot Certificate (RPC)");
      expect(result.text).toContain("DGCA Remote Pilot Certificate (RPC)");
      expect(result.action?.preselect.userType).toBe('Student');
      expect(result.action?.preselect.interest).toBe('DGCA Remote Pilot Certificate (RPC)');
    });
  });

  describe('Graceful Fallback Handling', () => {
    it('should return polite fallback for completely unknown query without crashing', () => {
      const result = matchUserQuery('What is the weather in Paris today?');
      expect(result.text).toContain('I\'m not quite sure about "What is the weather in Paris today?"');
      expect(result.quickReplies.length).toBeGreaterThan(0);
      expect(result.action?.type).toBe('OFFER_ENQUIRY');
    });

    it('should handle empty or whitespace query gracefully', () => {
      const result = matchUserQuery('   ');
      expect(result.text).toContain('Please type a question');
      expect(result.quickReplies.length).toBeGreaterThan(0);
    });
  });
});
