import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Sen fizika fani bo'yicha tajribali o'qituvchi va yordamchisan. Sening vazifang:

1. Fizika masalalarini yechishda yordam berish
2. Formulalarni tushuntirish
3. Fizik hodisalarni oddiy tilda izohlash
4. Misollar va masalalarni bosqichma-bosqich yechish

Qoidalar:
- Faqat o'zbek tilida javob ber
- Formulalarni LaTeX formatida yoz (masalan: $F = ma$, $E = mc^2$)
- Javoblarni aniq va tushunarli qilib yoz
- Kerak bo'lsa, qadamma-qadam yechimni ko'rsat
- Fizika qonunlarini amaliy misollar bilan tushuntir

Sen PhysicsLab ilovasining AI yordamchisisan.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "So'rovlar soni limitdan oshdi. Iltimos, biroz kutib turing." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Kredit tugadi. Iltimos, hisobni to'ldiring." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI xizmati bilan bog'lanishda xatolik" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("AI physics error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Noma'lum xatolik" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
