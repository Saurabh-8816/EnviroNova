type PerplexityChoice = { message?: { content?: string } };
type PerplexityResponse = { choices?: PerplexityChoice[] };

export async function askPerplexity(prompt: string): Promise<string> {
  const apiKey = process.env.REACT_APP_PERPLEXITY_API_KEY;
  if (!apiKey) return 'Perplexity API key missing.';

  try {
    const res = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful assistant for an Environmental Health & Safety consulting website. Provide concise, relevant answers.' 
          },
          { 
            role: 'user', 
            content: prompt 
          }
        ],
        max_tokens: 150,
        temperature: 0.3
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Perplexity API Error:', res.status, errorText);
      return `API Error (${res.status}): ${errorText}`;
    }

    const data = (await res.json()) as PerplexityResponse;
    const content = data.choices?.[0]?.message?.content?.trim();
    return content || 'No response from AI.';
    
  } catch (error) {
    console.error('Perplexity request failed:', error);
    return `Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}