// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

// Load environment variables from .env file
config();

const { TOKEN } = process.env;

// Create a new instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN);

// Command handler
const prefix = "!"; // Prefix for commands

client.on(Events.MessageCreate, (message) => {
	const content = message.content.trim();
	if (!content.startsWith(prefix)) return; // Ignore messages that don't start with the prefix

	const args = content.slice(prefix.length).trim().split(/ +/); // Split the message into arguments
	const command = args.shift().toLowerCase(); // Get the command name

	const commands = {
		ping: () => {
			message.reply(
				`Pong! Latency is ${Date.now() - message.createdTimestamp}ms.`
			);
		},
		help: () => {
			message.reply(`Available commands: ${Object.keys(commands).join(", ")}`);
		},
	};

	if (command in commands) {
		commands[command]();
	}
});
