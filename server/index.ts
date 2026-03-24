import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import Anthropic from "@anthropic-ai/sdk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_PROMPT = `Tu es l'assistant virtuel d'OMA SERVICES, une société de services à domicile basée à Paris et en Île-de-France.

SERVICES PROPOSÉS :
1. Particuliers : Nettoyage régulier (hebdo/bihebdo/mensuel), grand ménage ponctuel, aide ménagère flexible, accompagnement personnalisé
2. Seniors : Services adaptés aux personnes âgées, intervenants bienveillants et patients, continuité de service
3. Handicap : Services adaptés aux différents types de handicap, respect de l'autonomie et de la dignité
4. Professionnels : Nettoyage de bureaux, commerces, espaces professionnels, contrats réguliers ou ponctuels
5. Blanchisserie : Lavage, séchage, repassage professionnel, pressing pour articles délicats, collecte et livraison à domicile dans Paris 12e et environs

CONTACT :
- Téléphone : 06 22 33 26 27
- Email : contact@oma-services.com
- Zone d'intervention : Paris et Île-de-France

INSTRUCTIONS IMPORTANTES :
- Réponds TOUJOURS en français
- Sois chaleureux, professionnel et concis (2-3 phrases maximum)
- Ne donne pas de prix précis (nous proposons des devis personnalisés gratuits)
- Si l'utilisateur veut un devis : invite-le à utiliser le formulaire de devis disponible dans le chat
- Si l'utilisateur veut un rendez-vous : invite-le à utiliser le formulaire de réservation
- Si quelqu'un demande le suivi d'une demande : explique qu'il peut le suivre via l'outil de suivi dans le chat
- Mentionne toujours le numéro de téléphone si la question concerne le contact direct
- Pour la blanchisserie, précise qu'on propose aussi la livraison à domicile`;

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // Chat API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body as {
        messages: Array<{ role: "user" | "assistant"; content: string }>;
      };

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages requis" });
      }

      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        return res
          .status(500)
          .json({ error: "Clé API manquante. Configurez ANTHROPIC_API_KEY." });
      }

      const client = new Anthropic({ apiKey });

      const response = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages,
      });

      const text =
        response.content[0].type === "text" ? response.content[0].text : "";

      res.json({ response: text });
    } catch (error: any) {
      console.error("Chat API error:", error);
      res.status(500).json({
        error: "Erreur du service de chat",
        response:
          "Désolé, je rencontre une difficulté technique. Contactez-nous au 06 22 33 26 27.",
      });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
