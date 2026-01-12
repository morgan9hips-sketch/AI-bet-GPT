import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface PredictionResponse {
  prediction: string;
  confidence: number;
  reasoning: string;
  suggestedBet?: string;
}

export async function generatePrediction(
  prompt: string,
  sportType: 'nfl' | 'epl',
  matchDetails?: any,
  oddsContext?: string
): Promise<PredictionResponse> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

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
  } catch (error) {
    console.error('Error generating prediction:', error);
    throw new Error('Failed to generate prediction');
  }
}

export async function chatWithAI(
  messages: Array<{ role: string; content: string }>,
  oddsContext?: string
) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  
  const systemMessage = `You are a professional sports betting analyst with access to live odds. ${
    oddsContext ? `\n\nCurrent Odds & Markets:\n${oddsContext}` : ''
  }`;
  
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
}
