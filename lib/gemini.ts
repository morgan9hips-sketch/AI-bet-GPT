import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Model configuration with fallback support
const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash-exp', 'gemini-1.5-flash'];
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

// Log which model is being used on startup
console.log(`[Gemini] Configured with primary model: ${MODELS[0]}, fallback models: ${MODELS.slice(1).join(', ')}`);

export interface PredictionResponse {
  prediction: string;
  confidence: number;
  reasoning: string;
  suggestedBet?: string;
}

/**
 * Get a working Gemini model with fallback support
 */
async function getWorkingModel() {
  for (let i = 0; i < MODELS.length; i++) {
    const modelName = MODELS[i];
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      // Test the model with a simple request
      await model.generateContent('test');
      console.log(`[Gemini] Successfully using model: ${modelName}`);
      return { model, modelName };
    } catch (error: any) {
      console.warn(`[Gemini] Model ${modelName} failed:`, error.message);
      if (i === MODELS.length - 1) {
        throw new Error(`All Gemini models failed. Last error: ${error.message}`);
      }
    }
  }
  throw new Error('No working Gemini model found');
}

/**
 * Execute a request with retry logic
 */
async function executeWithRetry<T>(
  fn: () => Promise<T>,
  retries: number = MAX_RETRIES
): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      console.error(`[Gemini] Attempt ${attempt}/${retries} failed:`, error.message);
      
      if (attempt === retries) {
        throw new Error(`Failed after ${retries} attempts: ${error.message}`);
      }
      
      // Wait before retrying (exponential backoff)
      const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Retry logic failed unexpectedly');
}

export async function generatePrediction(
  prompt: string,
  sportType: string,
  matchDetails?: any,
  oddsContext?: string
): Promise<PredictionResponse> {
  const { model, modelName } = await getWorkingModel();

  const contextPrompt = `You are a professional sports betting analyst with access to live odds and betting markets.
  
  Sport: ${sportType.toUpperCase()}
  User Query: ${prompt}
  ${matchDetails ? `Match Details: ${JSON.stringify(matchDetails)}` : ''}
  ${oddsContext ? `\nCurrent Odds & Markets:\n${oddsContext}` : ''}
  
  Provide your response in JSON format with:
  - prediction: Your betting prediction with specific picks
  - confidence: Confidence score 0-100
  - reasoning: Detailed explanation including form, stats, and value analysis
  - suggestedBet: Specific betting suggestion with odds
  
  When user mentions "multi-bet", "parlay", "accumulator" or provides a budget, suggest 3-5 picks with:
  - Each pick with odds and detailed reasoning
  - Combined odds calculation
  - Potential payout from their stake
  - Risk assessment`;

  try {
    return await executeWithRetry(async () => {
      const result = await model.generateContent(contextPrompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback response if JSON parsing fails
      return {
        prediction: text,
        confidence: 70,
        reasoning: 'Analysis based on current form and statistics',
      };
    });
  } catch (error: any) {
    console.error(`[Gemini] Error generating prediction with model ${modelName}:`, error.message);
    throw new Error(`Failed to generate prediction: ${error.message}`);
  }
}

export async function chatWithAI(
  messages: Array<{ role: string; content: string }>,
  oddsContext?: string
) {
  const { model, modelName } = await getWorkingModel();
  
  const systemMessage = `You are a professional sports betting analyst with access to live odds. ${
    oddsContext ? `\n\nCurrent Odds & Markets:\n${oddsContext}` : ''
  }`;
  
  try {
    return await executeWithRetry(async () => {
      const chat = model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: systemMessage }],
          },
          {
            role: 'model',
            parts: [{ text: 'I understand. I will provide betting analysis with live odds data.' }],
          },
          ...messages.slice(0, -1).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
          })),
        ],
      });

      const lastMessage = messages[messages.length - 1];
      const result = await chat.sendMessage(lastMessage.content);
      const response = await result.response;
      
      return response.text();
    });
  } catch (error: any) {
    console.error(`[Gemini] Error in chat with model ${modelName}:`, error.message);
    throw new Error(`Failed to process chat: ${error.message}`);
  }
}
