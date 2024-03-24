import Anthropic from "@anthropic-ai/sdk";

export enum Why {
	workout = 0,
	nutrition = 1,
}
export async function consultAI(rawText: string, why: number) {

	console.log('whyyyyyy', why)
	let systemPrompt = "";
	let prompt = "";
	if (why === Why.workout) {
		systemPrompt = `You are a workout tracking assistant. 
						Your task is to extract relevant information from the user's workout description, 
						such as exercise names, sets, reps, weights, and durations. Provide the extracted information in a structured JSON format.`;
		prompt = `Please extract the relevant workout information from the following description:
	
					${rawText}

					Provide the extracted information in the following JSON format:
					{
					"exercises": [
						{
						"name": "exercise name",
						"sets": number of sets,
						"reps": number of reps,
						"weight": weight used (if applicable),
						"duration": duration (if applicable)
						},
						...
					]
					}`;
	}

	if (why === Why.nutrition) {
prompt = `
You are an AI assistant designed to parse user input for a calorie tracking app. The user will input a string describing the food they have eaten, including the quantity, unit, and name of the food. Your task is to parse this input and return a JSON object with the following keys:
- quantity (float)
- unit (string)
- name (string)

If the user provides multiple food items in a single input, parse each food item separately and return an array of JSON objects.

Here are some examples:

Input: "I had 2 cups of rice"
Output: 
{
  "foods": [
    {
      "quantity": 2.0,
      "unit": "cups",
      "name": "rice"
    }
  ]
}

Input: "I ate 1 large apple and 100 grams of strawberries"
Output:
{
  "foods": [
    {
      "quantity": 1.0,
      "unit": "large",
      "name": "apple"
    },
    {
      "quantity": 100.0,
      "unit": "grams",
      "name": "strawberries"
    }
  ]
}

Input: "I had a 12 oz steak"
Output:
{
  "foods": [
    {
      "quantity": 12.0,
      "unit": "oz",
      "name": "steak"
    }
  ]
}

Input: "I drank 500 ml of orange juice"
Output:
{
  "foods": [
    {
      "quantity": 500.0,
      "unit": "ml",
      "name": "orange juice"
    }
  ]
}

Your task: Given the following input strings, please parse them and return the corresponding JSON objects in the specified format Do not include any additional text or explanations in your response, only provide the JSON object.

${rawText}
`;
	}

	const anthropic = new Anthropic({
		apiKey: process.env.EXPO_PUBLIC_ANTHROTPIC_API_KEY,
	});
	console.log(prompt)
	return await anthropic.messages.create({
		model: "claude-3-haiku-20240307",
		// model: "claude-3-sonnet-20240229",
		max_tokens: 1024,
		system: why===Why.workout ? systemPrompt : undefined, 
		messages: [
			{
				role: "user",
				content: prompt,
			},
		],
	});
}
