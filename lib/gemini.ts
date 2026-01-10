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
  matchDetails?: any
): Promise<PredictionResponse> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const contextPrompt = `You are an expert sports betting analyst specializing in ${sportType.toUpperCase()}. 
  Analyze the following match and provide a prediction with confidence score (0-100).
  
  User Query: ${prompt}
  ${matchDetails ? `Match Details: ${JSON.stringify(matchDetails)}` : ''}
  
  Provide your response in JSON format with:
  - prediction: Your betting prediction
  - confidence: Confidence score 0-100
  - reasoning: Brief explanation of your analysis
  - suggestedBet: Optional betting suggestion`;

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

export async function chatWithAI(messages: Array<{ role: string; content: string }>) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const chat = model.startChat({
    history: messages.slice(0, -1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })),
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.content);
  const response = await result.response;
  
  return response.text();
}
