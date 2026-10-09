# KernelCraft: Computer Science, Linux & Cybersecurity Academy

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A520.0.0-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)

> **A comprehensive digital textbook, personal Socratic tutor, interactive laboratory platform, and progress tracker** spanning Computer Architecture, Operating Systems & Linux Internals, Systems Programming, Networking Protocols, and Authorized Cybersecurity Defense.

---

## 📖 Curriculum Roadmap

KernelCraft is built around the learning philosophy:  
**Learn → Understand → See an Example → Try It → Question → Practise → Challenge → Review → Continue**

```
COMPUTER FUNDAMENTALS & HARDWARE
              ↓
  OPERATING SYSTEMS ARCHITECTURE
              ↓
       LINUX MASTERCLASS
              ↓
     SYSTEMS PROGRAMMING
              ↓
      COMPUTER NETWORKING
              ↓
  CYBERSECURITY FUNDAMENTALS
              ↓
    PRACTICAL SECURITY LABS
              ↓
  ADVANCED DEFENSE & HARDENING
```

### 1. Stage 1 — Computer Hardware & Architecture
* **What Is a Computer?**: Physical voltages representing information ($0\text{V} \leftrightarrow +3.3\text{V}$), hardware vs. software, the IPSO lifecycle (Input, Processing, Storage, Output), and John von Neumann's stored-program architecture.
* **The CPU**: Control Unit (CU), Arithmetic Logic Unit (ALU), architectural registers (PC, MAR, MDR, IR, ACC), multi-tier SRAM caches (L1/L2/L3), and the micro-steps of the Fetch-Decode-Execute instruction cycle.
* **RAM & Storage**: Byte-addressed memory, volatile dynamic RAM vs. persistent non-volatile NAND/NVMe/HDD, virtual memory swapping, page faults, and thrashing.
* **Binary, Hexadecimal & Data Representation**: Powers of two, signed Two's Complement, nibbles, bytes, hexadecimal mapping, and ASCII/UTF-8 Unicode encoding.
* **The Hardware Boot Process**: Power Good (PG) voltage stabilization, motherboard VRMs, UEFI/BIOS firmware, POST diagnostics, bootloaders (GRUB), kernel decompression, and initramfs to PID 1 (`systemd`).

### 2. Stage 2 — Operating Systems & Linux Mastery
* **Kernel & User Space**: Hardware abstraction, Ring 0 (Supervisor) vs. Ring 3 (User), system calls (`read`, `write`, `fork`, `execve`), and the `strace` boundary.
* **Linux Terminal & FHS**: Inverted tree hierarchy (`/`, `/home`, `/etc`, `/var`, `/tmp`, `/usr`, `/proc`, `/sys`), relative vs. absolute paths, and command syntax (`pwd`, `ls -la`, `cd`, `cat`, `touch`, `mkdir`, `cp`, `mv`, `rm`).
* **Users, Groups & Identity**: UIDs, GIDs, root (UID 0), system accounts, `/etc/passwd`, `/etc/group`, and deep deconstruction of `whoami`, `id`, and `groups`.
* **Linux Permissions Masterclass**: Character-by-character breakdown of `-rwxr-xr--`, octal mathematics ($r=4, w=2, x=1$), numeric modes (`755`, `644`, `700`, `600`), symbolic modes (`u+x`, `g-w`, `o-r`), and directory traversal ($x$) vs. file execution.
* **File Metadata & Ownership**: Deep inspection with `stat`, Inodes, timestamps (`atime`, `mtime`, `ctime`), and administrative boundaries of `chown` and `chgrp`.
* **I/O, Redirection, Pipes & Processes**: File descriptors (`stdin 0`, `stdout 1`, `stderr 2`), `>`, `>>`, Unix pipelines (`|`), process states in `ps aux`, `top`, signals (`SIGTERM 15`, `SIGKILL 9`), and environment variables (`$PATH`).

### 3. Stage 3 — Programming: From Logic to Systems C
* **Core Computational Logic**: Algorithms, primitive types in memory, integer overflow mechanics, branching conditions, loops, and function call stacks.
* **Python for Automation & Security**: System administration scripting, socket probing, reading system configuration files, and parsing web server logs.
* **Low-Level C & Memory Architecture**: Pointers (`*p`, `&x`), direct memory addressing, Stack vs. Heap allocation, buffer structures, and memory-safety defense.

### 4. Stage 4 — Computer Networking & Internet Protocols
* **Networking Fundamentals**: LAN, WAN, Internet, packet encapsulation vs. decapsulation, and the OSI 7-layer model vs. TCP/IP stack.
* **Addressing & Subnetting**: EUI-48 physical MAC addresses, 32-bit IPv4, RFC 1918 private address ranges, IPv6, subnet calculation, and CIDR prefix notation (`/24`, `/16`, `/28`).
* **Core Transport Protocols**: ARP local gateway resolution, TCP 3-Way Handshake (`SYN`, `SYN-ACK`, `ACK`), sequence numbers, reliable delivery, and TCP vs. UDP.
* **The Journey of a Web Request**: Hierarchical DNS resolution (Root `.` → TLD `.com` → Authoritative), ARP discovery, TCP socket setup, TLS 1.3 cryptographic key exchange, encrypted HTTP request, and browser DOM rendering.
* **Ports & Network Devices**: Port ranges (0–65535, common ports 22, 53, 80, 443), listening daemons, routers, Layer 2 switches, and firewalls.

### 5. Stage 5 — Cybersecurity Fundamentals & Defense
* **Foundational Security Concepts**: The CIA Triad (Confidentiality, Integrity, Availability), AAA, Least Privilege, Defense in Depth, and Risk modeling ($\text{Risk} = \text{Threat} \times \text{Vulnerability} \times \text{Impact}$).
* **Cryptography in Practice**: Symmetric encryption (AES) vs. Asymmetric key pairs (RSA/ECC), one-way cryptographic hashing (SHA-256), the avalanche effect, unique salt defense against rainbow tables, and password hashing (Argon2, bcrypt).
* **Web Security Architecture**: Session management, secure cookie flags (`HttpOnly`, `Secure`, `SameSite`), Insecure Direct Object References (IDOR/BOLA), and SQL injection defense via Parameterized Queries.

### 6. Stage 6 — Practical Security Labs (Contained Sandboxes)
Six progressive, fully interactive CTF-style defense challenges:
1. **Linux Permissions & Configuration Audit**: Inspect `/etc/security_audit`, analyze misconfigured 0777 files with `stat`, apply `chmod 640`, and recover the audit token.
2. **Multi-Layer Encoded Communication Analyst**: Convert Hex byte streams into ASCII, unpack Base64, and reverse ROT13 Caesar substitution ciphers.
3. **Network Packet Capture & Cleartext Credential Hunter**: Filter `.pcap` packet streams, identify unencrypted HTTP port 80 basic authentication headers, and decode credentials.
4. **Web Application IDOR & Authorization Audit**: Intercept REST API requests, test invoice parameter tampering, and enforce server-side token authorization checks.
5. **Server Incident Forensics & SSH Brute-Force Triage**: Parse `/var/log/auth.log`, isolate attacking IP addresses, calculate failed attempt frequencies, and trace compromised users.
6. **Multi-Stage Defense-in-Depth Assessment**: Audit listening ports, review `/etc/sudoers.d/audit_rules`, detect dangerous `find -exec` configurations, and report mitigations.

### 7. Stage 7 — Advanced Security & Threat Analysis
* **Advanced Linux Hardening**: SUID/SGID bits (`chmod 4755`), Linux POSIX Capabilities (`CAP_NET_BIND_SERVICE`), and Mandatory Access Control (MAC).
* **Active Directory Architecture**: Domain Controllers, Kerberos authentication workflows (KDC, AS-REQ, TGT, TGS, Service Tickets), and event log auditing.
* **SOC Operations & Incident Response**: NIST SP 800-61 6-phase lifecycle (Preparation, Detection, Containment, Eradication, Recovery, Lessons Learned) and MITRE ATT&CK enterprise mapping.

---

## 🛠️ Interactive Simulators & Tools

* 🛡️ **Linux Permissions Calculator**: Live visual toggler for Read (4), Write (2), and Execute (1) across Owner, Group, and Others; live octal computation, symbolic preview, and File vs. Directory mode switcher.
* ⚡ **CPU Fetch-Decode-Execute Simulator**: Step-by-step register clock ticks tracking Program Counter (PC), MAR, MDR, IR, ACC, and ALU with live highlighted Address, Data, and Control buses.
* 🔢 **8-Bit Binary Data Sandbox**: Interactive bit toggling with simultaneous updates across Unsigned Decimal, Signed Two's Complement, Hexadecimal (`0x..`), ASCII characters, and bitwise operations (`NOT`, shifts).
* 🌐 **Subnet & CIDR Calculator**: Live subnet boundary calculations, network and broadcast addresses, usable host capacities, RFC 1918 classification, and visual network vs. host bit partition bars.
* 🚀 **Packet Journey Simulator**: Interactive 7-epoch stepper from browser address bar to DOM paint, displaying wire headers at each layer.
* 🔐 **Cryptography & Hashing Sandbox**: Real-time SHA-256 calculation with avalanche effect bit counters, salt protection demonstrations, and Base64 encoding comparisons.
* 💻 **Linux Sandbox Terminal**: Realistic in-browser bash terminal with an in-memory virtual filesystem (`/`, `/home/student`, `/etc`, `/var/log`, `/tmp`, `/proc`), supporting commands, pipes (`|`), and redirection (`>`, `>>`).

---

## 🤖 Personal AI Socratic Tutor

KernelCraft includes an interactive AI Mentor powered by Google's modern `@google/genai` TypeScript SDK:
* **Socratic Instruction**: Provides conceptual hints and questions instead of spoiling answers to active lab challenges or quizzes.
* **Explain Differently**: Converts abstract computer science concepts into intuitive physical analogies.
* **Common Mistakes**: Explains frequent pitfalls and how to avoid them.
* **Deep Dive Mechanics**: Explores kernel internals, assembly instructions, and protocol RFCs.
* **Offline-Resilient**: Automatically falls back to built-in expert knowledge if offline or when no API key is configured.

---

## 🚀 Quick Start Guide

### Prerequisites
* [Node.js](https://nodejs.org/) (version 20.x or higher)
* `npm` or `pnpm` or `bun`

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/kernelcraft-academy.git
cd kernelcraft-academy
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Optional)* Add your Google Gemini API key to enable live AI tutor responses:
```env
GEMINI_API_KEY="your_gemini_api_key_here"
PORT=3000
```
> Note: If no API key is provided, KernelCraft's intelligent built-in mentor engine still provides comprehensive architectural explanations for all curriculum modules!

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
├── server.ts                       # Full-stack Express server with Gemini AI tutor API
├── src/
│   ├── App.tsx                     # Main application container & view orchestration
│   ├── main.tsx                    # React DOM entry point
│   ├── index.css                   # Tailwind CSS v4 styling & typography
│   ├── types/                      # TypeScript definitions (Lessons, Stages, Labs, Questions)
│   ├── data/
│   │   ├── curriculum.ts           # 7-stage comprehensive course content & quizzes
│   │   ├── labs.ts                 # 6 practical security challenges (CTF-style)
│   │   └── glossary.ts             # Searchable dictionary of technical CS & security terms
│   ├── services/
│   │   └── storage.ts              # LocalStorage persistence engine for user progress
│   └── components/
│       ├── layout/                 # Top Header, Sidebar navigation, Roadmaps
│       ├── dashboard/              # Progress overview, statistics, Continue Learning hero
│       ├── lesson/                 # Detailed lesson renderer, copy blocks, checkpoints
│       ├── terminal/               # In-browser simulated Linux bash terminal
│       ├── labs/                   # Practical security challenges workspace & flag validator
│       ├── visualizers/            # Permissions, CPU, Binary, Subnet, Packet & Crypto tools
│       ├── tutor/                  # Sliding AI Mentor drawer with Socratic guidance
│       ├── modals/                 # Global search modal (Ctrl+K)
│       ├── glossary/               # Filterable technical glossary view
│       └── notes/                  # Persistent personal notes and bookmarks manager
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🛡️ Authorized & Ethical Learning Notice

All security testing techniques and practical challenges within KernelCraft are explicitly designed for **authorized educational sandboxes, local capture-the-flag environments, and defensive systems hardening**. Never attempt penetration testing or unsolicited scanning against systems without prior formal written authorization from verified owners.

---

## 📄 License

This project is open-source and distributed under the [MIT License](LICENSE).
