import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Fallback educational response generator if Gemini key is missing or offline
function generateExpertFallback(message: string, context?: string, mode?: string, lessonTitle?: string): string {
  const q = (message || '').toLowerCase();
  
  if (q.includes('chmod') || q.includes('permission') || q.includes('755') || q.includes('644') || q.includes('700')) {
    return `### Understanding Linux Permissions & Octal Math

In Linux, file permissions determine who can Read (4), Write (2), or Execute (1) a file across three spheres of authority:
1. **Owner (User - \`u\`)**: The individual account that owns the file.
2. **Group (\`g\`)**: Members of the group assigned to the file.
3. **Others (\`o\`)**: Every other account on the system.

#### Octal Binary Representation:
* \`r (Read)\` = $2^2 = 4$ (binary \`100\`)
* \`w (Write)\` = $2^1 = 2$ (binary \`010\`)
* \`x (Execute)\` = $2^0 = 1$ (binary \`001\`)

Summing the bits produces octal digits 0 to 7:
* **7 (\`rwx\`)** = 4 + 2 + 1: Full control (read, write, execute/traverse).
* **6 (\`rw-\`)** = 4 + 2: Read and write (typical data file).
* **5 (\`r-x\`)** = 4 + 1: Read and execute (typical directory or script).
* **4 (\`r--\`)** = 4: Read-only.
* **0 (\`---\`)** = No access.

**Crucial Directory Difference**: For a file, \`x\` means execute as a binary or script. For a directory, \`x\` allows traversal (\`cd\` through it or accessing files inside if you know their names), while \`r\` allows listing names (\`ls\`).`;
  }

  if (q.includes('cpu') || q.includes('fetch') || q.includes('decode') || q.includes('register') || q.includes('ram')) {
    return `### CPU Instruction Cycle & Memory Architecture

Every program you run consists of binary machine instructions residing in RAM. The CPU processes them via the **Fetch-Decode-Execute** cycle:

1. **Fetch**: The Program Counter (PC) holds the memory address of the next instruction. This address is moved to the Memory Address Register (MAR) and sent across the address bus to RAM. The instruction byte is retrieved across the data bus into the Memory Data Register (MDR), then into the Instruction Register (IR). PC is incremented.
2. **Decode**: The Control Unit (CU) breaks down the opcode and operands (e.g., \`MOV\`, \`ADD\`, \`JMP\`) into internal control signals.
3. **Execute**: The Arithmetic Logic Unit (ALU) performs math or bitwise operations, or registers are updated. If memory I/O is required, the bus cycles again.

**Memory Hierarchy Speed**:
* CPU Registers: ~0.5 nanoseconds (sub-cycle)
* L1 Cache (per core, 32-64KB): ~1 ns (~4 cycles)
* L2 Cache (per core, 256KB-1MB): ~3-4 ns (~12 cycles)
* L3 Cache (shared, 16-64MB): ~10-15 ns (~40 cycles)
* Main Memory (RAM): ~60-80 ns (~200 cycles) - *massive penalty!*
* NVMe SSD: ~20-50 microseconds (thousands of times slower)
* HDD: ~5-10 milliseconds (millions of times slower)`;
  }

  if (q.includes('packet') || q.includes('dns') || q.includes('tcp') || q.includes('three-way handshake') || q.includes('ip')) {
    return `### Network Encapsulation & Handshake Dynamics

When you request a resource like \`https://example.com\`:

1. **DNS Resolution**: The browser checks its internal cache, OS resolver cache, then queries the configured resolver (e.g., \`1.1.1.1\` or \`8.8.8.8\`). The recursive resolver queries Root Servers (.) -> TLD Servers (.com) -> Authoritative Servers (\`example.com\`) returning an IPv4 (\`A\` record) or IPv6 (\`AAAA\` record).
2. **ARP (Address Resolution Protocol)**: If the destination is on the local subnet, the host looks up the destination MAC address. If outside, it uses ARP to find the default gateway router's MAC address.
3. **TCP 3-Way Handshake**:
   - **Client -> Server**: \`SYN\` (Synchronize, Sequence Number $X$)
   - **Server -> Client**: \`SYN-ACK\` (Synchronize, Sequence Number $Y$, Acknowledgment $X+1$)
   - **Client -> Server**: \`ACK\` (Acknowledgment $Y+1$)
4. **TLS 1.3 Handshake**: Key exchange (ECDHE) happens in 1 round trip, verifying the server's X.509 certificate and establishing symmetric encryption keys (AES-GCM or ChaCha20-Poly1305).
5. **HTTP/2 or HTTP/3 Stream**: The encrypted GET request is transmitted inside TCP segments encapsulated in IP packets wrapped in Ethernet frames.`;
  }

  if (q.includes('cia') || q.includes('hash') || q.includes('crypto') || q.includes('salt') || q.includes('threat') || q.includes('vuln')) {
    return `### Cybersecurity Principles & Cryptographic Foundations

#### 1. The Core Triad
* **Confidentiality**: Ensuring data is accessible only to authorized entities (encryption at rest/in transit, access control).
* **Integrity**: Guaranteeing data has not been altered or tampered with (cryptographic hashing, digital signatures, HMACs).
* **Availability**: Ensuring authorized users have reliable access when needed (redundancy, DDoS mitigation, backups).

#### 2. Risk Equation
$$\\text{Risk} = \\text{Threat} \\times \\text{Vulnerability} \\times \\text{Impact}$$
* **Threat**: Any circumstance or entity with potential to cause harm (e.g., an external adversary, malware).
* **Vulnerability**: A flaw or weakness in software, hardware, or process (e.g., lack of input validation, unpatched buffer overflow).
* **Impact**: The damage if the vulnerability is exploited.

#### 3. Hashing vs Encryption
* **Encryption**: Two-way function. Plaintext + Key $\\rightarrow$ Ciphertext. Reversible with the proper key (AES, RSA).
* **Hashing**: One-way mathematical digest. Input $\\rightarrow$ Fixed-length output. Mathematically infeasible to invert. Must have collision resistance and avalanche effect.
* **Salting**: Adding a unique random string per password prior to hashing (e.g., in bcrypt or Argon2) to invalidate precomputed rainbow tables.`;
  }

  return `### Tutor Insight for ${lessonTitle || 'Technical Mastery'}

Great question! In technical computer science and security, understanding the underlying mechanism is always more valuable than memorizing surface commands.

Key points to verify for your current task:
1. **Component Interaction**: Trace the data flow—how does the user command traverse user space, invoke the kernel via system calls, alter hardware state, or send packets across network interfaces?
2. **Security Posture**: Ask yourself: What are the security boundaries here? Who has ownership, what privileges are required, and what could fail if untrusted input is introduced?
3. **Verification**: Always run an inspection command (such as \`ls -la\`, \`stat\`, \`ps aux\`, or check the response status) to verify the actual state rather than assuming it succeeded.

Would you like a deeper technical breakdown, a real-world architectural analogy, or a hint on a specific lab task?`;
}

// AI Tutor chat & assistance endpoint
app.post('/api/tutor', async (req, res) => {
  try {
    const { message, context, mode, lessonTitle } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.json({
        reply: generateExpertFallback(message, context, mode, lessonTitle)
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = `You are KernelCraft's Senior Professor & Cybersecurity Mentor.
You teach Computer Architecture, Operating Systems, Linux Internals, Systems Programming, Networking, and Defensive/Authorized Cybersecurity.
Pedagogical Guidelines:
- Learn -> Understand -> See an Example -> Try It -> Question -> Practise -> Challenge -> Review.
- Teach why things work internally (registers, syscalls, kernel structures, memory maps, RFC protocols).
- If the student is asking for answers to an active challenge or quiz, DO NOT reveal the flag or final answer immediately; instead, provide Socratic hints, explain how to investigate it in the terminal, or explain the conceptual flaw.
- Keep cybersecurity education strictly focused on authorized educational sandboxes, defensive architecture, and legal practice.
- Be encouraging, precise, and authoritative with clean Markdown formatting and code examples.

Current Lesson: ${lessonTitle || 'Computer Science & Security'}
Context/State: ${context || 'General inquiry'}
Requested mode: ${mode || 'standard'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemInstruction}\n\nUser Question:\n${message}` }]
        }
      ]
    });

    const reply = response.text || generateExpertFallback(message, context, mode, lessonTitle);
    res.json({ reply });
  } catch (error: any) {
    console.error('Error invoking Gemini tutor:', error?.message || error);
    res.json({
      reply: generateExpertFallback(req.body.message, req.body.context, req.body.mode, req.body.lessonTitle)
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Mount Vite middleware in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KernelCraft Academy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
