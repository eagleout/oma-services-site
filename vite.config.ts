import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

// =============================================================================
// Manus Debug Collector - Vite Plugin
// Writes browser logs directly to files, trimmed when exceeding size limit
// =============================================================================

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024; // 1MB per log file
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6); // Trim to 60% to avoid constant re-trimming

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function trimLogFile(logPath: string, maxSize: number) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }

    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines: string[] = [];
    let keptBytes = 0;

    // Keep newest lines (from end) that fit within 60% of maxSize
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}\n`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }

    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
    /* ignore trim errors */
  }
}

function writeToLogFile(source: LogSource, entries: unknown[]) {
  if (entries.length === 0) return;

  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);

  // Format entries with timestamps
  const lines = entries.map((entry) => {
    const ts = new Date().toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });

  // Append to log file
  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");

  // Trim if exceeds max size
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}

/**
 * Vite plugin to collect browser debug logs
 * - POST /__manus__/logs: Browser sends logs, written directly to files
 * - Files: browserConsole.log, networkRequests.log, sessionReplay.log
 * - Auto-trimmed when exceeding 1MB (keeps newest entries)
 */
function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      // POST /__manus__/logs: Browser sends logs (written directly to files)
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        const handlePayload = (payload: any) => {
          // Write logs directly to files
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };

        const reqBody = (req as { body?: unknown }).body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

const OMA_SYSTEM_PROMPT = `Tu es l'assistant virtuel d'OMA SERVICES, une société de services à domicile basée à Paris et en Île-de-France.

SERVICES PROPOSÉS :
1. Particuliers : Nettoyage régulier, grand ménage ponctuel, aide ménagère flexible, accompagnement personnalisé
2. Seniors : Services adaptés aux personnes âgées, intervenants bienveillants et patients, continuité de service
3. Handicap : Services adaptés aux différents types de handicap, respect de l'autonomie et de la dignité
4. Professionnels : Nettoyage de bureaux, commerces, espaces professionnels, contrats réguliers ou ponctuels
5. Blanchisserie : Lavage, séchage, repassage professionnel, pressing pour articles délicats, collecte et livraison à domicile

CONTACT :
- Téléphone : 06 22 33 26 27
- Email : contact@oma-services.com
- Zone d'intervention : Paris et Île-de-France

INSTRUCTIONS :
- Réponds TOUJOURS en français
- Sois chaleureux, professionnel et concis (2-3 phrases maximum)
- Ne donne pas de prix précis (devis personnalisés gratuits)
- Si devis souhaité : invite à utiliser le formulaire dans le chat
- Si rendez-vous souhaité : invite à utiliser le formulaire de réservation
- Pour contact direct : donne le numéro 06 22 33 26 27`;

function vitePluginChatAPI(): Plugin {
  return {
    name: "oma-chat-api",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/api/chat", async (req, res, next) => {
        if (req.method !== "POST") return next();

        let body = "";
        req.on("data", (chunk) => { body += chunk.toString(); });
        req.on("end", async () => {
          try {
            const { messages } = JSON.parse(body);
            const apiKey = process.env.ANTHROPIC_API_KEY;

            if (!apiKey) {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({
                response: "Bonjour ! Pour activer l'assistant IA, configurez la variable ANTHROPIC_API_KEY. En attendant, contactez-nous au 06 22 33 26 27 ou par email à contact@oma-services.com.",
              }));
              return;
            }

            const { default: Anthropic } = await import("@anthropic-ai/sdk");
            const client = new Anthropic({ apiKey });
            const response = await client.messages.create({
              model: "claude-haiku-4-5-20251001",
              max_tokens: 300,
              system: OMA_SYSTEM_PROMPT,
              messages,
            });

            const text = response.content[0].type === "text" ? response.content[0].text : "";
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ response: text }));
          } catch (e) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
              response: "Désolé, je rencontre une difficulté technique. Contactez-nous au 06 22 33 26 27.",
            }));
          }
        });
      });
    },
  };
}

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), vitePluginManusDebugCollector(), vitePluginChatAPI()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
