# 🧠 WeilChain AI Agent Chatbot

### Web4 Intelligent Agent DApp built on WeilChain

An **AI-powered decentralized chatbot** that interacts with a **BaseAgent smart contract** on **WeilChain** to execute natural language tasks using an on-chain LLM.

This project demonstrates how to build **agentic AI applications in Web4** using:

* **WeilChain smart contracts**
* **Agent frameworks**
* **On-chain LLM execution**
* **Next.js + TypeScript frontend**

The application allows users to interact with an AI agent through a chat interface. The frontend constructs the full conversation prompt and sends it to the **BaseAgent contract**, which invokes the LLM and returns the response.

---

# 🚀 Project Overview

Traditional AI applications run entirely off-chain.
This project demonstrates a **hybrid architecture** where AI reasoning is executed via blockchain smart contracts.

Users interact with the system like a normal chatbot, but behind the scenes the request is processed by:

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
```

The blockchain acts as a **trusted execution layer for AI agents**.

---
# 🧠 System Architecture

The application follows a **Web4 agent architecture**, where the blockchain orchestrates AI execution while the frontend manages interaction and context.

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
│     Response Returned    │
│    to Frontend UI        │
└──────────────────────────┘
```

---

# 🧩 Interaction Sequence

The system executes the following steps:

1. User sends a message through the chat UI.
2. The frontend stores the conversation history locally.
3. The prompt builder converts the chat history into a structured prompt.
4. The frontend calls the **BaseAgent smart contract**.
5. The contract forwards the request to **BaseAgentHelper**.
6. The helper invokes the **LLM model on the chain**.
7. The model generates a response.
8. The response is returned to the frontend and displayed to the user.

---

# ⚡ Why This Architecture

This design separates responsibilities cleanly:

Frontend
→ manages conversation state and UI

Blockchain
→ orchestrates AI execution

AI Layer
→ handles reasoning and response generation

Benefits:

* minimal on-chain storage
* fast response time
* simple contract interface
* scalable AI agents
* composable Web4 architecture




# 🧩 Key Features

### 🤖 AI Agent Smart Contract

Uses **BaseAgent + BaseAgentHelper** to execute AI tasks using an LLM.

### 💬 Chat Interface

Clean conversational UI built with **Next.js + Tailwind**.

### 🧠 Context-aware prompts

Frontend stores chat history and constructs a full prompt before sending it to the contract.

### 🔗 Blockchain AI execution

Smart contract calls an **LLM node on the chain**.

### ⚡ Minimal on-chain state

No chat history stored on chain → faster execution.

### 🧱 Modular architecture

Easy to extend for:

* AI DeFi agents
* DAO assistants
* autonomous agents
* research copilots

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

The contract receives a **task prompt**, sends it to the LLM helper, and returns the response.

---

### Rust Contract Logic

The contract interacts with **BaseAgentHelper** to invoke the AI model.

```
run_task(task_prompt)
    │
    ▼
BaseAgentHelper.run_task()
    │
    ▼
LLM model execution
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

This enables **context-aware responses**.

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

The project uses the official **Weil SDK**.

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

### 1️⃣ Install dependencies

```
npm install
```

Install Weil SDK:

```
npm install @weilliptic/weil-sdk
```

---

### 2️⃣ Install WeilWallet

Install the **WeilWallet browser extension**.

---

### 3️⃣ Compile the smart contract

Navigate to the smart contract folder.

```
cd smart_contracts
```

Compile:

```
cargo build --target wasm32-unknown-unknown --release
```

The compiled WASM will appear in:

```
target/wasm32-unknown-unknown/release
```

---

### 4️⃣ Deploy the contract

Deploy using the Weil CLI or SDK.

Save the deployed contract address.

---

### 5️⃣ Configure the frontend

Update:

```
lib/constants.ts
```

```
export const CONTRACT_ADDRESS = "your_contract_address"
```

Note: remove `0x` prefix.

---

### 6️⃣ Run the application

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
4️⃣ Frontend constructs full conversation prompt
5️⃣ Prompt sent to BaseAgent contract
6️⃣ Contract calls LLM helper
7️⃣ LLM response returned
8️⃣ Chat UI updates

---

# 🧪 Example Query

User input:

```
Explain convolutional neural networks in simple terms
```

Response is generated by the **on-chain LLM agent**.

---

# 🔮 Future Improvements

Possible upgrades:

### 🔹 Streaming LLM responses

Token streaming from the contract.

### 🔹 Persistent chat history

Store conversations on chain.

### 🔹 Agentic workflows

Allow AI agents to call other contracts.

### 🔹 DeFi Copilot

Convert natural language into DeFi transactions.

### 🔹 Autonomous agents

Agents that trigger actions based on blockchain events.

---

# 🧠 Web4 Vision

This project represents a **Web4 paradigm** where:

* AI agents interact with blockchain infrastructure
* contracts orchestrate intelligent systems
* users communicate with decentralized agents through natural language

---

# 📜 License

MIT License

---

# 👨‍💻 Built For

**Weilliptic Hackathon – Web4 Builder Event**

Exploring the intersection of:

* Blockchain
* AI Agents
* Decentralized Infrastructure
* Autonomous Systems

---
