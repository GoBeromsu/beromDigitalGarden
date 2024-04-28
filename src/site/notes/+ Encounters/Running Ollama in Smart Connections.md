---
{"tags":["LLM","ollama"],"aliases":null,"link":null,"index":null,"related":null,"date_created":"2024-04-28","date_modified":"2024-04-28","dg-publish":true,"permalink":"/encounters/running-ollama-in-smart-connections/","dgPassFrontmatter":true,"noteIcon":"1","created":"2024-04-28T15:35:41.496+09:00","updated":"2024-04-28T16:48:17.600+09:00"}
---

# Running Ollama in Smart Connections

## What is Smart Connections?
Smart Connection is a Obsidian plugin,which helps you see how your notes are related to each other. When you write or view notes, Smart Connections suggests other notes that are related.This is useful because it helps you remember and connect ideas without having to search through everything manuaaly.

## Speacial Features of Smart Connections
- AI-Powered Connections
	- It uses AI to suggest links between your noets.This means you can see connections you might not have though of yourself
- Chat With Your Notes
	- There’s a feature called Smart Chat where you cant “talk” to your notes.You ask questions, and the plugin uses your notes to answer, making it feel like you’re having a conversation with your notes
- Local Models
	- It supports using AI models directly on your computer, which means your notes stay private and you don’t need to send them over the internet

## Why Use Smart Connections with Local Models
People use Smart Connections because it saves time and makes it easier to manage lots of information. Whether you’re a student, a researcher, or just someone with losts of notes, it can help you keep track of everything and make better use of your notes.

However, to use Smart Connections, you generally need an API key for OpenAI, Gemini, or other LLMs. OpenAI and Gemini provide APIs that are smart and useful, but they can be expensive since billing is calculated based on how much you use the API.

In the past, local LLMs were sometimes considered to offer lower quality compared to platform-based LLMs, such as ChatGPT or Gemini. However, these days, as LLM technology has significantly advanced, local LLMs can deliver quality comparable to their non-free counterparts.

Thus, if you use local models, you don’t have to pay money for using APIs and still get good quality. You just need to prepare your computer.


## Step-by-Step Guide to Setting Up Ollama on macOS

### 1. **Download Ollama:**
   Begin by downloading the Ollama software from the [official Ollama repository](https://github.com/ollama/ollama). Look for the macOS version and download the latest release.

### 2. **Installation:**
   Open the downloaded file and drag the Ollama application into your Applications folder. This typical macOS installation procedure will make Ollama accessible from your Launchpad.

### 3. **Open Terminal:**
   You can run Ollama commands from the macOS Terminal. Open Terminal by searching for it in Spotlight or accessing it through Applications/Utilities.

### 4. **Verify Installation:**
   Check if Ollama is installed correctly by typing the following command in the Terminal:
   ```bash
   ollama --version
   ```
   This command will display the version number of Ollama, confirming that the installation was successful.

## Integartion Smart Connections with a Local Ollama Server

1. **Download Models**:
   Pull the required models using Ollama commands:
   ```bash
   ollama pull llama3
   ```

2. **Run Ollama Server**:
   Configure the Ollama server to allow connections specifically from Obsidian by setting the `OLLAMA_ORIGINS` environment variable. Then, start the server:
   ```bash
   OLLAMA_ORIGINS=app://obsidian.md* ollama serve
   ```

	![](https://i.imgur.com/T3svhBV.png)


### Configuring Smart Connections for Local Embeddings
![|600](https://i.imgur.com/7Buotfq.png)

1. **Set Up Local Server Connection**:
   In Obsidian, open Smart Connections settings and configure it to use your local Ollama server. You'll need to specify the URL of your Ollama server, typically something like `http://localhost:11434`.

2. **Custom Local Model**:
   Within Smart Connections settings, select the option to use a 'Custom Local' model and specify the models you've pulled (`llama3` for chat and `nomic-embed-text` for embeddings).

3. **Model Selection**:
   In the model configuration within Smart Connections, set the model identifiers as:
   - For chat: `llama3`


## Reference
- [FREE and Powerful AI Models that Anyone Can Use! - Copilot for Obsidian - YouTube](https://www.youtube.com/watch?v=TuiPnNZ-gMA)
- [[FR] Support for embedding models run through Ollama · Issue #559 · brianpetro/obsidian-smart-connections](https://github.com/brianpetro/obsidian-smart-connections/issues/559)