import { GlossaryTerm } from '../types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'term-alu',
    term: 'Arithmetic Logic Unit (ALU)',
    category: 'Hardware',
    definition: 'The combinational electronic circuitry within a CPU that executes arithmetic operations (addition, subtraction) and boolean logic operations (AND, OR, NOT, XOR, bit shifts).',
    deepExplanation: 'The ALU receives binary inputs from CPU internal registers, applies control signals from the Control Unit to configure internal multiplexers and full-adder logic, and writes the calculated output to the Accumulator or destination register while updating CPU status flags (Zero, Carry, Overflow).',
    relatedTerms: ['CPU', 'Control Unit', 'Register', 'Instruction Cycle'],
    lessonStageId: 'stage-1-hardware'
  },
  {
    id: 'term-program-counter',
    term: 'Program Counter (PC)',
    category: 'Hardware',
    definition: 'A specialized CPU register that holds the memory address of the next machine instruction waiting to be fetched and executed.',
    deepExplanation: 'During the Fetch phase of the Fetch-Decode-Execute cycle, the PC value is copied to the Memory Address Register (MAR) and incremented. In branch or jump instructions, the PC is overwritten with the target address. In x86-64, it is known as the Instruction Pointer (%rip).',
    relatedTerms: ['CPU', 'Instruction Pointer (%rip)', 'MAR', 'Buffer Overflow'],
    lessonStageId: 'stage-1-hardware'
  },
  {
    id: 'term-von-neumann',
    term: 'Von Neumann Architecture',
    category: 'Hardware',
    definition: 'The fundamental computer architecture where both program instructions and program data share the same unified memory space.',
    deepExplanation: 'Introduced by John von Neumann in 1945, this design replaced fixed-function patch-cord computers with general-purpose stored-program computers. The shared bus between CPU and memory introduces the "Von Neumann Bottleneck", mitigated by multi-level SRAM caches.',
    relatedTerms: ['RAM', 'CPU', 'L1/L2/L3 Cache', 'Bus'],
    lessonStageId: 'stage-1-hardware'
  },
  {
    id: 'term-byte-addressable',
    term: 'Byte-Addressable Memory',
    category: 'Hardware',
    definition: 'An architecture where each individual 8-bit byte of physical memory has a distinct, unique numerical address.',
    deepExplanation: 'Even though modern 64-bit CPUs fetch 64 bits (8 bytes) at a time across the memory bus, software references memory at byte granularity using hexadecimal pointers (e.g., 0x7fff5fbff8b0).',
    relatedTerms: ['RAM', 'Hexadecimal', 'Pointers', 'Memory Alignment'],
    lessonStageId: 'stage-1-hardware'
  },
  {
    id: 'term-kernel',
    term: 'Kernel',
    category: 'Operating Systems & Linux',
    definition: 'The core program of an operating system running in Ring 0 with complete, unrestricted control over physical hardware, memory, and devices.',
    deepExplanation: 'The kernel provides hardware abstraction, schedules threads across CPU cores, manages the virtual memory translation tables (page tables), and enforces security boundaries between isolated user processes.',
    relatedTerms: ['User Space', 'System Calls', 'Ring 0', 'MMU'],
    lessonStageId: 'stage-2-linux'
  },
  {
    id: 'term-system-call',
    term: 'System Call (Syscall)',
    category: 'Operating Systems & Linux',
    definition: 'The formal, programmatic boundary through which an unprivileged user-space application requests a privileged service from the operating system kernel.',
    deepExplanation: 'When an application needs to read a file, create a network socket, or allocate RAM, it executes the `syscall` CPU instruction. The CPU traps into Ring 0, where the kernel validates permissions, executes the request, and returns control to user space.',
    relatedTerms: ['Kernel', 'strace', 'Ring 3', 'POSIX'],
    lessonStageId: 'stage-2-linux'
  },
  {
    id: 'term-inode',
    term: 'Inode (Index Node)',
    category: 'Operating Systems & Linux',
    definition: 'A fundamental filesystem data structure on Linux/Unix that stores all metadata about a file except its filename and raw data bytes.',
    deepExplanation: 'An inode stores: file type, permissions (rwxrwxrwx), owner UID, group GID, file size in bytes, link count, pointers to disk data blocks, and three timestamps: atime, mtime, and ctime. Directory entries are merely lookups that map human filenames to inode numbers.',
    relatedTerms: ['stat', 'chmod', 'chown', 'Hard Link'],
    lessonStageId: 'stage-2-linux'
  },
  {
    id: 'term-chmod',
    term: 'chmod (Change Mode)',
    category: 'Operating Systems & Linux',
    definition: 'The Linux utility used to modify file and directory access permissions for the owner, group, and other users.',
    deepExplanation: 'Supports octal notation (e.g. 755 = rwxr-xr-x, 644 = rw-r--r--) and symbolic notation (e.g. chmod u+x, g-w, o= file). Permissions are internally stored as bitmasks: r=4, w=2, x=1.',
    relatedTerms: ['Linux Permissions', 'Octal', 'chown', 'stat'],
    lessonStageId: 'stage-2-linux'
  },
  {
    id: 'term-pipe',
    term: 'Unix Pipeline (|)',
    category: 'Operating Systems & Linux',
    definition: 'An inter-process communication mechanism that channels the standard output (stdout) of one process directly into the standard input (stdin) of another.',
    deepExplanation: 'Pipes are implemented in the kernel as in-memory circular FIFO buffers. Neither process writes to persistent disk storage, allowing extremely high-speed streaming data processing between modular CLI tools.',
    relatedTerms: ['stdin', 'stdout', 'stderr', 'Redirection'],
    lessonStageId: 'stage-2-linux'
  },
  {
    id: 'term-cidr',
    term: 'CIDR (Classless Inter-Domain Routing)',
    category: 'Networking',
    definition: 'A flexible method for allocating IP addresses and IP routing where a suffix (e.g., /24) indicates how many bits represent the network prefix.',
    deepExplanation: 'In an IPv4 address with /24, the first 24 bits designate the network, leaving 32 - 24 = 8 bits for host addresses. This allows 2^8 = 256 total addresses, minus 2 reserved (network address and broadcast address), yielding 254 usable host addresses.',
    relatedTerms: ['Subnet Mask', 'IPv4', 'RFC 1918', 'Broadcast Address'],
    lessonStageId: 'stage-4-networking'
  },
  {
    id: 'term-arp',
    term: 'ARP (Address Resolution Protocol)',
    category: 'Networking',
    definition: 'The Layer 2/3 protocol used to discover the physical hardware MAC address corresponding to a known IP address on a local network segment.',
    deepExplanation: 'When a host needs to deliver an IP packet to a local destination, it broadcasts an Ethernet frame asking "Who has IP X.X.X.X? Tell Y.Y.Y.Y". The target replies with its MAC address, which the requester records in its local ARP cache table.',
    relatedTerms: ['MAC Address', 'Ethernet', 'Layer 2', 'Default Gateway'],
    lessonStageId: 'stage-4-networking'
  },
  {
    id: 'term-tcp-handshake',
    term: 'TCP 3-Way Handshake',
    category: 'Networking',
    definition: 'The three-step synchronization process (SYN, SYN-ACK, ACK) required to establish a reliable, stateful connection between client and server over TCP.',
    deepExplanation: 'The client sends a SYN packet with Initial Sequence Number (ISN) X. The server responds with SYN-ACK, choosing ISN Y and acknowledging X+1. The client responds with ACK, acknowledging Y+1. Both endpoints are now synchronized and ready for bidirectional data transfer.',
    relatedTerms: ['TCP', 'UDP', 'Port', 'SYN Flood'],
    lessonStageId: 'stage-4-networking'
  },
  {
    id: 'term-dns',
    term: 'DNS (Domain Name System)',
    category: 'Networking',
    definition: 'The hierarchical, distributed database system that translates human-friendly domain names (e.g., example.com) into numerical IP addresses (e.g., 93.184.216.34).',
    deepExplanation: 'Resolution proceeds from the Root Servers (.) down to Top-Level Domain (TLD) servers (.com, .org), down to Authoritative Name Servers that hold the specific resource records (A for IPv4, AAAA for IPv6, MX for mail, CNAME for alias).',
    relatedTerms: ['A Record', 'TLD', 'Recursive Resolver', 'UDP Port 53'],
    lessonStageId: 'stage-4-networking'
  },
  {
    id: 'term-cia-triad',
    term: 'CIA Triad',
    category: 'Cybersecurity',
    definition: 'The foundational model of information security encompassing Confidentiality, Integrity, and Availability.',
    deepExplanation: 'Confidentiality guarantees data is visible only to authorized users (encryption, ACLs). Integrity ensures data has not been modified or deleted without authorization (hashing, signatures). Availability ensures systems are operational and accessible when needed (redundancy, DDoS mitigation).',
    relatedTerms: ['AAA', 'Least Privilege', 'Threat Modeling', 'Defense in Depth'],
    lessonStageId: 'stage-5-cybersecurity'
  },
  {
    id: 'term-hash',
    term: 'Cryptographic Hash Function',
    category: 'Cryptography',
    definition: 'A mathematical algorithm that maps arbitrary-sized data to a fixed-length string of bits, designed to be one-way and collision-resistant.',
    deepExplanation: 'Key properties: Determinism (same input = same hash), Pre-image resistance (impossible to reverse), Collision resistance (impossible to find two different inputs with identical hashes), and the Avalanche effect (changing 1 bit flips ~50% of hash bits). Examples include SHA-256 and SHA-3.',
    relatedTerms: ['SHA-256', 'MD5', 'Salting', 'Digital Signature'],
    lessonStageId: 'stage-5-cybersecurity'
  },
  {
    id: 'term-salt',
    term: 'Cryptographic Salt',
    category: 'Cryptography',
    definition: 'A cryptographically random string added to a password before hashing to defend against rainbow table attacks and ensure identical passwords yield distinct hashes.',
    deepExplanation: 'Without a salt, an attacker who computes SHA256("password123") once can match that hash across millions of compromised database records. With a unique 16-byte random salt per user, the attacker must independently compute millions of iterations per individual user.',
    relatedTerms: ['bcrypt', 'Argon2', 'Rainbow Table', 'Password Hashing'],
    lessonStageId: 'stage-5-cybersecurity'
  },
  {
    id: 'term-idor',
    term: 'Insecure Direct Object Reference (IDOR)',
    category: 'Cybersecurity',
    definition: 'A web security vulnerability where an application uses user-supplied input to access an internal object (e.g. database row or file) without validating user authorization.',
    deepExplanation: 'Example: An API endpoint /api/user/1042/invoice returns an invoice. If user 1042 changes the URL to /api/user/1001/invoice and the server returns user 1001\'s invoice without checking session permissions, an IDOR flaw exists. Remediation requires server-side ownership verification.',
    relatedTerms: ['Broken Access Control', 'OWASP Top 10', 'Authorization', 'Session Token'],
    lessonStageId: 'stage-5-cybersecurity'
  },
  {
    id: 'term-suid',
    term: 'SUID (Set User ID)',
    category: 'Operating Systems & Linux',
    definition: 'A special Linux permission bit that causes an executable file to run with the privileges of the file owner (often root) rather than the privileges of the user who launched it.',
    deepExplanation: 'Represented as an "s" in the owner execute position (-rwsr-xr-x) and octal 4000. Examples include /usr/bin/passwd, which allows standard users to update their password inside root-only /etc/shadow. SUID binaries must be strictly audited because buffer overflows or command injection within them allow immediate root privilege escalation.',
    relatedTerms: ['SGID', 'chmod', 'Privilege Escalation', 'Capabilities'],
    lessonStageId: 'stage-7-advanced'
  },
  {
    id: 'term-kerberos',
    term: 'Kerberos',
    category: 'Cybersecurity',
    definition: 'A computer-network authentication protocol that uses secret-key cryptography and trusted tickets to prove identity over insecure networks without sending passwords.',
    deepExplanation: 'The backbone of Microsoft Active Directory. Clients authenticate to the Key Distribution Center (KDC) to receive a Ticket Granting Ticket (TGT). When accessing resources, the client exchanges the TGT for a Service Ticket (ST) encrypted for the target service.',
    relatedTerms: ['Active Directory', 'TGT', 'Domain Controller', 'LDAP'],
    lessonStageId: 'stage-7-advanced'
  }
];
