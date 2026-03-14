# 🧠 WeilChain AI Agent Chatbot

### Web4 Intelligent Agent DApp built on WeilChain

An **AI-powered decentralized chatbot** that interacts with a **BaseAgent smart contract** on **WeilChain** and leverages **MCP (Model Context Protocol) servers** to execute natural language tasks using an on-chain LLM.

This project demonstrates how to build **agentic AI applications in Web4** using:

* **WeilChain smart contracts**
* **Model Context Protocol (MCP) servers**
* **Agent frameworks**
* **On-chain LLM execution**
* **Next.js + TypeScript frontend**

The application allows users to interact with an AI agent through a chat interface. The frontend constructs the full conversation prompt and sends it to the **BaseAgent contract**, which invokes the **LLM and available MCP tools** to generate intelligent responses.

---

# 🚀 Project Overview

Traditional AI applications run entirely off-chain.

This project demonstrates a **hybrid Web4 architecture** where AI reasoning and tool usage are orchestrated by blockchain smart contracts.

Users interact with the system like a normal chatbot, but behind the scenes the request flows through an **agent + MCP tool ecosystem**.

```
Frontend UI
     │
     ▼
BaseAgent Smart Contract
     │
     ▼
BaseAgentHelper
     │
     ▼
LLM Node
     │
     ▼
MCP Tool Servers
```

The blockchain acts as a **trusted orchestration layer for intelligent agents and tools**.

---

# 🧠 What is MCP?

**Model Context Protocol (MCP)** is a standardized interface that allows AI models to interact with external tools.

On WeilChain:

* MCP servers are **smart contract applets**
* Each function becomes an **AI-callable tool**
* Tools are described in structured JSON
* The AI model decides when to call them

Example tools exposed by an MCP server:

```
add(x, y)
multiply(x, y)
```

The AI agent can automatically call these tools while solving tasks.

This enables **true agentic AI systems** where the LLM can reason and execute actions.

---

# 🧠 System Architecture

The application follows a **Web4 agent architecture**, where the blockchain orchestrates AI execution and tool access while the frontend manages user interaction.

```text
┌──────────────────────────┐
│        User Browser      │
│  Next.js Chat Interface  │
└──────────────┬───────────┘
               │
               │ Natural language prompt
               ▼
┌──────────────────────────┐
│      Prompt Builder      │
│  Builds conversation     │
│  context from chat state │
└──────────────┬───────────┘
               │
               │ run_task(prompt)
               ▼
┌──────────────────────────┐
│   WeilWallet Connection  │
│     Weil SDK Client      │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│    BaseAgent Contract    │
│  Smart contract on chain │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│   BaseAgentHelper (AI)   │
│  Agent orchestration     │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│        LLM Node          │
│       GPT-5.1 Model      │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│       MCP Servers        │
│  AI-callable tool APIs   │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│     Response Returned    │
│    to Frontend UI        │
└──────────────────────────┘
```

---

# 🧠 Visual Overview — AI Agent + MCP Tool Ecosystem

To better illustrate the power of **agentic AI on WeilChain**, the diagram below shows how a user query flows through the **AI agent**, **MCP tool servers**, and **blockchain infrastructure**.

```text
                     ┌───────────────────────────────┐
                     │            USER               │
                     │   Natural language prompt     │
                     │  "Swap 100 USDT to ETH"       │
                     └───────────────┬───────────────┘
                                     │
                                     ▼
                   ┌──────────────────────────────────┐
                   │        Next.js Chat UI           │
                   │   Stores conversation history    │
                   │   Builds structured prompt       │
                   └───────────────┬──────────────────┘
                                   │
                                   ▼
                     ┌──────────────────────────┐
                     │      WeilWallet SDK      │
                     │  Sends contract request  │
                     └───────────────┬──────────┘
                                     │
                                     ▼
                ┌─────────────────────────────────────┐
                │        BaseAgent Smart Contract     │
                │        run_task(task_prompt)        │
                └───────────────┬─────────────────────┘
                                │
                                ▼
                ┌─────────────────────────────────────┐
                │        BaseAgentHelper              │
                │  LLM orchestration + tool routing   │
                └───────────────┬─────────────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │        LLM Model        │
                    │        GPT-5.1          │
                    │  reasoning + planning   │
                    └───────────┬─────────────┘
                                │
                                │ tool calls via MCP
                                ▼
      ┌────────────────────────────────────────────────────────┐
      │                MCP Tool Servers (Applet Layer)         │
      │                                                        │
      │  ┌───────────────────┐   ┌─────────────────────────┐   │
      │  │ Arithmetic MCP    │   │ DeFi MCP (future idea)  │   │
      │  │ add(x,y)          │   │ swap_tokens()           │   │
      │  │ multiply(x,y)     │   │ stake_tokens()          │   │
      │  └───────────────────┘   └─────────────────────────┘   │
      │                                                        │
      └───────────────┬────────────────────────────────────────┘
                      │
                      ▼
              ┌──────────────────┐
              │  Tool Execution  │
              │  Results return  │
              └─────────┬────────┘
                        │
                        ▼
                ┌──────────────────┐
                │  LLM Final Reply │
                └─────────┬────────┘
                          │
                          ▼
                ┌──────────────────┐
                │  Chat UI Update  │
                │  Response shown  │
                └──────────────────┘
```

---

# 🧠 What Makes This Web4

This architecture represents a **new paradigm of decentralized intelligence**:

| Layer       | Responsibility                       |
| ----------- | ------------------------------------ |
| Frontend    | User interaction and prompt building |
| Blockchain  | Agent execution and orchestration    |
| AI Model    | Reasoning and planning               |
| MCP Servers | External tools and actions           |

Instead of AI being isolated in centralized APIs, **intelligence becomes composable and decentralized**.

---

# ⚡ Why MCP is Powerful

Traditional LLM chatbots can only generate text.

With MCP tools, the AI agent can:

* call functions
* interact with external services
* perform blockchain actions
* retrieve real-time data

Example reasoning flow:

```text
User: What is 7 × 8?

LLM decides:
→ call MCP tool multiply(7,8)

MCP returns:
56

LLM responds:
"The result is 56."
```

The same architecture can scale to complex systems:

```text
User: Swap 100 USDT to ETH

LLM decides:
→ call swap_tokens() MCP tool
```

---

# 🚀 Future Vision: Autonomous Web4 Agents

This architecture unlocks powerful future possibilities:

### AI DeFi Copilot

Natural language → blockchain transactions

### DAO Governance Agents

AI assistants that interact with governance contracts

### Research Agents

AI models calling external knowledge tools

### Autonomous Trading Bots

AI agents executing strategies on-chain

---

# 🎯 Hackathon Insight

The key idea demonstrated in this project:

**AI agents + decentralized tools = programmable intelligence layer for Web4**

Instead of just deploying smart contracts, developers can now deploy:

* AI agents
* tool ecosystems
* autonomous workflows

All running on decentralized infrastructure.

---

# 🌌 One Sentence Summary

**This project demonstrates how AI agents on WeilChain can reason with LLMs and interact with decentralized tools through MCP servers, creating the foundation for programmable Web4 intelligence.**


# 🧩 Interaction Sequence

1. User sends a message through the chat UI.
2. The frontend stores conversation history locally.
3. The prompt builder converts chat history into a structured prompt.
4. The frontend calls the **BaseAgent smart contract**.
5. The contract forwards the request to **BaseAgentHelper**.
6. The helper invokes the **LLM model on the chain**.
7. The model may call **MCP tool servers** if required.
8. MCP tools execute their functions.
9. Results return to the LLM.
10. Final response is returned to the frontend UI.

---

# ⚡ Why This Architecture

This design separates responsibilities clearly:

Frontend
→ manages conversation state and UI

Blockchain
→ orchestrates AI agents and tool access

AI Layer
→ performs reasoning and decision-making

MCP Layer
→ provides external functionality as tools

Benefits:

* minimal on-chain storage
* composable AI tools
* decentralized AI execution
* scalable agent architecture
* transparent tool usage

---

# 🧩 Key Features

### 🤖 AI Agent Smart Contract

Uses **BaseAgent + BaseAgentHelper** to execute AI tasks.

### 🧰 MCP Tool Integration

AI models can call **external tools via MCP servers**.

### 💬 Chat Interface

Built with **Next.js + Tailwind**.

### 🧠 Context-aware prompts

Frontend stores conversation history and constructs prompts dynamically.

### 🔗 Blockchain AI execution

Smart contract orchestrates AI reasoning and tool access.

### ⚡ Minimal on-chain state

No chat history stored on chain → faster execution.

### 🧱 Modular architecture

Easily extendable with new MCP tools.

---

# 🏗 Architecture

```
User (Browser UI)
        │
        ▼
Next.js Frontend
        │
        │ builds prompt from conversation history
        ▼
WeilWallet SDK
        │
        ▼
BaseAgent Smart Contract
        │
        ▼
BaseAgentHelper
        │
        ▼
LLM Node (GPT-5.1)
        │
        ▼
MCP Tool Servers
```

---

# 📂 Project Structure

```
PROJECT_CODE
│
├── app
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│
├── components
│   ├── ChatWindow.tsx
│   ├── ConnectWallet.tsx
│   ├── MessageInput.tsx
│
├── contracts
│   └── bindings.ts
│
├── lib
│   ├── constants.ts
│   └── promptBuilder.ts
│
├── services
│   ├── agent.ts
│   ├── chatbot.ts
│   └── wallets.ts
│
├── smart_contracts
│   ├── src
│   │   └── lib.rs
│   ├── base_agent.widl
│   ├── Cargo.toml
│   └── target/
│
├── public
├── package.json
└── README.md
```

---

# ⚙ Smart Contract

### WIDL Interface

```
interface BaseAgent {
    query func run_task(task_prompt: string) -> result<string,string>
}
```

The contract receives a **task prompt**, sends it to the AI agent helper, and returns the response.

---

### Rust Contract Logic

```
run_task(task_prompt)
    │
    ▼
BaseAgentHelper.run_task()
    │
    ▼
LLM model execution
    │
    ▼
Optional MCP tool calls
```

Model used:

```
Model::GPT_5POINT1
```

---

# 🧠 Prompt Construction

The frontend stores messages locally and builds the prompt dynamically.

Example conversation:

```
User: What is CNN?
Assistant: CNN stands for convolutional neural network...

User: explain the second part
```

Prompt sent to contract:

```
System: You are a helpful AI assistant

User: What is CNN?
Assistant: CNN stands for convolutional neural network...

User: explain the second part
```

This enables **context-aware AI responses**.

---

# 🖥 Frontend

Built using:

* Next.js (App Router)
* TypeScript
* Tailwind CSS

Main UI components:

| Component     | Purpose               |
| ------------- | --------------------- |
| ChatWindow    | Displays conversation |
| MessageInput  | Sends messages        |
| ConnectWallet | Connects WeilWallet   |

---

# 🔌 Weil SDK Integration

Example wallet connection:

```
import { WeilWalletConnection } from "@weilliptic/weil-sdk"

const wallet = new WeilWalletConnection({
  walletProvider: window.WeilWallet
})
```

Executing a contract method:

```
wallet.contracts.execute(
   contractAddress,
   "run_task",
   { task_prompt: prompt }
)
```

---

# 🛠 Installation

### 1 Install dependencies

```
npm install
```

Install Weil SDK:

```
npm install @weilliptic/weil-sdk
```

---

### 2 Install WeilWallet

Install the **WeilWallet browser extension**.

---

### 3 Compile the smart contract

```
cd smart_contracts
cargo build --target wasm32-unknown-unknown --release
```

---

### 4 Deploy MCP servers (optional tools)

Example MCP deployment:

```
deploy -f arithmetic_mcp.wasm -p arithmetic.widl
```

Copy the MCP contract address.

---

### 5 Deploy BaseAgent

Deploy with MCP server address:

```
deploy \
-f base_agent.wasm \
-p base_agent.widl \
-i '{"description":"AI chatbot agent","mcp_contract_address":"MCP_ADDRESS"}'
```

---

### 6 Configure frontend

Update:

```
lib/constants.ts
```

```
export const CONTRACT_ADDRESS = "BASE_AGENT_ADDRESS"
```

(Remove `0x` prefix.)

---

### 7 Run the app

```
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 🎥 Demo Flow

1️⃣ User opens the DApp
2️⃣ Connects WeilWallet
3️⃣ Sends a message
4️⃣ Frontend builds conversation prompt
5️⃣ Prompt sent to BaseAgent contract
6️⃣ LLM processes prompt
7️⃣ AI optionally calls MCP tools
8️⃣ Final response returned
9️⃣ Chat UI updates

---

# 🔮 Future Improvements

Possible extensions:

### 🔹 More MCP tool servers

* DeFi operations
* price feeds
* blockchain analytics
* DAO governance

### 🔹 Multi-agent systems

Agents coordinating through smart contracts.

### 🔹 Autonomous Web4 agents

Agents triggered by on-chain events.

### 🔹 DeFi Copilot

Natural language → blockchain transactions.

---

# 🧠 Web4 Vision

This project demonstrates a **Web4 paradigm** where:

* AI agents live on decentralized infrastructure
* blockchain coordinates intelligent systems
* MCP tools enable real-world interaction
* users interact through natural language

---

# 📜 License

MIT License

---

# 👨‍💻 Built For

**Weilliptic Hackathon – Web4 Builder Event**

Exploring the intersection of:

* Blockchain
* AI Agents
* MCP Tool Ecosystems
* Autonomous Systems
