"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface ModuleData {
  title: string;
  content: string;
  video_search_query: string;
  video_url: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}

export async function generateModule(
  topic: string,
  userRole: string
): Promise<ModuleData> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const difficultyNote =
      userRole === "student"
        ? "The student is a secondary school student (ages 14-18). Use clear, engaging language appropriate for teenagers. Include real-world examples they can relate to."
        : "The learner is a primary school student (ages 8-13). Use very simple, fun language with analogies and stories. Keep sentences short.";

    const seed = Math.random().toString(36).substring(2, 10);

    const prompt = `You are an expert educator for the AgriHeroes regenerative campus program (Solar Decathlon India).

Generate a UNIQUE learning module on the topic: "${topic}".

${difficultyNote}

Seed for uniqueness: ${seed}. Use this seed to ensure each generation produces varied content with different angles, examples, and emphasis.

Return ONLY valid JSON (no markdown, no backticks) in this exact format:
{
  "title": "An engaging, creative title for the module",
  "content": "A comprehensive 3-4 paragraph lesson covering key concepts, practical applications, and how this connects to sustainable campus living. Use emojis sparingly for engagement.",
  "video_search_query": "A specific YouTube search query to find a relevant educational video",
  "video_url": "A real, working YouTube video URL related to this topic. Use a well-known educational channel like CrashCourse, National Geographic, TED-Ed, Kurzgesagt, or similar. Format: https://www.youtube.com/watch?v=VIDEO_ID. The video MUST actually exist on YouTube."
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned) as ModuleData;

    // Validate the video_url, fallback to search if invalid
    if (!parsed.video_url || !parsed.video_url.includes("youtube.com/watch")) {
      parsed.video_url = `https://www.youtube.com/results?search_query=${encodeURIComponent(parsed.video_search_query || topic)}`;
    }

    return parsed;
  } catch (error) {
    console.error("Gemini module generation error:", error);
    // Topic-specific fallbacks
    const fallbacks: Record<string, { title: string; content: string; videoId: string }> = {
      "Nitrogen Cycle": {
        title: "🧪 Understanding the Nitrogen Cycle in Agriculture",
        content: `The nitrogen cycle is one of nature's most important processes for agriculture! 🌿 Nitrogen makes up 78% of our atmosphere, but plants can't use it directly from the air. Instead, special bacteria in the soil convert atmospheric nitrogen (N₂) into forms that plants can absorb — this process is called nitrogen fixation.\n\nIn regenerative agriculture, we harness this natural cycle by growing nitrogen-fixing plants like legumes (beans, peas, and clover). These plants have special root nodules containing Rhizobium bacteria that pull nitrogen from the air and convert it into ammonium (NH₄⁺) and nitrates (NO₃⁻) that enrich the soil. When these plants decompose, they release this stored nitrogen for other crops to use.\n\nOn our campus farm, we practice crop rotation — alternating between nitrogen-fixing crops and nitrogen-hungry crops like tomatoes and corn. This natural approach reduces our need for synthetic fertilizers by up to 50%, cutting CO₂ emissions and building healthier, more resilient soil over time. 🌱`,
        videoId: "A8qTRBc8Bws",
      },
      "Composting and Vermicomposting": {
        title: "🪱 Composting Mastery: From Waste to Black Gold",
        content: `Composting is nature's recycling system — and vermicomposting takes it to the next level! 🌍 In vermicomposting, red wiggler worms (Eisenia fetida) eat through organic waste at an incredible rate, consuming up to half their body weight daily. Their castings (worm poop!) are one of the richest natural fertilizers known to science.\n\nOur campus vermicomposting system processes over 50 kg of canteen food waste per week. We maintain bins at optimal conditions: moisture around 70%, temperature between 15-25°C, and a balanced carbon-to-nitrogen ratio. The worms break down banana peels, vegetable scraps, coffee grounds, and shredded paper into nutrient-dense vermicompost in just 60-90 days.\n\nThe resulting vermicompost contains 5x more nitrogen, 7x more phosphorus, and 11x more potassium than regular garden soil. We use it to feed our campus vegetable beds, herb gardens, and fruit trees — completing the circular economy loop from canteen waste back to fresh food. Zero waste, maximum impact! ♻️`,
        videoId: "G9sgbbbATm8",
      },
      "Water Conservation and Irrigation": {
        title: "💧 Smart Water: Conservation & Precision Irrigation",
        content: `Water is the most precious resource on our campus farm, and smart irrigation helps us use every drop wisely! 🌊 Traditional flood irrigation wastes up to 60% of water through evaporation and runoff. Our precision drip irrigation system delivers water directly to plant roots, achieving over 90% water efficiency.\n\nOur IoT moisture sensors embedded in the soil continuously measure hydration levels at different depths. When soil moisture drops below the optimal threshold (typically 40-60% depending on the crop), the system automatically activates targeted drip lines. This data-driven approach means plants get exactly the water they need, exactly when they need it.\n\nWe also harvest rainwater from campus rooftops into underground storage tanks, collecting an average of 12,000 liters during monsoon season. Combined with our greywater recycling system that filters and reuses sink water for irrigation, we've reduced our freshwater consumption by 65%. Every liter saved is a step closer to net-zero water balance! 💧`,
        videoId: "9JpMuhokd3k",
      },
      "Solar Energy in Agriculture": {
        title: "☀️ Solar-Powered Agriculture: Energy from the Sun",
        content: `Solar energy is revolutionizing how we power our campus farm! ☀️ Our agrivoltaic system combines solar panels with crop production, allowing us to generate clean electricity while growing food underneath. The partial shade from solar panels actually benefits many crops by reducing heat stress and water evaporation by up to 30%.\n\nOur campus has installed 15 kW of rooftop solar panels that power all irrigation pumps, IoT sensors, greenhouse ventilation fans, and the vermicomposting monitoring system. On sunny days, we generate more electricity than we need and feed the surplus back to the school grid — a process called net metering that offsets our nighttime energy use.\n\nThe integration of solar energy with farming creates a triple benefit: renewable energy production, improved crop yields through microclimate management, and reduced carbon emissions. Our monitoring dashboard tracks real-time energy generation, showing students exactly how many kilograms of CO₂ we've offset. So far this year, that's over 2.4 tons! 🌱`,
        videoId: "xKxrkht7CpY",
      },
    };

    const fb = fallbacks[topic] || fallbacks["Nitrogen Cycle"]!;
    return {
      title: fb.title,
      content: fb.content,
      video_search_query: `${topic} sustainable agriculture education`,
      video_url: `https://www.youtube.com/watch?v=${fb.videoId}`,
    };
  }
}

export async function generateQuiz(
  content: string,
  userRole: string,
  moduleTitle: string
): Promise<QuizQuestion[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const difficultyNote =
      userRole === "student"
        ? "Create questions suitable for secondary school students (ages 14-18). Questions should test understanding and application of concepts."
        : "Create questions suitable for primary school students (ages 8-13). Questions should be simple, fun, and test basic recall with encouraging language.";

    const seed = Math.random().toString(36).substring(2, 10);
    const timestamp = Date.now();

    const prompt = `Based on the following educational content about "${moduleTitle}", generate exactly 4 UNIQUE multiple-choice quiz questions.

Content:
"${content}"

${difficultyNote}

IMPORTANT: This is generation #${timestamp} with seed "${seed}". You MUST create completely different questions each time. Vary question styles: mix factual recall, application, cause-and-effect, and comparison questions. Vary the position of correct answers (don't always put them at index 1).

Return ONLY valid JSON (no markdown, no backticks) as an array in this exact format:
[
  {
    "question": "The quiz question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answerIndex": 0
  }
]

answerIndex is 0-indexed. Make wrong answers plausible but clearly incorrect.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned) as QuizQuestion[];
  } catch (error) {
    console.error("Gemini quiz generation error:", error);

    // TOPIC-SPECIFIC fallback questions so each module always gets different quizzes
    const topicQuizzes: Record<string, QuizQuestion[]> = {
      "Nitrogen Cycle": [
        { question: "What percentage of Earth's atmosphere is made up of nitrogen?", options: ["21%", "78%", "50%", "35%"], answerIndex: 1 },
        { question: "Which type of bacteria helps fix atmospheric nitrogen into the soil?", options: ["E. coli", "Salmonella", "Rhizobium", "Lactobacillus"], answerIndex: 2 },
        { question: "What is the benefit of crop rotation with legumes?", options: ["It increases pesticide need", "It naturally adds nitrogen to soil", "It depletes soil nutrients", "It attracts more pests"], answerIndex: 1 },
        { question: "In which plant structure are nitrogen-fixing bacteria found?", options: ["Leaves", "Flowers", "Root nodules", "Seeds"], answerIndex: 2 },
      ],
      "Composting and Vermicomposting": [
        { question: "Which species of worm is most commonly used in vermicomposting?", options: ["Common earthworm", "Red wiggler (Eisenia fetida)", "Nightcrawler", "Bloodworm"], answerIndex: 1 },
        { question: "How much of their body weight can composting worms eat daily?", options: ["10%", "25%", "50%", "100%"], answerIndex: 2 },
        { question: "What is the ideal moisture level for a vermicompost bin?", options: ["20%", "40%", "70%", "95%"], answerIndex: 2 },
        { question: "Vermicompost contains how many times more nitrogen than regular soil?", options: ["2x", "3x", "5x", "10x"], answerIndex: 2 },
      ],
      "Water Conservation and Irrigation": [
        { question: "What efficiency can drip irrigation systems achieve?", options: ["40%", "60%", "75%", "Over 90%"], answerIndex: 3 },
        { question: "What do IoT soil sensors primarily measure for irrigation?", options: ["Air temperature", "Wind speed", "Soil moisture levels", "Sunlight intensity"], answerIndex: 2 },
        { question: "How much water does traditional flood irrigation typically waste?", options: ["10%", "30%", "Up to 60%", "80%"], answerIndex: 2 },
        { question: "What is greywater recycling?", options: ["Collecting rain from roofs", "Filtering and reusing sink/shower water", "Desalinating ocean water", "Melting glacier ice"], answerIndex: 1 },
      ],
      "Solar Energy in Agriculture": [
        { question: "What is an agrivoltaic system?", options: ["A solar-powered tractor", "Combining solar panels with crop production", "A type of greenhouse", "Solar-heated water tanks"], answerIndex: 1 },
        { question: "How much can solar panel shade reduce crop water evaporation?", options: ["5%", "15%", "Up to 30%", "50%"], answerIndex: 2 },
        { question: "What is net metering?", options: ["Measuring fish in nets", "Selling excess solar energy back to the grid", "Counting solar panels", "Measuring net weight of crops"], answerIndex: 1 },
        { question: "What does our campus solar system power?", options: ["Only lights", "Only computers", "Irrigation pumps, IoT sensors, and greenhouse fans", "Nothing—it's decorative"], answerIndex: 2 },
      ],
    };

    // Match using keyword scoring — split topic key into words and check how many match
    const combined = `${moduleTitle} ${content}`.toLowerCase();
    let bestMatch: string | null = null;
    let bestScore = 0;

    for (const key of Object.keys(topicQuizzes)) {
      const keywords = key.toLowerCase().split(/\s+/);
      const score = keywords.filter((kw) => combined.includes(kw)).length;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = key;
      }
    }

    if (bestMatch && bestScore >= 2) {
      return topicQuizzes[bestMatch]!;
    }

    // Generic fallback
    return [
      { question: "What is the primary goal of regenerative agriculture?", options: ["Maximize chemical use", "Restore ecosystem health", "Reduce crop diversity", "Increase water waste"], answerIndex: 1 },
      { question: "Which process converts organic waste into nutrient-rich compost?", options: ["Photosynthesis", "Vermicomposting", "Evaporation", "Combustion"], answerIndex: 1 },
      { question: "What does 'Net-Zero' mean for campus sustainability?", options: ["Zero students enrolled", "No energy use at all", "Balancing emissions with offsets and reduction", "Removing all buildings"], answerIndex: 2 },
      { question: "How do IoT sensors help in precision agriculture?", options: ["They replace sunlight", "They monitor soil, water, and air in real-time", "They eliminate the need for soil", "They produce electricity"], answerIndex: 1 },
    ];
  }
}
