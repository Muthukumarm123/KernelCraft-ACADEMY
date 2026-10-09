import { CourseStage } from '../types';

export const COURSE_STAGES: CourseStage[] = [
  {
    id: 'stage-1-hardware',
    number: 1,
    title: 'Computer Hardware & Architecture',
    shortTitle: 'Hardware',
    description: 'Understand physical computation from first principles: silicon, logic gates, the CPU instruction cycle, memory hierarchies, storage, buses, binary data representation, and the hardware boot process.',
    difficulty: 'Beginner',
    estimatedTime: '3–4 weeks (15–20 hours)',
    lessonCount: 4,
    iconName: 'Cpu',
    lessons: [
      {
        id: 'hw-what-is-a-computer',
        stageId: 'stage-1-hardware',
        title: 'What Is a Computer? Information, Hardware & The Von Neumann Model',
        summary: 'Explore what computation truly is at the physical level: how electrical voltage represents information, the distinction between hardware and software, and the four fundamental stages of computing.',
        difficulty: 'Beginner',
        estimatedMinutes: 35,
        prerequisites: ['No prior knowledge required. Absolute beginner level.'],
        objectives: [
          'Define computation as the transformation of input into output via stored instructions.',
          'Differentiate between physical hardware (the machine) and software (the encoded instructions).',
          'Understand the four fundamental pillars: Input, Processing, Storage, and Output (IPSO).',
          'Explain why modern computers rely on the Von Neumann architecture with shared memory for data and instructions.'
        ],
        sections: [
          {
            id: 'hw-1-foundations',
            title: '1. What a Computer Actually Is',
            content: `At its purest level, a computer is not a magic thinking machine: it is an **electronic state machine** that manipulates physical voltages according to predefined mathematical rules.

Computers operate on **information**. In physics, information is the resolution of uncertainty. In electronics, we encode information by measuring electrical potential:
* A voltage near 0 Volts represents logical **0** (False / Off).
* A voltage near +1.2V to +5.0V represents logical **1** (True / On).

A computer exists because humans needed a reliable, high-speed device that could perform billions of deterministic mathematical calculations every second without fatigue or human error.`,
            analogy: 'Imagine an intricate clockwork automaton: the gears, springs, and levers are the hardware. The punched paper roll that guides which tune the automaton plays is the software. Neither is useful without the other.',
            quickCheck: {
              id: 'qc-hw-1',
              type: 'multiple-choice',
              question: 'Why do modern digital computers use binary (0 and 1) instead of base-10 decimal numbers?',
              options: [
                { id: 'a', text: 'Binary was mandated by international copyright laws in the 1960s' },
                { id: 'b', text: 'Transistors naturally act as electronic switches with two reliable physical states (on/off)' },
                { id: 'c', text: 'Decimal numbers cannot represent text or sound' },
                { id: 'd', text: 'Computers cannot calculate fractions in decimal' }
              ],
              correctAnswer: 'b',
              explanation: 'Physical transistors operate like microscopic switches: current flows (1) or current does not flow (0). Attempting to distinguish 10 subtle voltage levels in miniature silicon leads to severe thermal noise and calculation errors.'
            }
          },
          {
            id: 'hw-1-ipso',
            title: '2. The Four Pillars: Input, Processing, Storage, and Output (IPSO)',
            content: `Every computing system—from an 8-bit microcontroller inside a microwave to a 128-core cloud supercomputer—executes a cyclical pipeline known as **IPSO**:

1. **Input**: Transducing signals from the outside world into electronic binary numbers (e.g., keyboard keystrokes, network packets, temperature sensors).
2. **Processing**: Transforming those numbers according to logical rules (performed by the Central Processing Unit and Arithmetic Logic Unit).
3. **Storage**: Retaining data both temporarily while active (volatile RAM) and permanently across power loss (non-volatile SSD/HDD).
4. **Output**: Transducing internal binary representations back into usable human or physical forms (e.g., pixels on a monitor, speakers, robotic servos, network transmissions).`,
            commonMistakes: [
              {
                mistake: 'Confusing storage (SSD/hard drive) with working memory (RAM).',
                whyItHappens: 'Both are measured in Gigabytes (e.g., "16 GB RAM" vs "512 GB SSD").',
                correction: 'RAM is fast, volatile temporary scratchpad memory that vanishes when power is lost. Storage is persistent, non-volatile long-term retention.'
              }
            ]
          },
          {
            id: 'hw-1-von-neumann',
            title: '3. The Von Neumann Architecture',
            content: `In 1945, mathematician John von Neumann proposed the architecture that virtually every modern PC, smartphone, and server uses today.

Prior to Von Neumann, early computers like the ENIAC had to be physically rewired with patch cords whenever someone wanted to change the calculation!

Von Neumann introduced the **Stored-Program Concept**:
* Both **Data** (the numbers you want to add) and **Instructions** (the commands like ADD, STORE, JUMP) are stored in the *same unified memory system* as binary numbers.
* The CPU reads an instruction from memory, interprets it, executes it, and moves to the next memory address.

This single breakthrough made general-purpose computing possible: software could simply be loaded into memory from a disk without changing a single wire!`,
            deepDive: {
              title: 'The "Von Neumann Bottleneck"',
              content: 'Because both instructions and data must travel across the same shared memory bus between the CPU and RAM, the CPU frequently sits idle waiting for memory transfers. This speed gap between lightning-fast CPU clock speeds (3-5 GHz) and slower RAM transfer latency is the famous Von Neumann Bottleneck. CPU designers combat this with multi-tiered on-chip SRAM caches (L1, L2, L3).'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-hw-1-1',
            type: 'multiple-choice',
            question: 'What revolutionary concept did the Von Neumann architecture introduce to computing?',
            options: [
              { id: 'a', text: 'Using quantum entanglement instead of copper wires' },
              { id: 'b', text: 'Storing both executable program instructions and data in the same unified memory space' },
              { id: 'c', text: 'Eliminating the need for cooling fans in electronic computers' },
              { id: 'd', text: 'Allowing computers to run without electricity' }
            ],
            correctAnswer: 'b',
            explanation: 'The stored-program concept stores software instructions as binary numbers alongside data in memory, allowing a computer to run any program without physically rewiring the circuitry.'
          },
          {
            id: 'iq-hw-1-2',
            type: 'find-mistake',
            question: 'A learner says: "When I turn off my computer, all the programs running in my 16GB RAM remain permanently saved on the RAM chips."',
            options: [
              { id: 'a', text: 'The statement is completely accurate.' },
              { id: 'b', text: 'RAM is volatile memory; its contents disappear immediately when electrical power is cut.' },
              { id: 'c', text: 'RAM saves files only if connected to the internet.' },
              { id: 'd', text: 'RAM transfers files to the monitor before powering down.' }
            ],
            correctAnswer: 'b',
            explanation: 'Dynamic RAM requires continuous electrical charge to maintain capacitor state. When power is shut down, all active RAM contents decay instantly.'
          }
        ],
        exercises: [
          {
            id: 'ex-hw-1',
            title: 'Analyze System Specifications',
            instruction: 'Observe a standard modern computer specification: "Intel Core i7-14700K, 32GB DDR5 RAM, 1TB NVMe PCIe 4.0 SSD, NVIDIA RTX 4070". Identify which component handles persistent long-term storage and which component handles volatile working memory.',
            explanation: 'The 1TB NVMe SSD is persistent non-volatile storage. The 32GB DDR5 is volatile working RAM. The Core i7 is the central processor, and the RTX 4070 is the parallel graphics processor.'
          }
        ],
        checkpoint: {
          prompt: 'Checkpoint: Demonstrate understanding of the distinction between hardware and software before proceeding to CPU internals.',
          question: {
            id: 'cp-hw-1',
            type: 'multiple-choice',
            question: 'Which of the following is an example of software?',
            options: [
              { id: 'a', text: 'The printed circuit board of the motherboard' },
              { id: 'b', text: 'The compiled Linux kernel binary file stored on disk' },
              { id: 'c', text: 'The silicon transistors inside the CPU' },
              { id: 'd', text: 'The PCIe slot connectors' }
            ],
            correctAnswer: 'b',
            explanation: 'The Linux kernel is software: an encoded sequence of binary instructions executed by physical hardware.'
          }
        },
        endOfLessonQuiz: [
          {
            id: 'quiz-hw-1-1',
            type: 'multiple-choice',
            question: 'What are the four fundamental stages of the IPSO cycle?',
            options: [
              { id: 'a', text: 'Internet, Programming, Scripting, Operations' },
              { id: 'b', text: 'Input, Processing, Storage, Output' },
              { id: 'c', text: 'Initialization, Partitioning, Swapping, Optimization' },
              { id: 'd', text: 'Interface, Protocol, Security, Overhead' }
            ],
            correctAnswer: 'b',
            explanation: 'Input, Processing, Storage, and Output define the universal lifecycle of computation.'
          },
          {
            id: 'quiz-hw-1-2',
            type: 'multiple-choice',
            question: 'Why are CPU caches (L1, L2, L3) built directly onto the CPU die?',
            options: [
              { id: 'a', text: 'To mitigate the Von Neumann bottleneck by keeping frequently used data nanoseconds away from CPU execution units' },
              { id: 'b', text: 'To permanently store user documents when power is disconnected' },
              { id: 'c', text: 'To replace the need for an operating system' },
              { id: 'd', text: 'To connect directly to the Wi-Fi antenna' }
            ],
            correctAnswer: 'a',
            explanation: 'On-die SRAM caches eliminate the massive latency penalty of fetching data across the external motherboard memory bus.'
          }
        ]
      },
      {
        id: 'hw-cpu-architecture',
        stageId: 'stage-1-hardware',
        title: 'The CPU: Cores, Registers, ALU & The Fetch-Decode-Execute Cycle',
        summary: 'Look inside the Central Processing Unit: explore the Control Unit, Arithmetic Logic Unit, internal registers (PC, IR, MAR, MDR, ACC), and trace the micro-steps of the Fetch-Decode-Execute instruction cycle.',
        difficulty: 'Beginner',
        estimatedMinutes: 45,
        prerequisites: ['What Is a Computer? Information, Hardware & The Von Neumann Model'],
        objectives: [
          'Identify key CPU functional units: Control Unit (CU), Arithmetic Logic Unit (ALU), and Registers.',
          'Understand the role of core architectural registers: Program Counter (PC), Instruction Register (IR), Memory Address Register (MAR), and Memory Data Register (MDR).',
          'Trace the three micro-stages of the Fetch-Decode-Execute cycle step-by-step.',
          'Differentiate between physical cores, hardware threads (Simultaneous Multithreading), and clock speed.'
        ],
        interactiveTool: 'cpu-simulator',
        sections: [
          {
            id: 'cpu-anatomy',
            title: '1. Internal Anatomy of the CPU',
            content: `The Central Processing Unit (CPU) is often described as the "brain" of the computer, but it is more accurately a **hyper-specialized, relentless arithmetic pipeline**.

A single CPU core consists of three vital subsystems:
1. **Control Unit (CU)**: The conductor. It retrieves instructions from memory, interprets their binary opcodes, and emits electrical timing signals to coordinate all other subsystems.
2. **Arithmetic Logic Unit (ALU)**: The calculator. It performs elementary mathematical operations (addition, subtraction, multiplication) and boolean logic operations (\`AND\`, \`OR\`, \`XOR\`, bit shifts).
3. **Registers**: Extremely small, blazing-fast internal memory cells located directly inside the execution units. Registers can be read and written in a fraction of a single clock cycle (~0.5 nanoseconds).`,
            analogy: 'Think of registers as the small scrap piece of paper in your hand while doing math; RAM is a textbook in a library down the hall; the hard drive is a warehouse across town.'
          },
          {
            id: 'cpu-registers',
            title: '2. Dedicated Registers You Must Know',
            content: `While modern x86-64 CPUs feature general-purpose registers (such as \`%rax\`, \`%rbx\`, \`%rcx\`, \`%rdx\`), classical architecture defines specific special-purpose registers critical for program execution:

* **Program Counter (PC)**: Holds the memory address of the *next* instruction waiting to be fetched.
* **Memory Address Register (MAR)**: Holds the memory address currently being read from or written to over the address bus.
* **Memory Data Register (MDR)**: Holds the actual data or instruction word received from RAM, or waiting to be written to RAM.
* **Instruction Register (IR)**: Holds the binary opcode of the instruction currently being decoded and executed.
* **Accumulator (ACC)**: Holds intermediate results generated by the ALU.`,
            deepDive: {
              title: 'x86 Instruction Pointer (%rip) & Security',
              content: 'In 64-bit x86 systems, the Program Counter is called the Instruction Pointer (`%rip`). In cybersecurity, control-flow hijack attacks (like stack buffer overflows) historically target overwriting `%rip` so the CPU executes attacker-injected instructions rather than legitimate program code.'
            }
          },
          {
            id: 'cpu-fde-cycle',
            title: '3. The Fetch-Decode-Execute (FDE) Cycle',
            content: `Every second, a 4.0 GHz processor executes approximately 4,000,000,000 clock cycles. Every instruction passes through three sequential phases:

### Phase 1: FETCH
1. The CPU copies the address in the **Program Counter (PC)** into the **Memory Address Register (MAR)**.
2. The address travels across the address bus to RAM.
3. The memory controller returns the instruction byte across the data bus into the **Memory Data Register (MDR)**.
4. The instruction is copied from the MDR into the **Instruction Register (IR)**.
5. The CPU increments the **Program Counter (PC)** to point to the next instruction in memory.

### Phase 2: DECODE
1. The **Control Unit (CU)** reads the opcode from the **Instruction Register (IR)**.
2. The CU decodes the bit pattern into internal control lines (determining whether to trigger the ALU, read another operand, or jump).

### Phase 3: EXECUTE
1. The CPU carries out the operation (e.g., ALU computes \`ACC = ACC + 5\`, or copies a value into a register).
2. If the instruction was a branch/jump, the PC is modified to point to the target address.
3. The cycle repeats!`,
            quickCheck: {
              id: 'qc-fde-pc',
              type: 'multiple-choice',
              question: 'What happens to the Program Counter (PC) during the Fetch stage?',
              options: [
                { id: 'a', text: 'It is wiped to 0' },
                { id: 'b', text: 'It is automatically incremented to point to the next instruction address' },
                { id: 'c', text: 'It shuts down the clock' },
                { id: 'd', text: 'It copies data to the hard drive' }
              ],
              correctAnswer: 'b',
              explanation: 'Once the current instruction address is passed to MAR, the PC is incremented so the CPU is immediately prepared to fetch the sequential instruction next.'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-cpu-1',
            type: 'multiple-choice',
            question: 'Which CPU component is physically responsible for performing logical AND, OR, and arithmetic operations?',
            options: [
              { id: 'a', text: 'The Control Unit (CU)' },
              { id: 'b', text: 'The Arithmetic Logic Unit (ALU)' },
              { id: 'c', text: 'The Power Supply Unit (PSU)' },
              { id: 'd', text: 'The PCIe slot' }
            ],
            correctAnswer: 'b',
            explanation: 'The Arithmetic Logic Unit (ALU) contains the circuitry (adders, multiplexers, bit-shifters) that performs all mathematical and boolean computations.'
          },
          {
            id: 'iq-cpu-2',
            type: 'predict-output',
            question: 'If the Program Counter currently holds address 0x0040, what value will it hold after fetching an 8-byte instruction?',
            options: [
              { id: 'a', text: '0x0000' },
              { id: 'b', text: '0x0048' },
              { id: 'c', text: '0x0040' },
              { id: 'd', text: '0xFFFF' }
            ],
            correctAnswer: 'b',
            explanation: 'In byte-addressed memory, advancing past an 8-byte instruction increments the address by 8: 0x0040 + 8 = 0x0048.'
          }
        ],
        exercises: [
          {
            id: 'ex-cpu-sim',
            title: 'Run the Interactive CPU Cycle Simulator',
            instruction: 'Use the interactive simulator below to step through instructions. Observe the Memory Address Register and Program Counter values change at each clock tick.',
            explanation: 'Stepping through the simulation reveals how physical electrical signals transfer data between registers and RAM.'
          }
        ],
        checkpoint: {
          prompt: 'Verify your understanding of registers and memory hierarchy before moving to RAM architecture.',
          question: {
            id: 'cp-cpu-reg',
            type: 'multiple-choice',
            question: 'Rank the following from fastest to slowest access latency:',
            options: [
              { id: 'a', text: 'Registers -> L1 Cache -> RAM -> NVMe SSD' },
              { id: 'b', text: 'NVMe SSD -> RAM -> L1 Cache -> Registers' },
              { id: 'c', text: 'RAM -> Registers -> L1 Cache -> NVMe SSD' },
              { id: 'd', text: 'L1 Cache -> RAM -> Registers -> NVMe SSD' }
            ],
            correctAnswer: 'a',
            explanation: 'CPU registers operate sub-nanosecond (~0.5ns), L1 cache ~1ns, RAM ~60-80ns, and NVMe SSDs ~20-50 microseconds (thousands of times slower).'
          }
        },
        endOfLessonQuiz: [
          {
            id: 'quiz-cpu-1',
            type: 'multiple-choice',
            question: 'What is the purpose of the Memory Address Register (MAR)?',
            options: [
              { id: 'a', text: 'To store audio samples sent to the sound card' },
              { id: 'b', text: 'To hold the physical memory address currently being read from or written to across the address bus' },
              { id: 'c', text: 'To encrypt files before saving them to disk' },
              { id: 'd', text: 'To regulate the voltage from the power supply' }
            ],
            correctAnswer: 'b',
            explanation: 'The MAR holds the target memory address so the address bus can select the appropriate memory cell in RAM.'
          }
        ]
      },
      {
        id: 'hw-binary-data-representation',
        stageId: 'stage-1-hardware',
        title: 'Binary, Hexadecimal & Data Representation',
        summary: 'Master how all digital data—numbers, text, images, executable machine code—is physically encoded as binary patterns of bits and bytes, how to convert between bases, and why hexadecimal is the lingua franca of systems engineering.',
        difficulty: 'Beginner',
        estimatedMinutes: 40,
        prerequisites: ['What Is a Computer? Information, Hardware & The Von Neumann Model'],
        objectives: [
          'Understand bits, nibbles, bytes, and powers of two.',
          'Convert effortlessly between Binary (base-2), Decimal (base-10), and Hexadecimal (base-16).',
          'Understand how character encodings work (ASCII and UTF-8 Unicode).',
          'Explain why computers treat executable code and data identically at the binary level.'
        ],
        interactiveTool: 'binary-sandbox',
        sections: [
          {
            id: 'bin-basics',
            title: '1. Bits, Nibbles, and Bytes',
            content: `In computer science:
* A **Bit** (Binary Digit) is the atomic unit of digital storage: either \`0\` or \`1\`.
* A **Nibble** is 4 bits (values 0 through 15).
* A **Byte** is 8 bits (values 0 through 255 in unsigned decimal: $2^8 = 256$ distinct combinations).

Every memory address in modern RAM points to a single **Byte**. This is called **byte-addressable memory**.`,
            commonMistakes: [
              {
                mistake: 'Confusing bits (lowercase b) with Bytes (uppercase B).',
                whyItHappens: 'Both terms sound identical in speech.',
                correction: '1 Byte = 8 bits. Network speed is usually quoted in Megabits per second (Mbps), while file sizes are quoted in Megabytes (MB). A 100 Mbps connection downloads at approximately 12.5 MB/s!'
              }
            ]
          },
          {
            id: 'bin-hex',
            title: '2. Why Hexadecimal Exists',
            content: `Reading long binary sequences like \`1101101011111110\` causes immediate cognitive fatigue for human engineers.

**Hexadecimal (Base-16)** solves this perfectly:
* Hexadecimal uses 16 symbols: \`0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F\`.
* Because $2^4 = 16$, **exactly one hexadecimal digit represents exactly 4 binary bits (one nibble)**!
* Exactly **two hex digits represent one full byte (8 bits)**!

Examples:
* Binary \`1111 1111\` = Hex \`0xFF\` = Decimal \`255\`
* Binary \`0000 1010\` = Hex \`0x0A\` = Decimal \`10\`
* Binary \`1100 1010\` = Hex \`0xCA\` = Decimal \`202\`

In computer programming, the prefix \`0x\` denotes a hexadecimal number.`,
            deepDive: {
              title: 'Endianness: Big-Endian vs Little-Endian',
              content: 'When storing a multi-byte integer (such as 0x12345678) in memory, which byte comes first? In Big-Endian (used in network protocols), the most significant byte (0x12) is stored at the lowest memory address. In Little-Endian (standard in x86-64 and ARM processors), the least significant byte (0x78) is stored first. Understanding endianness is mandatory for binary reverse engineering and network packet analysis.'
            }
          },
          {
            id: 'bin-text',
            title: '3. Encoding Text: ASCII & Unicode',
            content: `How does a computer know that \`01000001\` is the capital letter **'A'**?

It doesn't—until software applies an **encoding table**:
* **ASCII (American Standard Code for Information Interchange)**: Maps 7 bits (128 values) to English letters, numbers, and control characters.
  * \`'A'\` is decimal 65 (hex \`0x41\`, binary \`01000001\`).
  * \`'a'\` is decimal 97 (hex \`0x61\`, binary \`01100001\`).
  * Notice the difference between uppercase and lowercase is exactly 1 bit (bit 5: value 32)!
* **UTF-8 Unicode**: The modern global standard. Variable-length encoding (1 to 4 bytes per character) supporting every written human language, mathematical symbol, and emoji, while remaining 100% backwards-compatible with ASCII!`,
            quickCheck: {
              id: 'qc-hex-conv',
              type: 'type-answer',
              question: 'Convert the binary byte 1111 0000 into hexadecimal (format: 0x__):',
              correctAnswer: '0xF0',
              explanation: '1111 in binary is 15 in decimal, which is F in hex. 0000 is 0. Thus, 1111 0000 is 0xF0.'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-bin-1',
            type: 'multiple-choice',
            question: 'How many different values can an unsigned 8-bit byte represent?',
            options: [
              { id: 'a', text: '128 values (0 to 127)' },
              { id: 'b', text: '256 values (0 to 255)' },
              { id: 'c', text: '512 values' },
              { id: 'd', text: '1024 values' }
            ],
            correctAnswer: 'b',
            explanation: '2 to the power of 8 equals 256 discrete values, represented as 0 through 255.'
          }
        ],
        exercises: [
          {
            id: 'ex-bin-sandbox',
            title: 'Explore the Interactive Bit Sandbox',
            instruction: 'Toggle individual bits in the bit sandbox below. Watch the simultaneous live updates across Decimal, Hexadecimal, and ASCII character representations.',
            explanation: 'Interactive bit toggling builds intuitive muscle memory for binary powers of two (128, 64, 32, 16, 8, 4, 2, 1).'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-bin-1',
            type: 'multiple-choice',
            question: 'Why does hexadecimal represent exactly 4 bits per character?',
            options: [
              { id: 'a', text: 'Because 2 raised to the 4th power is 16, matching the base-16 radix' },
              { id: 'b', text: 'Because ancient teleprinters had 4 rows of keys' },
              { id: 'c', text: 'Because memory buses only accept 4 wires' },
              { id: 'd', text: 'Because 16 is an odd number' }
            ],
            correctAnswer: 'a',
            explanation: 'Since 2^4 = 16, every hexadecimal digit cleanly maps to exactly one 4-bit nibble with no remainder.'
          }
        ]
      },
      {
        id: 'hw-boot-process',
        stageId: 'stage-1-hardware',
        title: 'The Boot Process: From Power Button to Operating System',
        summary: 'Trace the exact chain of execution when electrical power enters the motherboard: from power rails and UEFI firmware, through POST hardware checks, the bootloader, kernel decompression, initramfs, to user space login.',
        difficulty: 'Intermediate',
        estimatedMinutes: 40,
        prerequisites: ['The CPU: Cores, Registers, ALU & The Fetch-Decode-Execute Cycle'],
        objectives: [
          'Trace the chronological sequence of system bootstrap.',
          'Understand the role of the Power Good (PG) signal and Motherboard VRMs.',
          'Differentiate between legacy BIOS (MBR) and modern UEFI (GPT).',
          'Explain what a bootloader (e.g., GRUB, systemd-boot) does and how it hands over control to the kernel.'
        ],
        sections: [
          {
            id: 'boot-sequence',
            title: '1. Chronological Step-by-Step Boot Sequence',
            content: `What actually happens in the 3 seconds between pushing the power button and seeing the login prompt?

### Step 1: Power Regulation & Power Good Signal
1. Pressing the case button momentarily connects a header on the motherboard, signaling the Power Supply Unit (PSU) to activate its main +12V, +5V, and +3.3V rails.
2. The PSU internal circuitry measures output voltages. Once voltages stabilize, the PSU sends a **Power Good (PG)** signal (+5V wire) to the motherboard chipset.
3. Until the PG signal arrives, the motherboard forcefully holds the CPU's hardware \`RESET\` pin high.

### Step 2: CPU Initialization & Reset Vector
1. Upon receiving the PG signal, the reset pin drops low.
2. The CPU awakens with all registers initialized to default hardware values.
3. The **Instruction Pointer (%rip)** points to a hardcoded physical address known as the **Reset Vector** (in x86, \`0xFFFFFFF0\`).
4. This address points directly to non-volatile flash memory on the motherboard containing the **UEFI/BIOS firmware**.`,
            deepDive: {
              title: 'POST (Power-On Self-Test)',
              content: 'The firmware runs POST to verify crucial hardware: testing CPU registers, initializing memory controllers, verifying RAM integrity, probing PCIe lanes, and discovering attached storage disks. If a critical component (like RAM) fails, the motherboard emits error beep codes or illuminates diagnostic LEDs on the board.'
            }
          },
          {
            id: 'boot-bootloader',
            title: '2. Firmware to Bootloader (GRUB / systemd-boot)',
            content: `Once POST passes:
* In modern systems, **UEFI (Unified Extensible Firmware Interface)** reads the **EFI System Partition (ESP)** formatted with FAT32 on the storage drive (using GUID Partition Table - GPT).
* UEFI locates and executes the bootloader binary, such as \`/EFI/BOOT/BOOTX64.EFI\` or GRUB (\`grubx64.efi\`).
* The **Bootloader**:
  1. Displays the operating system selection menu.
  2. Loads the compiled Linux kernel image (\`vmlinuz\`) from disk into RAM.
  3. Loads the initial RAM filesystem (\`initramfs\`), which contains necessary storage and filesystem drivers.
  4. Passes kernel command-line parameters (e.g., \`root=UUID=... ro quiet\`).
  5. Jumps execution directly to the kernel entry point, relinquishing control forever!`,
            quickCheck: {
              id: 'qc-boot-pg',
              type: 'multiple-choice',
              question: 'Why does the CPU remain frozen in reset until the Power Good signal is received from the PSU?',
              options: [
                { id: 'a', text: 'To allow the cooling fans to reach maximum speed' },
                { id: 'b', text: 'Because fluctuating, unstable voltages during PSU power-up would cause catastrophic transistor state corruption and data loss' },
                { id: 'c', text: 'To wait for an internet connection' },
                { id: 'd', text: 'To check if the monitor is plugged in' }
              ],
              correctAnswer: 'b',
              explanation: 'Silicon logic gates require stable voltage rails. Running code during voltage ramp-up would cause erratic computations and corrupt storage.'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-boot-1',
            type: 'multiple-choice',
            question: 'What is the primary role of the bootloader (such as GRUB) in a Linux system?',
            options: [
              { id: 'a', text: 'To browse the web during startup' },
              { id: 'b', text: 'To load the OS kernel and initramfs into RAM and transfer CPU control to the kernel' },
              { id: 'c', text: 'To format the hard drive on every restart' },
              { id: 'd', text: 'To provide firewall protection' }
            ],
            correctAnswer: 'b',
            explanation: 'The bootloader bridges firmware and the operating system: it loads the kernel image into memory and jumps to its entry point.'
          }
        ],
        exercises: [
          {
            id: 'ex-boot-1',
            title: 'Identify Boot Artifacts in Linux',
            instruction: 'In a Linux terminal, inspect the boot configuration directory `/boot` and inspect `/boot/grub/grub.cfg` or `/boot/vmlinuz-*`.',
            explanation: 'The /boot directory contains the static kernel binaries, initial ramdisks, and bootloader configurations.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-boot-1',
            type: 'multiple-choice',
            question: 'What is the first user-space process (PID 1) launched by the Linux kernel after initializing drivers?',
            options: [
              { id: 'a', text: 'systemd (or init)' },
              { id: 'b', text: 'bash' },
              { id: 'c', text: 'nginx' },
              { id: 'd', text: 'sudo' }
            ],
            correctAnswer: 'a',
            explanation: 'The kernel spawns `init` (commonly systemd) as Process ID 1, which then orchestrates all user-space daemons, background services, and login prompts.'
          }
        ]
      }
    ]
  },
  {
    id: 'stage-2-linux',
    number: 2,
    title: 'Operating Systems & Linux Mastery',
    shortTitle: 'Linux & OS',
    description: 'Master operating systems from the metal up: kernel vs user space, system calls, the Linux terminal, directory hierarchy, users & groups, UIDs/GIDs, permissions math, process management, daemons, and shell pipelines.',
    difficulty: 'Beginner',
    estimatedTime: '5–6 weeks (25–35 hours)',
    lessonCount: 6,
    iconName: 'Terminal',
    lessons: [
      {
        id: 'os-kernel-and-architecture',
        stageId: 'stage-2-linux',
        title: 'Operating Systems: Kernel, User Space & System Calls',
        summary: 'Understand why operating systems exist: hardware abstraction, CPU protection rings (Ring 0 vs Ring 3), how user programs request hardware services via system calls, and how the kernel manages memory and processes.',
        difficulty: 'Beginner',
        estimatedMinutes: 40,
        prerequisites: ['The CPU: Cores, Registers, ALU & The Fetch-Decode-Execute Cycle'],
        objectives: [
          'Explain why modern computers cannot run arbitrary user programs directly on bare metal.',
          'Differentiate between Kernel Space (Ring 0) and User Space (Ring 3).',
          'Trace a System Call (syscall) from application code to kernel handler.',
          'Understand hardware abstraction for disk, network, and memory management.'
        ],
        sections: [
          {
            id: 'os-why-exist',
            title: '1. Why Does an Operating System Exist?',
            content: `If you write a program in C or Python that wants to save text to a file, how does that text physically reach the SSD?

Without an operating system, your program would need to:
* Know the exact proprietary electrical protocol of your NVMe SSD controller.
* Manage raw flash memory blocks, wear leveling, and bad sector maps.
* Prevent other running programs from overwriting your sectors!

An **Operating System (OS)** solves this by acting as:
1. **A Hardware Abstraction Layer (HAL)**: It provides clean, universal APIs (like \`open()\`, \`read()\`, \`write()\`) so your software works identically across Intel, AMD, Samsung, or Western Digital hardware.
2. **A Resource Arbitrator & Protection Boundary**: It schedules CPU time across hundreds of processes and prevents programs from tampering with each other's private memory.`,
            analogy: 'The operating system is the air traffic control tower of the computer. Individual planes (user applications) cannot decide when to land or change runways on their own without risking catastrophic collision.'
          },
          {
            id: 'os-rings',
            title: '2. Protection Rings & The System Call Boundary',
            content: `Modern x86 and ARM processors enforce hardware privilege levels known as **CPU Rings**:

* **Ring 0 (Kernel Mode / Supervisor)**: The most privileged level. Code executing in Ring 0 has unrestricted access to all CPU instructions, hardware I/O ports, and physical memory. This is where the **Operating System Kernel** runs.
* **Ring 3 (User Mode)**: The restricted level. Normal applications (web browsers, text editors, games, Python scripts) execute in Ring 3. User programs *cannot* access hardware devices directly or read kernel memory.

### How Does a User Program Access Hardware? The System Call!
When an application in User Space needs to write to a file or send a network packet:
1. The application puts the requested system call number (e.g., \`sys_write\`) and arguments into CPU registers.
2. The application executes a special CPU instruction: **\`syscall\`** (or an interrupt).
3. The CPU hardware switches execution mode from **Ring 3 to Ring 0**.
4. The CPU jumps to the kernel's **System Call Handler Table**.
5. The kernel validates the parameters, checks user permissions, executes the hardware write, and switches back to Ring 3!`,
            deepDive: {
              title: 'Spectre & Meltdown Vulnerabilities',
              content: 'In 2018, security researchers discovered Meltdown and Spectre. These CPU microarchitectural flaws abused out-of-order execution and speculative branch prediction to leak secrets across the Ring 0 / Ring 3 security boundary through CPU cache timing side-channels.'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-os-ring',
            type: 'multiple-choice',
            question: 'What happens if a user application running in Ring 3 tries to execute a privileged instruction to manipulate CPU control registers directly?',
            options: [
              { id: 'a', text: 'The CPU ignores it and continues' },
              { id: 'b', text: 'The CPU triggers a hardware General Protection Fault (trap), causing the kernel to terminate the offending process (Segmentation Fault)' },
              { id: 'c', text: 'The instruction succeeds normally' },
              { id: 'd', text: 'The computer catches fire' }
            ],
            correctAnswer: 'b',
            explanation: 'Hardware privilege enforcement prevents user-space code from issuing privileged instructions; any attempt triggers a trap, and the OS terminates the program.'
          }
        ],
        exercises: [
          {
            id: 'ex-os-syscall',
            title: 'Inspect System Calls with strace',
            instruction: 'In a Linux environment, running `strace ls` traces every single system call invoked by `ls` (such as `execve`, `brk`, `openat`, `getdents64`, `write`).',
            explanation: 'Strace intercepts and logs the system calls made by a process and the signals received.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-os-1',
            type: 'multiple-choice',
            question: 'Which CPU privilege ring does the Linux kernel execute in?',
            options: [
              { id: 'a', text: 'Ring 3' },
              { id: 'b', text: 'Ring 0' },
              { id: 'c', text: 'Ring 7' },
              { id: 'd', text: 'Ring 12' }
            ],
            correctAnswer: 'b',
            explanation: 'The kernel executes in Ring 0 (Supervisor / Kernel Mode) with unrestricted hardware access.'
          }
        ]
      },
      {
        id: 'linux-terminal-and-filesystem',
        stageId: 'stage-2-linux',
        title: 'Linux Terminal, Filesystem Hierarchy & Essential Navigation',
        summary: 'Learn Linux command-line fundamentals from scratch: understand the root directory (/), relative vs absolute paths, and master essential file exploration commands with syntax breakdowns.',
        difficulty: 'Beginner',
        estimatedMinutes: 45,
        prerequisites: ['Operating Systems: Kernel, User Space & System Calls'],
        objectives: [
          'Understand the inverted tree structure of the Linux Unified Filesystem starting at root (/).',
          'Differentiate between absolute paths (/var/log) and relative paths (../log).',
          'Master navigation and inspection commands: pwd, ls, cd, cat, touch, mkdir, cp, mv, rm.',
          'Understand that commands operate directly on target paths without needing to cd first.'
        ],
        interactiveTool: 'terminal',
        sections: [
          {
            id: 'linux-fhs',
            title: '1. The Linux Filesystem Hierarchy Standard (FHS)',
            content: `Unlike Windows, which assigns separate drive letters like \`C:\\\` and \`D:\\\`, Linux organizes everything into a **single unified inverted tree** rooted at **\`/\`** (spoken as "root").

Every storage device, network share, and even hardware device is mounted as a directory branch under \`/\`:

* **\`/\`**: The root of the entire filesystem.
* **\`/home\`**: User personal directories (e.g., \`/home/student\`).
* **\`/etc\`**: System-wide configuration files (e.g., \`/etc/passwd\`, \`/etc/network\`).
* **\`/var\`**: Variable data that changes continuously (e.g., \`/var/log\`, mail spools, caches).
* **\`/tmp\`**: Temporary files, usually cleared on system reboot.
* **\`/usr\`**: User utilities, applications, and libraries (\`/usr/bin\`, \`/usr/lib\`).
* **\`/bin\` & \`/sbin\`**: Essential binaries; \`/sbin\` contains administrative system binaries.
* **\`/dev\`**: Device nodes representing physical hardware (e.g., \`/dev/sda\` for hard drive, \`/dev/urandom\` for entropy).
* **\`/proc\` & \`/sys\`**: Virtual pseudo-filesystems exposing live kernel state and hardware metrics directly in memory!`,
            deepDive: {
              title: '/proc is not on disk!',
              content: 'Files in `/proc` (like `/proc/cpuinfo` or `/proc/meminfo`) take up zero bytes of storage on disk. When you run `cat /proc/cpuinfo`, the Linux kernel generates the text on the fly directly from internal kernel memory structures!'
            }
          },
          {
            id: 'linux-navigation',
            title: '2. Relative vs Absolute Paths & Path Shortcuts',
            content: `A path tells the operating system where a file or directory lives:

* **Absolute Path**: Begins with the root slash \`/\`. It specifies the exact, unambiguous location from the top of the filesystem tree regardless of where you currently are.
  * Example: \`/var/log/auth.log\`
* **Relative Path**: Does *not* start with \`/\`. It is evaluated relative to your **Current Working Directory (CWD)**.
  * Example: \`reports/annual.txt\`

### Crucial Path Symbols:
* **\`. \`** (single dot): Refers to the *current* directory.
* **\`.. \`** (double dot): Refers to the *parent* directory (one level up).
* **\`~ \`** (tilde): Shortcut for the current user's home directory (\`/home/username\`).

#### Professional Pattern: Do Not Unnecessarily \`cd\`!
Beginners often waste time typing \`cd /var/log\` just to run \`ls\`. You can execute commands directly against any target path from anywhere:
\`\`\`bash
ls -la /var/log
cat /etc/hosts
\`\`\``,
            codeBlocks: [
              {
                language: 'bash',
                code: 'pwd\nls -la /etc\ncd /var/log && pwd\ncd .. && pwd',
                description: 'Demonstrating current directory, listing arbitrary path, and traversing parent directory.'
              }
            ]
          },
          {
            id: 'linux-core-commands',
            title: '3. Core Terminal Commands Reference',
            content: `Every command in Linux follows the standard syntax:  
\`command [options/flags] [arguments]\`

* **\`pwd\`** (Print Working Directory): Displays your current absolute location.
* **\`ls\`** (List):
  * \`ls\`: lists names in current directory.
  * \`ls -l\`: long format showing permissions, owner, group, size, and modification date.
  * \`ls -la\`: includes hidden files (files beginning with a dot \`.\`).
* **\`cd <path>\`** (Change Directory): Moves your working directory. \`cd\` with no arguments returns to \`~\`.
* **\`mkdir <dir>\`** (Make Directory): Creates a new folder.
* **\`touch <file>\`** (Touch): Updates file timestamp or creates a new empty file if it doesn't exist.
* **\`cat <file>\`** (Concatenate): Outputs the entire text content of a file to stdout.
* **\`cp <src> <dest>\`** (Copy): Copies files. Use \`-r\` for recursive directory copy.
* **\`mv <src> <dest>\`** (Move/Rename): Moves a file or renames it in place.
* **\`rm <file>\`** (Remove): Deletes a file. Use \`-r\` for directories. **Warning: Linux has no Recycle Bin! Deletions are permanent.**`,
            commonMistakes: [
              {
                mistake: 'Typing `rm filename` expecting to recover it from a trash folder.',
                whyItHappens: 'Learners used to GUI operating systems expect an undo buffer.',
                correction: 'The `rm` command unlinks the inode from the directory tree immediately. Treat `rm` with extreme care, especially `rm -rf`.'
              }
            ]
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-path-1',
            type: 'multiple-choice',
            question: 'If your current working directory is /home/student/projects, what path does ../../etc/passwd resolve to?',
            options: [
              { id: 'a', text: '/home/etc/passwd' },
              { id: 'b', text: '/etc/passwd' },
              { id: 'c', text: '/home/student/etc/passwd' },
              { id: 'd', text: 'An invalid path error' }
            ],
            correctAnswer: 'b',
            explanation: 'The first `..` steps up to `/home/student`, the second `..` steps up to `/home`, then `/` (root), leading to `/etc/passwd`.'
          },
          {
            id: 'iq-cmd-hidden',
            type: 'command-builder',
            question: 'What command displays all files in /tmp including hidden files in long detailed listing format?',
            options: [
              { id: 'a', text: 'ls /tmp' },
              { id: 'b', text: 'ls -la /tmp' },
              { id: 'c', text: 'show all /tmp' },
              { id: 'd', text: 'cat -hidden /tmp' }
            ],
            correctAnswer: 'b',
            explanation: '`ls -la /tmp` passes `-l` (long listing) and `-a` (all files including hidden) directly to the target `/tmp` argument.'
          }
        ],
        exercises: [
          {
            id: 'ex-term-nav',
            title: 'Explore the Virtual Filesystem in Terminal',
            instruction: 'Open the integrated Terminal tab below. Run `pwd`, then `ls -la`, create a directory `mkdir labs`, create a file `touch labs/test.txt`, and verify with `ls -la labs`.',
            suggestedCommand: 'mkdir labs && touch labs/test.txt && ls -la labs',
            explanation: 'Demonstrates path manipulation and verification in a safe sandbox.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-fhs-1',
            type: 'multiple-choice',
            question: 'Which directory standardly houses system-wide configuration files in Linux?',
            options: [
              { id: 'a', text: '/home' },
              { id: 'b', text: '/etc' },
              { id: 'c', text: '/dev' },
              { id: 'd', text: '/bin' }
            ],
            correctAnswer: 'b',
            explanation: '/etc holds system configuration files like passwd, shadow, fstab, and network configs.'
          }
        ]
      },
      {
        id: 'linux-users-and-groups',
        stageId: 'stage-2-linux',
        title: 'Users, Groups & Identity: UIDs, GIDs & /etc/passwd',
        summary: 'Understand Linux multi-user security: User IDs (UIDs), Group IDs (GIDs), primary vs supplementary groups, parsing `id` and `whoami`, and how enterprise organizations map real-world roles.',
        difficulty: 'Beginner',
        estimatedMinutes: 40,
        prerequisites: ['Linux Terminal, Filesystem Hierarchy & Essential Navigation'],
        objectives: [
          'Explain why Linux is fundamentally built as a multi-user, multi-tenant operating system.',
          'Define User ID (UID), Group ID (GID), and the special role of root (UID 0).',
          'Deconstruct every field in the output of the `id` command.',
          'Understand primary groups vs supplementary (secondary) groups with real-world analogies.'
        ],
        sections: [
          {
            id: 'users-why',
            title: '1. Why Multi-User Architecture Exists',
            content: `Linux was born from Unix, designed from day one to allow hundreds of people to log in simultaneously over telephone lines or network terminals while keeping their private data isolated.

To the Linux kernel, **usernames do not exist**. The kernel does not care about names like "alice" or "john"; the kernel tracks subjects strictly by numerical **User IDs (UIDs)** and **Group IDs (GIDs)**:

* **UID 0**: The superuser **\`root\`**. Root has universal administrative bypass authority; permissions checks in the kernel are bypassed for UID 0.
* **UIDs 1 to 999**: System / daemon service accounts (e.g., \`www-data\`, \`sshd\`, \`syslog\`, \`nobody\`). These accounts run background services with minimal privileges so that compromising one service does not give an attacker full system control!
* **UIDs 1000+**: Standard interactive human user accounts.`,
            analogy: 'Think of a university campus: your name is on your student ID card, but the library database and door scanners only look at your numeric Student ID number (UID).'
          },
          {
            id: 'users-id-cmd',
            title: '2. Deconstructing the `id` Command',
            content: `When you run **\`id\`** in a terminal:
\`\`\`text
uid=1000(student) gid=1000(student) groups=1000(student),4(adm),24(cdrom),27(sudo),110(lxd)
\`\`\`

Let's dissect every single token:
1. **\`uid=1000(student)\`**:
   * \`1000\` is the numerical User ID.
   * \`student\` is the friendly human username looked up from \`/etc/passwd\`.
2. **\`gid=1000(student)\`**:
   * This is your **Primary Group**. When this user creates any new file, this group will be assigned to that file by default.
3. **\`groups=...\`**:
   * This is the list of **Supplementary (Secondary) Groups** this user belongs to.
   * If a user is in group \`27(sudo)\`, system security rules permit them to run commands with administrative privileges using \`sudo\`.

**CRITICAL RULE**: The number \`1000\` or \`27\` in a group listing is an **Identifier**, NOT the number of users in that group!`,
            quickCheck: {
              id: 'qc-uid-meaning',
              type: 'multiple-choice',
              question: 'In the output `gid=1000(developer)`, what does the number 1000 represent?',
              options: [
                { id: 'a', text: 'There are 1,000 members in the developer group' },
                { id: 'b', text: 'The unique numerical Group Identifier (GID) assigned by the system' },
                { id: 'c', text: 'The group can only store 1,000 files' },
                { id: 'd', text: 'The port number used by the group' }
              ],
              correctAnswer: 'b',
              explanation: 'GID is a unique numeric identifier used by the kernel to check access control.'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-uid-zero',
            type: 'multiple-choice',
            question: 'What User ID (UID) uniquely represents the root superuser in all Linux systems?',
            options: [
              { id: 'a', text: 'UID 1000' },
              { id: 'b', text: 'UID 1' },
              { id: 'c', text: 'UID 0' },
              { id: 'd', text: 'UID -1' }
            ],
            correctAnswer: 'c',
            explanation: 'UID 0 is hardcoded in the kernel as the root superuser account with full administrative privileges.'
          }
        ],
        exercises: [
          {
            id: 'ex-whoami-id',
            title: 'Inspect User and Group Identity',
            instruction: 'In the terminal, run `whoami`, then `id`, and then inspect `/etc/passwd` using `cat /etc/passwd`.',
            suggestedCommand: 'whoami && id && head -n 5 /etc/passwd',
            explanation: 'Demonstrates identity query commands and user database inspection.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-user-1',
            type: 'multiple-choice',
            question: 'Why do system daemons like web servers typically run under dedicated non-root UIDs (e.g., www-data)?',
            options: [
              { id: 'a', text: 'To save electricity' },
              { id: 'b', text: 'Principle of Least Privilege: if an attacker exploits a web vulnerability, their code execution is contained to that service account and cannot modify system files' },
              { id: 'c', text: 'Because Linux cannot run servers as root' },
              { id: 'd', text: 'To make the website load faster' }
            ],
            correctAnswer: 'b',
            explanation: 'Running services under low-privilege dedicated accounts enforces the Principle of Least Privilege and contains potential compromise.'
          }
        ]
      },
      {
        id: 'linux-permissions-deep-dive',
        stageId: 'stage-2-linux',
        title: 'Linux Permissions Masterclass: Octal Math & Symbolic Modes',
        summary: 'Master Linux file security: deconstruct `-rwxr-xr--` character by character, calculate octal bit sums (4+2+1), compare numeric and symbolic `chmod`, and understand the crucial distinction of execute (x) on files vs directories.',
        difficulty: 'Intermediate',
        estimatedMinutes: 50,
        prerequisites: ['Users, Groups & Identity: UIDs, GIDs & /etc/passwd'],
        objectives: [
          'Deconstruct a 10-character Linux permission string character by character.',
          'Calculate octal permissions flawlessly using binary weight values: r=4, w=2, x=1.',
          'Execute chmod with numeric modes (755, 644, 700) and symbolic modes (u+x, g-w, o-r).',
          'Explain why execute (x) on a directory means traversal/entry rather than running code.'
        ],
        interactiveTool: 'permissions-calculator',
        sections: [
          {
            id: 'perm-string',
            title: '1. Character-by-Character Anatomy of `-rwxr-xr--`',
            content: `When you run \`ls -l\`, the very first column displays 10 characters:

\`\`\`text
- r w x  r - x  r - -
▲ ─────  ─────  ─────
│   │      │      └── OTHERS (Everyone else on the system)
│   │      └───────── GROUP (Members of the file's assigned group)
│   └──────────────── OWNER (The user account that owns the file)
└──────────────────── FILE TYPE (- for regular file, d for directory, l for symlink)
\`\`\`

### The Three Permission Spheres:
1. **User / Owner (\`u\`)**: The specific account that owns the file.
2. **Group (\`g\`)**: Any user belonging to the group assigned to the file.
3. **Others (\`o\`)**: Any account on the system that is *neither* the owner nor in the group.

### The Three Basic Rights:
* **\`r\` (Read)**: Permission to read file contents, or list filenames in a directory.
* **\`w\` (Write)**: Permission to modify/overwrite file contents, or add/delete files in a directory.
* **\`x\` (Execute)**: Permission to run the file as a program/script, or enter (\`cd\`) a directory.`,
            commonMistakes: [
              {
                mistake: 'Assuming `w` on a file allows you to delete it.',
                whyItHappens: 'Learners assume file deletion is a file property.',
                correction: 'Deleting a file modifies the *directory* containing the filename entry. To delete a file, you need write (`w`) permission on the *parent directory*, not the file itself!'
              }
            ]
          },
          {
            id: 'perm-octal-math',
            title: '2. Octal Mathematical Calculations (4, 2, 1)',
            content: `Computers represent permissions internally as 3 binary bits per sphere:
* **Read (\`r\`)** = Bit 2 = $2^2 = \\mathbf{4}$
* **Write (\`w\`)** = Bit 1 = $2^1 = \\mathbf{2}$
* **Execute (\`x\`)** = Bit 0 = $2^0 = \\mathbf{1}$
* **None (\`-\`)** = 0

Adding these weights produces an octal digit from 0 to 7:
* **\`7\` = \`rwx\`** ($4 + 2 + 1$): Full control.
* **\`6\` = \`rw-\`** ($4 + 2$): Read and Write (standard data file).
* **\`5\` = \`r-x\`** ($4 + 1$): Read and Execute (standard executable or searchable directory).
* **\`4\` = \`r--\`** ($4$): Read-only.
* **\`3\` = \`-wx\`** ($2 + 1$): Write and Execute (rare).
* **\`2\` = \`-w-\`** ($2$): Write-only.
* **\`1\` = \`--x\`** ($1$): Execute-only.
* **\`0\` = \`---\`** ($0$): No access allowed.

### Standard Production Permission Sets:
* **\`chmod 755 script.sh\`** $\\rightarrow$ \`-rwxr-xr-x\`: Owner can do everything; group and others can read and execute.
* **\`chmod 644 document.txt\`** $\\rightarrow$ \`-rw-r--r--\`: Owner can read and edit; everyone else can only read.
* **\`chmod 700 secret_key\`** $\\rightarrow$ \`-rwx------\` (or \`600\` for \`-rw-------\`): Strict private isolation; no group or others access.`,
            quickCheck: {
              id: 'qc-octal-calc',
              type: 'type-answer',
              question: 'What 3-digit octal number corresponds to permissions -rw-r----- ?',
              correctAnswer: '640',
              explanation: 'Owner: rw- = 4+2 = 6. Group: r-- = 4. Others: --- = 0. Result: 640.'
            }
          },
          {
            id: 'perm-file-vs-dir',
            title: '3. Crucial Difference: Execute on Files vs Directories',
            content: `This is one of the most tested concepts in Linux administration:

| Right | On a Regular File | On a Directory |
|---|---|---|
| **Read (\`r\`)** | Read the file's contents into memory | View the list of file names inside via \`ls\` |
| **Write (\`w\`)** | Modify or truncate the file contents | Create, rename, or delete files inside the directory |
| **Execute (\`x\`)** | Run the file as binary or shell script | **Traverse or enter** the directory via \`cd\`, or access known files inside |

#### What happens if a directory has \`r\` but NOT \`x\`?
You can run \`ls\` and see the file names, but you *cannot* \`cd\` into it, nor can you read the metadata or contents of the files inside!

#### What happens if a directory has \`x\` but NOT \`r\`?
You cannot list the files with \`ls\` (it will say "Permission denied"), but if you already know the exact filename (\`secret.txt\`), you *can* \`cd\` inside or read \`cat /dir/secret.txt\`!`,
            codeBlocks: [
              {
                language: 'bash',
                code: 'chmod 755 /var/www/html\nchmod 600 ~/.ssh/id_rsa\nchmod u+x,g-w build.sh',
                description: 'Examples of numeric and symbolic permission modifications.'
              }
            ]
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-perm-755',
            type: 'multiple-choice',
            question: 'What permissions does chmod 755 assign to a file?',
            options: [
              { id: 'a', text: 'Owner: rwx, Group: r-x, Others: r-x' },
              { id: 'b', text: 'Owner: rw-, Group: rw-, Others: r--' },
              { id: 'c', text: 'Owner: rwx, Group: ---, Others: ---' },
              { id: 'd', text: 'Everyone gets full control' }
            ],
            correctAnswer: 'a',
            explanation: '7 = 4+2+1 (rwx), 5 = 4+1 (r-x), 5 = 4+1 (r-x).'
          },
          {
            id: 'iq-perm-dir-x',
            type: 'multiple-choice',
            question: 'Why does a directory need execute (x) permission?',
            options: [
              { id: 'a', text: 'To allow running binary code stored in the folder name' },
              { id: 'b', text: 'To permit users to enter (cd) into the directory and traverse to files within' },
              { id: 'c', text: 'To make the directory visible on the network' },
              { id: 'd', text: 'To encrypt the directory' }
            ],
            correctAnswer: 'b',
            explanation: 'On a directory, execute permission is the traversal bit allowing processes to enter the directory and access known inodes.'
          }
        ],
        exercises: [
          {
            id: 'ex-perm-calc-tool',
            title: 'Use the Permissions Calculator',
            instruction: 'Use the interactive Permissions Calculator below. Toggle read, write, and execute bits for Owner, Group, and Others. Observe the real-time changes to the symbolic string and octal value.',
            explanation: 'Interactive bit toggling solidifies octal math calculations.'
          }
        ],
        checkpoint: {
          prompt: 'Demonstrate octal math mastery before moving to ownership management.',
          question: {
            id: 'cp-perm-math',
            type: 'type-answer',
            question: 'If you want Owner to have read+write, Group to have read-only, and Others to have no permissions, what 3-digit octal chmod command do you run (format: chmod ___ file)?',
            correctAnswer: 'chmod 640',
            explanation: 'Owner: 4+2 = 6. Group: 4. Others: 0. Command: chmod 640.'
          }
        },
        endOfLessonQuiz: [
          {
            id: 'quiz-perm-1',
            type: 'multiple-choice',
            question: 'What permission string corresponds to octal 600?',
            options: [
              { id: 'a', text: '-rw-------' },
              { id: 'b', text: '-rwx------' },
              { id: 'c', text: '-rw-rw-rw-' },
              { id: 'd', text: 'drwxr-xr-x' }
            ],
            correctAnswer: 'a',
            explanation: '6 = 4+2 (rw-), 0 = ---, 0 = ---. Result: -rw-------.'
          }
        ]
      },
      {
        id: 'linux-stat-and-chown',
        stageId: 'stage-2-linux',
        title: 'File Metadata, `stat`, Ownership & `chown`/`chgrp`',
        summary: 'Inspect deep filesystem metadata using `stat`: inodes, timestamps (atime, mtime, ctime), and master ownership assignment using `chown` and `chgrp`.',
        difficulty: 'Intermediate',
        estimatedMinutes: 40,
        prerequisites: ['Linux Permissions Masterclass: Octal Math & Symbolic Modes'],
        objectives: [
          'Interpret all fields of the `stat` command: Inode, Links, Size, Access/Modify/Change times.',
          'Understand the three Linux timestamps: Access (atime), Modify (mtime), and Change (ctime).',
          'Change user and group ownership with `chown user:group filename`.',
          'Explain why standard non-root users cannot give away files to other users using chown.'
        ],
        sections: [
          {
            id: 'stat-deep-dive',
            title: '1. Deep Inspection with the `stat` Command',
            content: `While \`ls -l\` provides a 1-line overview, **\`stat <filename>\`** exposes the complete underlying filesystem **Inode** metadata:

\`\`\`text
  File: /home/student/audit.log
  Size: 4096            Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d      Inode: 1048577     Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/ student)   Gid: ( 1000/ student)
Access: 2026-10-09 14:20:10.123456789 +0000
Modify: 2026-10-09 14:18:02.987654321 +0000
Change: 2026-10-09 14:18:02.987654321 +0000
 Birth: 2026-10-09 14:15:00.000000000 +0000
\`\`\`

### The Critical Timestamps:
* **Access (atime)**: The exact moment the file's data was last read (e.g., via \`cat\`, \`grep\`, or an application).
* **Modify (mtime)**: The moment the file's *content/data* was last edited or appended to.
* **Change (ctime)**: The moment the file's *metadata* (permissions, ownership, link count) was changed! **Note**: ctime is maintained by the kernel and cannot be forged by user programs, making it crucial in security forensics!`,
            deepDive: {
              title: 'What is an Inode?',
              content: 'An Inode (index node) is a data structure on the storage disk that stores all metadata about a file except for its human-readable name and actual data contents. Directory entries in Linux are simply small tables mapping string filenames to numerical Inode numbers!'
            }
          },
          {
            id: 'chown-mechanics',
            title: '2. Ownership Management: `chown` and `chgrp`',
            content: `To change who owns a file or directory:

\`\`\`bash
# Change owner only
chown alice document.txt

# Change group only
chgrp developers document.txt

# Change both owner and group in a single command
chown alice:developers document.txt

# Recursive ownership change on an entire directory tree
chown -R www-data:www-data /var/www/html
\`\`\`

### Security Restriction: Why Can't Normal Users \`chown\`?
On modern Linux systems, only **\`root\`** can run \`chown\`.  
If normal users could give away file ownership, a user with a full disk quota could transfer huge files to a victim's account to fill up their quota, or create an insecure file and blame someone else!`,
            codeBlocks: [
              {
                language: 'bash',
                code: 'stat /etc/passwd\nsudo chown student:student /opt/app\nls -l /opt/app',
                description: 'Inspecting metadata with stat and changing ownership with chown.'
              }
            ]
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-ctime-meaning',
            type: 'multiple-choice',
            question: 'If you run `chmod 700 report.txt` on a file without editing any text inside, which timestamp is updated?',
            options: [
              { id: 'a', text: 'Only Access (atime)' },
              { id: 'b', text: 'Only Modify (mtime)' },
              { id: 'c', text: 'Change (ctime)' },
              { id: 'd', text: 'No timestamp changes' }
            ],
            correctAnswer: 'c',
            explanation: '`chmod` changes file metadata (permissions), which updates `ctime`. `mtime` updates only when the file content is modified.'
          }
        ],
        exercises: [
          {
            id: 'ex-stat-cmd',
            title: 'Analyze Inode and Timestamps with stat',
            instruction: 'In the terminal, create a file `touch test_stat.txt`, then run `stat test_stat.txt` and inspect the Uid, Gid, and Inode fields.',
            suggestedCommand: 'touch test_stat.txt && stat test_stat.txt',
            explanation: 'Directly displays raw filesystem metadata.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-chown-1',
            type: 'multiple-choice',
            question: 'What is the syntax to change both owner to "bob" and group to "staff" on file.txt in one command?',
            options: [
              { id: 'a', text: 'chown bob:staff file.txt' },
              { id: 'b', text: 'chmod bob.staff file.txt' },
              { id: 'c', text: 'chown bob file.txt --group staff' },
              { id: 'd', text: 'useradd bob:staff file.txt' }
            ],
            correctAnswer: 'a',
            explanation: '`chown owner:group filename` cleanly updates both owner and group in a single syscall.'
          }
        ]
      },
      {
        id: 'linux-pipes-redirection-and-processes',
        stageId: 'stage-2-linux',
        title: 'Shell I/O, Redirection, Pipes & Process Management',
        summary: 'Unlock the Unix Philosophy: connect programs using stdin (0), stdout (1), stderr (2), pipes (|), and redirection (>). Monitor processes with `ps aux`, `top`, signals, and background jobs.',
        difficulty: 'Intermediate',
        estimatedMinutes: 50,
        prerequisites: ['Linux Terminal, Filesystem Hierarchy & Essential Navigation'],
        objectives: [
          'Understand Standard Streams: stdin (0), stdout (1), and stderr (2).',
          'Master redirection operators: >, >>, 2>, and 2>&1.',
          'Chain programs using Unix pipes (|) to build powerful data pipelines.',
          'Monitor processes with ps aux, top, and manage them with signals (SIGTERM 15, SIGKILL 9).'
        ],
        interactiveTool: 'terminal',
        sections: [
          {
            id: 'io-streams',
            title: '1. Standard Streams & File Descriptors',
            content: `In Linux, whenever a process launches, the kernel automatically attaches three standard I/O streams:

* **File Descriptor 0: \`stdin\` (Standard Input)**: The default stream where the program reads input (typically your keyboard).
* **File Descriptor 1: \`stdout\` (Standard Output)**: Where standard program output is sent (typically your terminal screen).
* **File Descriptor 2: \`stderr\` (Standard Error)**: Where error and diagnostic messages are sent separately so errors aren't mingled with data!

### Redirection Operators:
* **\`> file\`**: Overwrite file with stdout.
* **\`>> file\`**: Append stdout to the end of file.
* **\`2> file\`**: Redirect only error messages (stderr) to file.
* **\`2>&1\`**: Combine stderr into stdout.
* **\`< file\`**: Feed file contents into stdin.`,
            codeBlocks: [
              {
                language: 'bash',
                code: '# Overwrite a file\necho "Hello World" > greetings.txt\n\n# Append a line\necho "Second line" >> greetings.txt\n\n# Redirect errors to /dev/null\nfind /etc -name "*.conf" 2>/dev/null',
                description: 'Demonstrating stdout overwrite, append, and discarding stderr errors.'
              }
            ]
          },
          {
            id: 'pipes-philosophy',
            title: '2. The Unix Pipeline (`|`)',
            content: `The Unix philosophy states:  
*"Write programs that do one thing and do it well. Write programs to work together."*

The pipe operator **\`|\`** connects the **\`stdout\`** of the left-hand command directly into the **\`stdin\`** of the right-hand command without writing anything to disk!

Examples:
\`\`\`bash
# Count how many users exist in /etc/passwd
cat /etc/passwd | wc -l

# Find all processes running under the root user
ps aux | grep root

# Sort unique IP addresses from a web log
cat access.log | awk '{print $1}' | sort | uniq -c | sort -nr
\`\`\``,
            deepDive: {
              title: 'What Happens Internally During a Pipe?',
              content: 'When you execute `cmd1 | cmd2`, the shell invokes the `pipe()` system call. The kernel creates an in-memory unidirectional circular buffer in RAM and provides two file descriptors (read and write end). The shell calls `fork()` twice, duplicates the descriptors into stdin/stdout using `dup2()`, and calls `execve()`. Data flows seamlessly through memory at gigabytes per second!'
            }
          },
          {
            id: 'process-mgmt',
            title: '3. Process Management: PIDs, `ps aux` & Signals',
            content: `A **process** is an active, executing instance of a program in memory. Every process has:
* A unique **PID (Process Identifier)**.
* A parent PID (**PPID**). The first user-space process is **PID 1** (usually \`systemd\`).

### Essential Commands:
* **\`ps aux\`**: Displays a complete snapshot of every running process on the system.
  * \`USER\`: Which account owns the process.
  * \`PID\`: Process ID.
  * \`%CPU\` & \`%MEM\`: Resource consumption.
  * \`STAT\`: Process state (\`R\` = Running, \`S\` = Sleeping, \`Z\` = Zombie, \`T\` = Stopped).
  * \`COMMAND\`: The exact command line invoked.
* **\`top\`** / **\`htop\`**: Live real-time process monitor.
* **\`kill -15 <PID>\`**: Sends **\`SIGTERM\`** (polite termination request; allows process to save state and clean up sockets).
* **\`kill -9 <PID>\`**: Sends **\`SIGKILL\`** (unconditional kernel termination; the process is killed instantly with no opportunity to clean up).`,
            quickCheck: {
              id: 'qc-kill-sig',
              type: 'multiple-choice',
              question: 'Why should administrators send SIGTERM (15) before attempting SIGKILL (9)?',
              options: [
                { id: 'a', text: 'SIGKILL consumes more CPU power' },
                { id: 'b', text: 'SIGTERM allows the application to cleanly flush buffers, close open files, and release database locks before exiting' },
                { id: 'c', text: 'SIGKILL requires an internet connection' },
                { id: 'd', text: 'SIGTERM deletes the user account' }
              ],
              correctAnswer: 'b',
              explanation: 'SIGTERM gives the process a chance to catch the signal and terminate gracefully, preventing database and file corruption.'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-pipe-1',
            type: 'multiple-choice',
            question: 'What command will filter all running processes to find lines containing "nginx"?',
            options: [
              { id: 'a', text: 'ps aux | grep nginx' },
              { id: 'b', text: 'find nginx in ps' },
              { id: 'c', text: 'cat ps aux > nginx' },
              { id: 'd', text: 'ls -l nginx' }
            ],
            correctAnswer: 'a',
            explanation: '`ps aux` outputs running processes, and `grep nginx` filters lines containing the pattern.'
          }
        ],
        exercises: [
          {
            id: 'ex-pipe-wc',
            title: 'Build a Pipeline in Terminal',
            instruction: 'In the terminal, run `ps aux | grep root | wc -l` to count how many root processes are currently simulated.',
            suggestedCommand: 'ps aux | grep root | wc -l',
            explanation: 'Chains ps, grep, and wc via Unix pipes.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-pipe-1',
            type: 'multiple-choice',
            question: 'What does the redirection operator `>>` do when writing to a file?',
            options: [
              { id: 'a', text: 'Overwrites and erases previous file content' },
              { id: 'b', text: 'Appends new output to the end of the file without deleting existing content' },
              { id: 'c', text: 'Deletes the file' },
              { id: 'd', text: 'Encrypts the file' }
            ],
            correctAnswer: 'b',
            explanation: '`>>` appends to the file, whereas `>` overwrites.'
          }
        ]
      }
    ]
  },
  {
    id: 'stage-3-programming',
    number: 3,
    title: 'Programming: From Algorithms to Systems C',
    shortTitle: 'Programming',
    description: 'Learn programming from core computational logic: algorithms, data structures, Python for systems automation and security tooling, followed by low-level C memory pointers and buffer mechanics.',
    difficulty: 'Beginner',
    estimatedTime: '4–6 weeks (20–30 hours)',
    lessonCount: 3,
    iconName: 'Code',
    lessons: [
      {
        id: 'prog-computational-thinking',
        stageId: 'stage-3-programming',
        title: 'Core Programming Concepts: Algorithms, Types & Flow Control',
        summary: 'Build computational thinking from first principles: variables in memory, primitive data types, branching conditions, loops, functions, and algorithmic complexity.',
        difficulty: 'Beginner',
        estimatedMinutes: 45,
        prerequisites: ['Binary, Hexadecimal & Data Representation'],
        objectives: [
          'Define an algorithm as a finite sequence of unambiguous instructions.',
          'Understand how variables represent named memory addresses in RAM.',
          'Master control flow: conditional branching (if/else) and iteration (loops).',
          'Understand the role of functions in modular decomposition and memory stacks.'
        ],
        sections: [
          {
            id: 'prog-algos',
            title: '1. What Is an Algorithm?',
            content: `Before writing code in any language, you must formulate an **algorithm**: a step-by-step, finite, deterministic procedure for solving a problem.

Every computer program fundamentally manipulates:
1. **State / Variables**: Storage locations in RAM holding numbers, text, or objects.
2. **Operations**: Arithmetic, comparisons, and transformations.
3. **Control Flow**: Determining which instruction executes next based on conditions.`,
            analogy: 'An algorithm is like an exact culinary recipe. If the recipe says "bake until golden," that is ambiguous. An algorithm says "bake at 180°C for exactly 22 minutes or until internal core temperature reaches 75°C."'
          },
          {
            id: 'prog-data-types',
            title: '2. Primitive Data Types in Memory',
            content: `Computers must know how to interpret bits in memory:
* **Integer**: Whole numbers (typically 4 bytes / 32 bits or 8 bytes / 64 bits).
* **Floating-Point**: Real numbers with decimals (IEEE 754 standard, e.g., 3.14159).
* **Boolean**: Exactly 1 bit of information (True or False), usually padded to 1 byte in memory.
* **Character & String**: Encoded ASCII/Unicode bytes representing text.
* **Array / List**: Contiguous blocks of memory holding elements of the same or varied types in sequential order.`,
            deepDive: {
              title: 'Integer Overflow',
              content: 'What happens if you add 1 to an 8-bit unsigned integer holding 255 (binary 11111111)? The hardware registers roll over to 00000000 (0)! Integer overflow has caused notorious real-world security vulnerabilities and even spacecraft crashes (e.g., the Ariane 5 rocket launch failure in 1996).'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-prog-1',
            type: 'multiple-choice',
            question: 'What is the primary benefit of decomposing code into functions?',
            options: [
              { id: 'a', text: 'It makes the CPU run at double clock speed' },
              { id: 'b', text: 'Reusability, modularity, readability, and scoping variables to avoid global conflicts' },
              { id: 'c', text: 'It eliminates the need for RAM' },
              { id: 'd', text: 'It automatically encrypts the code' }
            ],
            correctAnswer: 'b',
            explanation: 'Functions encapsulate logic, prevent repetition (DRY), and isolate variable scopes.'
          }
        ],
        exercises: [
          {
            id: 'ex-prog-flow',
            title: 'Trace Algorithm Execution',
            instruction: 'Consider an algorithm that starts with counter = 10, and while counter > 0, decrements counter by 2. How many iterations will execute?',
            explanation: 'Values will be 10, 8, 6, 4, 2 -> exactly 5 loop iterations.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-prog-1',
            type: 'multiple-choice',
            question: 'What is an integer overflow?',
            options: [
              { id: 'a', text: 'When an arithmetic operation exceeds the maximum representable numerical value for that bit width and rolls over' },
              { id: 'b', text: 'When a variable has too many decimal places' },
              { id: 'c', text: 'When the monitor cannot display large numbers' },
              { id: 'd', text: 'When the CPU runs out of clock cycles' }
            ],
            correctAnswer: 'a',
            explanation: 'Fixed-width binary representations wrap around when calculations exceed their upper bounds.'
          }
        ]
      },
      {
        id: 'prog-python-automation',
        stageId: 'stage-3-programming',
        title: 'Python for Systems, Automation & Security Scripting',
        summary: 'Master Python as the de-facto language of systems administrators and security analysts: sockets, parsing server logs, interacting with APIs, and writing automated auditing tools.',
        difficulty: 'Beginner',
        estimatedMinutes: 45,
        prerequisites: ['Core Programming Concepts: Algorithms, Types & Flow Control'],
        objectives: [
          'Understand Python data structures: lists, dictionaries, tuples, and sets.',
          'Read, parse, and write files safely with context managers (with open).',
          'Use Python sockets for basic network communication.',
          'Write a clean log analysis and port-probing script.'
        ],
        sections: [
          {
            id: 'py-basics',
            title: '1. Python Strengths in Systems & Security',
            content: `Python is the lingua franca of cybersecurity and DevOps because of its extensive standard library ("batteries included") and clean syntax:

\`\`\`python
# Example: Reading and parsing /etc/passwd in Python
with open('/etc/passwd', 'r') as f:
    for line in f:
        if not line.startswith('#'):
            parts = line.strip().split(':')
            username = parts[0]
            uid = int(parts[2])
            if uid >= 1000:
                print(f"Human User: {username} (UID: {uid})")
\`\`\``,
            codeBlocks: [
              {
                language: 'python',
                code: 'import socket\n\ndef check_port(host, port):\n    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    s.settimeout(1.0)\n    result = s.connect_ex((host, port))\n    s.close()\n    return result == 0\n\nprint("Port 80 open?", check_port("127.0.0.1", 80))',
                description: 'A minimal Python TCP port connectivity test.'
              }
            ]
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-py-dict',
            type: 'multiple-choice',
            question: 'Which Python data structure provides O(1) average lookup time by key?',
            options: [
              { id: 'a', text: 'List' },
              { id: 'b', text: 'Dictionary (dict)' },
              { id: 'c', text: 'Tuple' },
              { id: 'd', text: 'String' }
            ],
            correctAnswer: 'b',
            explanation: 'Python dictionaries are implemented as hash tables, providing average O(1) constant-time key lookups.'
          }
        ],
        exercises: [
          {
            id: 'ex-py-script',
            title: 'Analyze Python Log Parser Logic',
            instruction: 'Examine the logic of parsing an Apache access log to tally HTTP status codes using Python dictionaries.',
            explanation: 'Dictionaries allow rapid counting of discrete status code occurrences (e.g. 200, 404, 500).'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-py-1',
            type: 'multiple-choice',
            question: 'Why is `with open(...) as f:` preferred in Python when working with files?',
            options: [
              { id: 'a', text: 'It automatically closes the file descriptor even if an unhandled exception occurs' },
              { id: 'b', text: 'It compresses the file' },
              { id: 'c', text: 'It encrypts the file with AES' },
              { id: 'd', text: 'It makes file reading run on the GPU' }
            ],
            correctAnswer: 'a',
            explanation: 'Context managers guarantee that file resources are reliably closed and flushed, preventing descriptor leaks.'
          }
        ]
      },
      {
        id: 'prog-c-and-systems',
        stageId: 'stage-3-programming',
        title: 'Systems Programming in C: Memory Pointers & Buffer Structures',
        summary: 'Explore why C underpins operating systems, kernels, and cybersecurity: direct pointer memory arithmetic, stack vs heap allocation, and understanding memory-corruption classes.',
        difficulty: 'Intermediate',
        estimatedMinutes: 50,
        prerequisites: ['Python for Systems, Automation & Security Scripting'],
        objectives: [
          'Understand how C maps directly to hardware memory addresses without runtime garbage collection.',
          'Define pointers, dereferencing (*p), and memory addresses (&x).',
          'Differentiate between Stack memory (automatic) and Heap memory (dynamic malloc/free).',
          'Understand buffer overflow mechanisms conceptually from a defensive perspective.'
        ],
        sections: [
          {
            id: 'c-pointers',
            title: '1. Pointers: Direct Addresses in RAM',
            content: `In high-level languages like Python or JavaScript, the runtime engine manages memory for you. In **C**, you work directly with raw memory addresses!

* **\`int x = 42;\`**: Reserves 4 bytes in RAM holding the number 42.
* **\`&x\`**: The memory address where \`x\` lives (e.g., \`0x7ffd5e2a\`).
* **\`int *ptr = &x;\`**: A pointer variable whose *value* is the memory address of \`x\`.
* **\`*ptr = 99;\`**: **Dereferencing** the pointer—writing the number 99 directly into that memory address!`,
            deepDive: {
              title: 'Stack vs Heap',
              content: 'Stack memory is managed automatically by the CPU via the Stack Pointer register (%rsp). It is blazingly fast but fixed in size (local function variables). Heap memory is allocated dynamically at runtime via malloc() and must be manually freed via free(). Failing to free heap memory causes Memory Leaks; freeing twice causes Double Free vulnerabilities.'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-c-ptr',
            type: 'multiple-choice',
            question: 'If `int *p = &val;`, what does the expression `*p` do?',
            options: [
              { id: 'a', text: 'Multiplies p by val' },
              { id: 'b', text: 'Dereferences the pointer, accessing the value stored at the address pointed to by p' },
              { id: 'c', text: 'Deletes the variable val' },
              { id: 'd', text: 'Prints the address to the screen' }
            ],
            correctAnswer: 'b',
            explanation: 'The asterisk (*) operator dereferences a pointer, allowing reading or modifying the value stored at that specific memory address.'
          }
        ],
        exercises: [
          {
            id: 'ex-c-buf',
            title: 'Analyze Buffer Safety',
            instruction: 'Why is `fgets()` safe while `gets()` was completely removed from the C standard library?',
            explanation: '`gets()` has no bounds checking and reads unbounded input into a fixed buffer, causing stack buffer overflows. `fgets()` explicitly limits input length to the buffer size.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-c-1',
            type: 'multiple-choice',
            question: 'What is a segmentation fault in C?',
            options: [
              { id: 'a', text: 'When the program tries to access a memory address that it does not have permission to read or write (enforced by the CPU MMU)' },
              { id: 'b', text: 'When the compiler runs out of disk space' },
              { id: 'c', text: 'When an integer is multiplied by zero' },
              { id: 'd', text: 'When a variable name is too long' }
            ],
            correctAnswer: 'a',
            explanation: 'The Memory Management Unit (MMU) catches invalid memory accesses (like dereferencing a NULL pointer or reading outside allocated segments) and halts the process with SIGSEGV.'
          }
        ]
      }
    ]
  },
  {
    id: 'stage-4-networking',
    number: 4,
    title: 'Computer Networking & Internet Protocols',
    shortTitle: 'Networking',
    description: 'Deconstruct global connectivity: packets, frames, the OSI 7-layer model, IPv4, IPv6, Subnetting & CIDR calculations, ARP, the TCP 3-way handshake, DNS resolution, and the full journey of an HTTP/TLS request.',
    difficulty: 'Intermediate',
    estimatedTime: '5–6 weeks (25–35 hours)',
    lessonCount: 4,
    iconName: 'Network',
    lessons: [
      {
        id: 'net-fundamentals-and-osi',
        stageId: 'stage-4-networking',
        title: 'Networking Fundamentals: Packets, Frames & The OSI Model',
        summary: 'Understand how computers communicate across physical space: Local Area Networks (LAN), Wide Area Networks (WAN), packet encapsulation, and the 7 layers of the OSI model.',
        difficulty: 'Beginner',
        estimatedMinutes: 45,
        prerequisites: ['Binary, Hexadecimal & Data Representation'],
        objectives: [
          'Differentiate between LAN, WAN, and the global Internet.',
          'Define the 7 layers of the OSI reference model and the 4 layers of the TCP/IP stack.',
          'Understand data encapsulation and decapsulation (Headers and Payloads).',
          'Differentiate between a Layer 2 Frame and a Layer 3 Packet.'
        ],
        sections: [
          {
            id: 'osi-layers',
            title: '1. The 7 Layers of the OSI Model',
            content: `The **Open Systems Interconnection (OSI)** model provides a conceptual blueprint for how network communication functions:

1. **Layer 7: Application**: Protocols user software interacts with directly (\`HTTP\`, \`SSH\`, \`DNS\`, \`SMTP\`).
2. **Layer 6: Presentation**: Data formatting, character conversion, encryption/decryption (\`TLS\`, \`ASCII\`, \`JSON\`).
3. **Layer 5: Session**: Managing dialogue sessions between applications.
4. **Layer 4: Transport**: End-to-end delivery, port multiplexing, reliability, flow control (\`TCP\`, \`UDP\`). *PDU: Segment / Datagram*.
5. **Layer 3: Network**: Logical routing across interconnected networks across the globe (\`IPv4\`, \`IPv6\`, \`ICMP\`). *PDU: Packet*.
6. **Layer 2: Data Link**: Physical frame transfer between directly connected devices on the same local wire or radio link (\`Ethernet\`, \`Wi-Fi\`, \`MAC addresses\`). *PDU: Frame*.
7. **Layer 1: Physical**: Raw binary transmission of electrical pulses, optical photons, or radio waves (\`Cat6 copper\`, \`Fiber optic\`, \`802.11 RF\`).`,
            analogy: 'Imagine sending a letter: you write words (Application), translate to French (Presentation), place in an envelope with an address (Network), hand to the postal carrier (Data Link), who drives a van along the road (Physical).'
          },
          {
            id: 'net-encapsulation',
            title: '2. The Magic of Encapsulation',
            content: `When your browser sends an HTTP request:
1. **Application Layer**: Generates \`GET / HTTP/1.1\`.
2. **Transport Layer**: Prepend a **TCP Header** (source port 54321, destination port 80/443, sequence numbers).
3. **Network Layer**: Prepend an **IP Header** (source IP 192.168.1.50, destination IP 93.184.216.34).
4. **Data Link Layer**: Prepend an **Ethernet Header** (source MAC, gateway MAC) and append a **CRC Frame Check Sequence (FCS)**.
5. **Physical Layer**: Transmits the bits as electrical voltages on the cable.

At the destination, the reverse happens (**Decapsulation**): each layer strips its respective header!`,
            quickCheck: {
              id: 'qc-pdu-layer3',
              type: 'multiple-choice',
              question: 'What is the Protocol Data Unit (PDU) at Layer 3 (Network Layer) called?',
              options: [
                { id: 'a', text: 'Bit' },
                { id: 'b', text: 'Frame' },
                { id: 'c', text: 'Packet' },
                { id: 'd', text: 'Segment' }
              ],
              correctAnswer: 'c',
              explanation: 'Layer 2 data units are Frames; Layer 3 data units are Packets; Layer 4 data units are Segments/Datagrams.'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-osi-l4',
            type: 'multiple-choice',
            question: 'Which OSI layer is responsible for port numbers (such as port 80, 443, 22) and reliable delivery?',
            options: [
              { id: 'a', text: 'Layer 2 (Data Link)' },
              { id: 'b', text: 'Layer 3 (Network)' },
              { id: 'c', text: 'Layer 4 (Transport)' },
              { id: 'd', text: 'Layer 1 (Physical)' }
            ],
            correctAnswer: 'c',
            explanation: 'Layer 4 (Transport) handles port multiplexing and protocol transport semantics (TCP/UDP).'
          }
        ],
        exercises: [
          {
            id: 'ex-net-layers',
            title: 'Map Network Protocols to Layers',
            instruction: 'Categorize HTTP, IP, Ethernet, and TCP to their corresponding OSI layer numbers (7, 3, 2, 4).',
            explanation: 'HTTP is Layer 7, TCP is Layer 4, IP is Layer 3, Ethernet is Layer 2.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-net-1',
            type: 'multiple-choice',
            question: 'What does decapsulation mean when receiving a network message?',
            options: [
              { id: 'a', text: 'Compressing the file to save disk space' },
              { id: 'b', text: 'Stripping outer protocol headers (Ethernet, IP, TCP) as data moves upward through the network stack to reach the application payload' },
              { id: 'c', text: 'Disconnecting the Ethernet cable' },
              { id: 'd', text: 'Changing the DNS server' }
            ],
            correctAnswer: 'b',
            explanation: 'Decapsulation is the reverse of encapsulation, peeling off protocol headers layer by layer.'
          }
        ]
      },
      {
        id: 'net-addressing-and-subnetting',
        stageId: 'stage-4-networking',
        title: 'Network Addressing: MAC, IPv4, IPv6, Subnets & CIDR Notation',
        summary: 'Deep dive into addressing: 48-bit MAC addresses, 32-bit IPv4 addresses, RFC 1918 private ranges, IPv6, calculating subnet masks, network addresses, broadcast addresses, and CIDR notation (/24, /16).',
        difficulty: 'Intermediate',
        estimatedMinutes: 50,
        prerequisites: ['Networking Fundamentals: Packets, Frames & The OSI Model'],
        objectives: [
          'Differentiate between Layer 2 physical MAC addresses and Layer 3 logical IP addresses.',
          'Identify RFC 1918 private IP ranges and explain why Network Address Translation (NAT) exists.',
          'Understand subnet masks and calculate Network Address, Broadcast Address, and Usable Host Range.',
          'Master Classless Inter-Domain Routing (CIDR) prefix notation (/24, /16, /30).'
        ],
        interactiveTool: 'subnet-calculator',
        sections: [
          {
            id: 'mac-vs-ip',
            title: '1. MAC Address vs IP Address',
            content: `* **MAC Address (Media Access Control)**: A 48-bit physical address burned into the network interface hardware (e.g., \`00:1A:2B:3C:4D:5E\`).
  * Operates at **Layer 2**.
  * Used *only* for communication between devices on the *same local physical segment/switch*.
  * MAC addresses do not route across the Internet!
* **IP Address (Internet Protocol)**: A logical address assigned dynamically or statically by network administrators.
  * Operates at **Layer 3**.
  * Globally routable across billions of interconnected routers.`,
            deepDive: {
              title: 'ARP (Address Resolution Protocol)',
              content: 'When your computer wants to send an IP packet to local IP 192.168.1.1, how does it know which physical MAC address to put into the Ethernet frame? It broadcasts an ARP Request: "Who has 192.168.1.1? Tell 192.168.1.50!" The gateway responds with its MAC address, which your OS caches in its local ARP table (`arp -a`).'
            }
          },
          {
            id: 'ipv4-subnets-cidr',
            title: '2. IPv4 Structure & RFC 1918 Private Ranges',
            content: `An IPv4 address is 32 bits divided into four 8-bit octets:  
\`192.168.1.100\` $\\rightarrow$ \`11000000 . 10101000 . 00000001 . 01100100\`

Because IPv4 allows only $2^{32} \\approx 4.29$ billion addresses, the world ran out of public IPs. **RFC 1918** reserved three private address blocks that are never routed across the public Internet:
* **Class A Private**: \`10.0.0.0/8\` (10.0.0.0 to 10.255.255.255)
* **Class B Private**: \`172.16.0.0/12\` (172.16.0.0 to 172.31.255.255)
* **Class C Private**: \`192.168.0.0/16\` (192.168.0.0 to 192.168.255.255)
* **Loopback**: \`127.0.0.1\` (\`localhost\` - stays internal to your own OS stack).

### CIDR Notation & Subnet Calculation:
In a \`/24\` subnet (Subnet mask \`255.255.255.0\`):
* The first 24 bits are the **Network Identifier** (fixed).
* The remaining 8 bits ($32 - 24 = 8$) are for **Host Identifiers**.
* Total addresses: $2^8 = 256$.
* **Reserved Addresses**:
  * Lowest address (all host bits 0): **Network Address** (\`192.168.1.0\`).
  * Highest address (all host bits 1): **Broadcast Address** (\`192.168.1.255\`).
* **Usable Host Range**: $256 - 2 = 254$ devices (\`192.168.1.1\` to \`192.168.1.254\`).`,
            quickCheck: {
              id: 'qc-cidr-hosts',
              type: 'type-answer',
              question: 'How many usable host IP addresses are available in a /28 subnet? (Calculate 2^(32-28) - 2):',
              correctAnswer: '14',
              explanation: '32 - 28 = 4 host bits. 2^4 = 16 total addresses minus 2 reserved (network and broadcast) = 14 usable hosts.'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-rfc1918',
            type: 'multiple-choice',
            question: 'Which of the following IP addresses is a private address according to RFC 1918?',
            options: [
              { id: 'a', text: '8.8.8.8' },
              { id: 'b', text: '192.168.10.45' },
              { id: 'c', text: '1.1.1.1' },
              { id: 'd', text: '142.250.190.46' }
            ],
            correctAnswer: 'b',
            explanation: '192.168.0.0/16 is explicitly reserved for private local networks under RFC 1918.'
          }
        ],
        exercises: [
          {
            id: 'ex-subnet-calc',
            title: 'Use the Interactive Subnet Calculator',
            instruction: 'Input different IP addresses and CIDR prefixes into the Subnet Calculator below. Compare the Network Address, Broadcast Address, and Usable Host count between /24, /27, and /16.',
            explanation: 'Visualizing network vs host bit boundaries makes subnetting intuitive.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-sub-1',
            type: 'multiple-choice',
            question: 'Why can the network address and broadcast address never be assigned to an individual computer host?',
            options: [
              { id: 'a', text: 'The network address identifies the entire subnet itself, and the broadcast address sends packets to all devices on the subnet simultaneously' },
              { id: 'b', text: 'They are blocked by international law' },
              { id: 'c', text: 'They require high voltage' },
              { id: 'd', text: 'They are only used on Sundays' }
            ],
            correctAnswer: 'a',
            explanation: 'The all-zeros host address designates the wire/subnet itself, and all-ones is the Layer 3 broadcast address.'
          }
        ]
      },
      {
        id: 'net-tcp-udp-and-handshake',
        stageId: 'stage-4-networking',
        title: 'Core Protocols: TCP, UDP, Ports & The 3-Way Handshake',
        summary: 'Understand transport layer mechanics: reliable stateful TCP vs low-latency UDP, common ports (22, 53, 80, 443), and trace the TCP 3-way handshake (SYN, SYN-ACK, ACK) with sequence numbers.',
        difficulty: 'Intermediate',
        estimatedMinutes: 45,
        prerequisites: ['Networking Fundamentals: Packets, Frames & The OSI Model'],
        objectives: [
          'Differentiate between connection-oriented TCP and connectionless UDP.',
          'Understand Port Numbers (0-65535), well-known ports, and socket endpoints.',
          'Trace the TCP 3-Way Handshake step-by-step with SYN, SYN-ACK, and ACK flags.',
          'Explain how TCP provides reliability, ordering, retransmission, and flow control.'
        ],
        sections: [
          {
            id: 'tcp-vs-udp',
            title: '1. TCP vs UDP: The Transport Protocol Duel',
            content: `The Transport layer has two primary protocols:

### Transmission Control Protocol (TCP):
* **Connection-Oriented**: Establishes a session before transmitting payload data.
* **Reliable**: Every packet is acknowledged. If an ACK isn't received within a timeout window, the packet is automatically retransmitted.
* **Ordered**: Packets arriving out of order are reassembled based on sequence numbers.
* **Use Cases**: Web browsing (HTTP/HTTPS), file transfer (SSH/SFTP), databases, email.

### User Datagram Protocol (UDP):
* **Connectionless**: Simply fires packets ("datagrams") at the destination with zero handshake.
* **Unreliable & Lightweight**: No acknowledgments, no retransmission, no sequencing.
* **Ultra-Low Latency**: Minimal 8-byte header overhead.
* **Use Cases**: Live voice/video calls (VoIP, WebRTC), online competitive gaming, DNS lookups.`,
            analogy: 'TCP is a recorded certified delivery letter requiring the recipient to sign and return a receipt. UDP is shouting a message across a crowded room: fast and simple, but if someone coughs, the message is lost.'
          },
          {
            id: 'tcp-3wh',
            title: '2. The TCP Three-Way Handshake',
            content: `Before a single byte of HTTP data is exchanged, client and server must agree on starting sequence numbers:

\`\`\`text
CLIENT                                                SERVER
  │                                                     │
  │─── 1. SYN (Synchronize, Seq=1000) ─────────────────>│
  │                                                     │
  │<── 2. SYN-ACK (Seq=5000, Ack=1001) ─────────────────│
  │                                                     │
  │─── 3. ACK (Seq=1001, Ack=5001) ────────────────────>│
  │                                                     │
  ▼        [ CONNECTION ESTABLISHED - SEND DATA ]        ▼
\`\`\`

1. **Step 1: SYN**: The client chooses an Initial Sequence Number ($X$) and sends a packet with the \`SYN\` flag set.
2. **Step 2: SYN-ACK**: The server responds with its own Initial Sequence Number ($Y$), sets \`SYN\`, and sets \`ACK\` acknowledging $X+1$.
3. **Step 3: ACK**: The client sends an \`ACK\` acknowledging $Y+1$. The connection is now statefully ESTABLISHED!`,
            deepDive: {
              title: 'SYN Flood Attacks & SYN Cookies',
              content: 'In a SYN flood Denial of Service (DoS) attack, an adversary sends millions of spoofed SYN packets without completing the third ACK. The server allocates kernel memory waiting for each handshake, eventually running out of memory. Modern Linux kernels defend against this with "SYN Cookies", calculating cryptographic hashes in the sequence number so no state needs to be stored in RAM until the legitimate ACK returns!'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-tcp-synack',
            type: 'multiple-choice',
            question: 'What packet flags are set in the second step of the TCP three-way handshake?',
            options: [
              { id: 'a', text: 'FIN-ACK' },
              { id: 'b', text: 'SYN and ACK' },
              { id: 'c', text: 'RST' },
              { id: 'd', text: 'URG' }
            ],
            correctAnswer: 'b',
            explanation: 'The server responds with SYN (to synchronize its own sequence number) and ACK (to acknowledge the client\'s sequence number).'
          }
        ],
        exercises: [
          {
            id: 'ex-tcp-ports',
            title: 'Identify Common Port Associations',
            instruction: 'Match port 22 (SSH), port 53 (DNS), port 80 (HTTP), and port 443 (HTTPS) to their corresponding services.',
            explanation: 'Standard ports identify listening network daemons.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-tcp-1',
            type: 'multiple-choice',
            question: 'Why is UDP preferred over TCP for real-time multiplayer gaming and live audio?',
            options: [
              { id: 'a', text: 'Because retransmitting dropped packets after a delay is useless in real-time streams; fresh current state is more valuable than old stale data' },
              { id: 'b', text: 'Because UDP is encrypted by default' },
              { id: 'c', text: 'Because TCP does not work on Wi-Fi' },
              { id: 'd', text: 'Because UDP has no port numbers' }
            ],
            correctAnswer: 'a',
            explanation: 'In live audio and gaming, an audio sample or player coordinate from 500ms ago is useless; retransmission latency causes unacceptable lag.'
          }
        ]
      },
      {
        id: 'net-journey-of-a-web-request',
        stageId: 'stage-4-networking',
        title: 'Application Protocols & The Journey of a Web Request',
        summary: 'Trace what happens down to the microsecond when you type "https://example.com" into a browser: DNS hierarchical resolution, ARP, TCP handshake, TLS 1.3 encryption exchange, HTTP request/response cycle, and page rendering.',
        difficulty: 'Intermediate',
        estimatedMinutes: 50,
        prerequisites: ['Core Protocols: TCP, UDP, Ports & The 3-Way Handshake'],
        objectives: [
          'Trace the complete lifecycle of a web request across all 7 OSI layers.',
          'Understand hierarchical DNS resolution: Root Servers, TLD Servers, and Authoritative Name Servers.',
          'Understand TLS 1.3 encryption key exchange and digital certificate verification.',
          'Inspect HTTP/1.1 and HTTP/2 headers and status codes (200, 301, 403, 404, 500).'
        ],
        interactiveTool: 'packet-journey',
        sections: [
          {
            id: 'journey-steps',
            title: '1. The 7 Epochs of a Web Request',
            content: `When a human types \`https://example.com\` and hits Enter, a breathtaking chain of events unfolds:

### Epoch 1: Browser Cache & DNS Resolution
1. Browser checks its own cache, then OS cache (\`/etc/hosts\`).
2. OS queries the configured Recursive DNS Resolver (e.g., \`1.1.1.1\`).
3. Recursive resolver queries:
   * **Root Name Server (\`.\`)** $\\rightarrow$ directs to \`.com\` TLD server.
   * **TLD Name Server (\`.com\`)** $\\rightarrow$ directs to Authoritative Name Server for \`example.com\`.
   * **Authoritative Name Server** $\\rightarrow$ returns IPv4 \`A\` record (\`93.184.216.34\`).

### Epoch 2: ARP & Gateway Traversal
The computer uses ARP to discover the local router's MAC address to route packets off the local LAN.

### Epoch 3: TCP 3-Way Handshake
Client and server exchange \`SYN\` $\\rightarrow$ \`SYN-ACK\` $\\rightarrow$ \`ACK\` on port 443.

### Epoch 4: TLS 1.3 Cryptographic Handshake
1. Client sends \`ClientHello\` with supported cryptographic ciphers and an ephemeral Diffie-Hellman public key share.
2. Server returns its X.509 Certificate and public key share.
3. Both sides independently calculate matching symmetric session keys without ever transmitting the secret key over the wire!

### Epoch 5: Encrypted HTTP Transmission
Client sends encrypted \`GET / HTTP/1.1\`. The web server processes the request and returns \`HTTP/1.1 200 OK\` with HTML.`,
            commonMistakes: [
              {
                mistake: 'Believing that typing a domain sends the domain name directly to the web server hardware.',
                whyItHappens: 'Humans remember names like google.com, not IP numbers.',
                correction: 'The Internet routing fabric operates strictly on IP addresses; DNS must resolve the domain to an IP before any connection can be initiated.'
              }
            ]
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-dns-role',
            type: 'multiple-choice',
            question: 'What is the primary function of a DNS A record?',
            options: [
              { id: 'a', text: 'To map a domain name to an IPv4 address' },
              { id: 'b', text: 'To route incoming email' },
              { id: 'c', text: 'To encrypt passwords' },
              { id: 'd', text: 'To test internet speed' }
            ],
            correctAnswer: 'a',
            explanation: 'An A (Address) record maps a human-readable hostname to a 32-bit IPv4 address.'
          }
        ],
        exercises: [
          {
            id: 'ex-journey-sim',
            title: 'Step Through the Interactive Packet Journey',
            instruction: 'Use the interactive Packet Journey simulator below. Step from DNS, through ARP, TCP Handshake, TLS Exchange, to HTTP Delivery.',
            explanation: 'Visualizing packet progression makes the abstract sequence concrete.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-jour-1',
            type: 'multiple-choice',
            question: 'Why does TLS 1.3 use asymmetric encryption during the initial handshake but switch to symmetric encryption for actual web traffic data?',
            options: [
              { id: 'a', text: 'Symmetric encryption (AES-GCM) is orders of magnitude faster in hardware, so asymmetric cryptography is only used to securely agree on a shared session key' },
              { id: 'b', text: 'Because symmetric encryption cannot be decrypted' },
              { id: 'c', text: 'Because asymmetric encryption does not work on web pages' },
              { id: 'd', text: 'Because browsers do not support public keys' }
            ],
            correctAnswer: 'a',
            explanation: 'Asymmetric encryption is computationally expensive; hybrid cryptosystems use asymmetric keys to exchange a symmetric key, then encrypt streaming data with high-speed AES/ChaCha20.'
          }
        ]
      }
    ]
  },
  {
    id: 'stage-5-cybersecurity',
    number: 5,
    title: 'Cybersecurity Fundamentals & Defense',
    shortTitle: 'Cybersecurity',
    description: 'Learn cybersecurity as a serious engineering discipline: the CIA Triad, AAA, Threat Modeling, Cryptography (symmetric, asymmetric, SHA-256, salting), and Web Application security architecture.',
    difficulty: 'Intermediate',
    estimatedTime: '4–6 weeks (20–30 hours)',
    lessonCount: 3,
    iconName: 'Shield',
    lessons: [
      {
        id: 'sec-cia-and-principles',
        stageId: 'stage-5-cybersecurity',
        title: 'Core Principles: The CIA Triad, AAA & Threat Modeling',
        summary: 'Establish foundational security engineering concepts: Confidentiality, Integrity, Availability, Least Privilege, Defense in Depth, and calculating Risk = Threat x Vulnerability x Impact.',
        difficulty: 'Beginner',
        estimatedMinutes: 40,
        prerequisites: ['Networking Fundamentals: Packets, Frames & The OSI Model'],
        objectives: [
          'Deconstruct the CIA Triad (Confidentiality, Integrity, Availability) with real-world failure cases.',
          'Define Authentication, Authorization, and Accounting (AAA).',
          'Differentiate between Threat, Vulnerability, Risk, and Exploit.',
          'Apply the Principle of Least Privilege and Defense in Depth to system architectures.'
        ],
        sections: [
          {
            id: 'cia-triad',
            title: '1. The CIA Triad',
            content: `Every security control, policy, or vulnerability assessment ties directly back to three cornerstone pillars:

* **Confidentiality**: Ensuring sensitive information is accessible *only* to authorized entities and kept concealed from eavesdroppers.
  * *Controls*: Strong encryption (AES), Access Control Lists (ACLs), multi-factor authentication.
  * *Breach Example*: An unauthorized party downloading customer credit card databases.
* **Integrity**: Ensuring information is accurate, authentic, and protected against unauthorized modification or deletion.
  * *Controls*: Cryptographic hashes (SHA-256), digital signatures, immutable audit logs.
  * *Breach Example*: An adversary tampering with medical dosage records in a hospital database.
* **Availability**: Ensuring systems and data are reliably accessible to authorized users when needed.
  * *Controls*: Redundancy, failover clusters, DDoS mitigation, regular backups.
  * *Breach Example*: Ransomware encrypting hospital servers or a Distributed Denial of Service attack knocking out a banking portal.`,
            analogy: 'Think of an armored cash transport vehicle: bulletproof steel protects Confidentiality (no one sees inside); tamper-evident seals protect Integrity (you know if a bag was opened); and reliable engine maintenance protects Availability (the truck delivers on time).'
          },
          {
            id: 'risk-formula',
            title: '2. The Threat vs Vulnerability vs Risk Distinction',
            content: `Learners frequently confuse these four core terms:

* **Vulnerability**: A flaw or weakness in software design, implementation, or system configuration (e.g., leaving a default password on a router).
* **Threat**: Any circumstance or entity with the intent and potential capability to cause harm (e.g., an automated internet bot scanning for default passwords).
* **Exploit**: The specific mechanism, code, or technique used to take advantage of a vulnerability.
* **Risk**: The likelihood and financial/operational consequence of a threat exploiting a vulnerability:

$$\\mathbf{Risk = Threat \\times Vulnerability \\times Impact}$$

If you have a critical vulnerability on an isolated computer disconnected from any network and locked in a vault, your Threat exposure is near zero, so the actual Risk remains low!`,
            quickCheck: {
              id: 'qc-risk-equation',
              type: 'multiple-choice',
              question: 'If a known software bug exists (vulnerability) but no attacker or threat actor has access to reach the system, what is the risk level?',
              options: [
                { id: 'a', text: 'Infinite risk' },
                { id: 'b', text: 'Low / negligible, because Risk requires Threat, Vulnerability, and Impact to coincide' },
                { id: 'c', text: 'High risk' },
                { id: 'd', text: 'The computer will automatically shut down' }
              ],
              correctAnswer: 'b',
              explanation: 'Without threat actor access or an exploit vector, a vulnerability alone does not produce active risk.'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-cia-ransomware',
            type: 'multiple-choice',
            question: 'Ransomware that encrypts an organization\'s files and locks them out primarily attacks which pillar of the CIA triad?',
            options: [
              { id: 'a', text: 'Availability (and Integrity)' },
              { id: 'b', text: 'Only Confidentiality' },
              { id: 'c', text: 'None' },
              { id: 'd', text: 'Accounting' }
            ],
            correctAnswer: 'a',
            explanation: 'Ransomware prevents authorized users from accessing critical operational files, creating an acute Availability crisis.'
          }
        ],
        exercises: [
          {
            id: 'ex-least-priv',
            title: 'Apply Least Privilege',
            instruction: 'A web application needs to read images from a directory. What permissions should the web server account have: read-only, read-write, or full root ownership?',
            explanation: 'Least privilege dictates read-only access. Write or root access gives attackers unnecessary leverage if the app is compromised.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-sec-1',
            type: 'multiple-choice',
            question: 'What is Defense in Depth?',
            options: [
              { id: 'a', text: 'Relying exclusively on a single strong firewall' },
              { id: 'b', text: 'Layering multiple independent defensive controls (firewall + least privilege + endpoint defense + encryption + monitoring) so that if one fails, others stop the attack' },
              { id: 'c', text: 'Digging physical trenches around a data center' },
              { id: 'd', text: 'Using 10 different antivirus programs on one machine' }
            ],
            correctAnswer: 'b',
            explanation: 'Defense in depth ensures no single point of security failure compromises the overall organization.'
          }
        ]
      },
      {
        id: 'sec-cryptography-masterclass',
        stageId: 'stage-5-cybersecurity',
        title: 'Cryptography: Symmetric, Asymmetric, Hashing & Salting',
        summary: 'Explore mathematical security: understand symmetric encryption (AES), asymmetric key pairs (RSA/ECC), cryptographic hash functions (SHA-256), avalanche effects, password salting, and rainbow table defense.',
        difficulty: 'Intermediate',
        estimatedMinutes: 50,
        prerequisites: ['Core Principles: The CIA Triad, AAA & Threat Modeling'],
        objectives: [
          'Differentiate between two-way Encryption and one-way Cryptographic Hashing.',
          'Understand Symmetric (shared secret) vs Asymmetric (public/private key) algorithms.',
          'Identify the key properties of cryptographic hashes: pre-image resistance, collision resistance, and the avalanche effect.',
          'Demonstrate why passwords must be salted and hashed with slow algorithms (Argon2, bcrypt).'
        ],
        interactiveTool: 'crypto-sandbox',
        sections: [
          {
            id: 'crypto-enc-vs-hash',
            title: '1. Encryption vs Hashing: The Fundamental Divide',
            content: `Learners must never confuse these two cryptographic primitives:

### 1. Encryption (Two-Way Function)
* **Goal**: Confidentiality.
* Takes plaintext + an encryption key $\\rightarrow$ produces ciphertext.
* **Reversible**: Anyone possessing the decryption key can turn the ciphertext back into the original plaintext!
* *Examples*: **AES-256**, **ChaCha20**, **RSA**, **Curve25519**.

### 2. Cryptographic Hashing (One-Way Digest)
* **Goal**: Integrity and verification.
* Takes arbitrary data of any size $\\rightarrow$ produces a fixed-length mathematical string (e.g., 256 bits for SHA-256).
* **Irreversible**: It is mathematically infeasible to compute the original input from the hash!
* *Essential Properties*:
  1. **Deterministic**: The same input always produces the exact same hash.
  2. **Fast to Compute**: Efficient for data integrity checks.
  3. **Pre-image Resistant**: Given hash $H$, impossible to find input $M$ such that $\\text{hash}(M) = H$.
  4. **Collision Resistant**: Infeasible to find two different inputs that produce the same hash.
  5. **Avalanche Effect**: Changing even a single bit of input flips ~50% of the output bits!`,
            deepDive: {
              title: 'Why MD5 and SHA-1 Are Deprecated',
              content: 'In 2004, cryptographers demonstrated practical collision attacks against MD5, producing two different files with identical MD5 hashes. In 2017, Google announced the SHAttered attack against SHA-1. Modern security standards mandate SHA-256 or SHA-3.'
            }
          },
          {
            id: 'crypto-salting',
            title: '2. Storing Passwords: Why Salting is Mandatory',
            content: `Never store passwords in plaintext! But storing plain \`SHA256(password)\` is also dangerous because attackers use precomputed **Rainbow Tables** (lookup tables of billions of hashed common passwords).

### The Solution: Cryptographic Salt!
A **Salt** is a unique, cryptographically random string (e.g., 16+ bytes) generated independently for *every single user account*.

\`\`\`text
User Alice:
Salt:    "k8#mZ9$qP1vL"
Store:   hash("k8#mZ9$qP1vL" + "Password123!")

User Bob (same password!):
Salt:    "w3!xR7&tN4yB"
Store:   hash("w3!xR7&tN4yB" + "Password123!")
\`\`\`

Because the salt is unique, two users with the exact same password produce completely different stored hashes, completely defeating precomputed rainbow tables!

Furthermore, modern systems use **deliberately slow, memory-hard algorithms** like **Argon2** or **bcrypt** that force an attacker's GPU to spend thousands of cycles per guess, rendering brute-force attacks computationally impractical.`,
            quickCheck: {
              id: 'qc-salt-purpose',
              type: 'multiple-choice',
              question: 'What is the primary purpose of adding a salt to a password before hashing?',
              options: [
                { id: 'a', text: 'To encrypt the user\'s email address' },
                { id: 'b', text: 'To ensure identical passwords generate completely different hashes and defeat precomputed rainbow table attacks' },
                { id: 'c', text: 'To make the password shorter' },
                { id: 'd', text: 'To send the password over the network faster' }
              ],
              correctAnswer: 'b',
              explanation: 'A unique salt invalidates precomputed hash databases (rainbow tables) by guaranteeing every user digest is unique.'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-crypto-asym',
            type: 'multiple-choice',
            question: 'In asymmetric public-key cryptography, which key can be shared openly with the public?',
            options: [
              { id: 'a', text: 'The Private Key' },
              { id: 'b', text: 'The Public Key' },
              { id: 'c', text: 'Both keys' },
              { id: 'd', text: 'Neither key' }
            ],
            correctAnswer: 'b',
            explanation: 'The Public Key is shared openly so anyone can encrypt messages or verify signatures; the Private Key must remain strictly secret.'
          }
        ],
        exercises: [
          {
            id: 'ex-crypto-sandbox',
            title: 'Experiment with the Cryptography Sandbox',
            instruction: 'Type text into the Cryptography Sandbox below. Change a single punctuation mark and watch the SHA-256 hash completely scramble (avalanche effect). Test the salt demonstration.',
            explanation: 'Demonstrates hash properties and salt resistance visually.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-cry-1',
            type: 'multiple-choice',
            question: 'Can you reverse a SHA-256 hash mathematically to reconstruct the original 500-page document that generated it?',
            options: [
              { id: 'a', text: 'Yes, using the private key' },
              { id: 'b', text: 'No; hashing is a one-way lossy compression function where infinite possible inputs map to a fixed 256-bit space, making inversion mathematically impossible' },
              { id: 'c', text: 'Yes, if you use a quantum computer' },
              { id: 'd', text: 'Yes, with Python' }
            ],
            correctAnswer: 'b',
            explanation: 'Cryptographic hashes are fundamentally one-way digests; they cannot be decrypted.'
          }
        ]
      },
      {
        id: 'sec-web-application-security',
        stageId: 'stage-5-cybersecurity',
        title: 'Web Security Architecture & Defensive Engineering',
        summary: 'Understand the modern web threat landscape: the request/response lifecycle, session tokens, secure cookies (HttpOnly, Secure, SameSite), input sanitization, and the OWASP Top 10 vulnerabilities.',
        difficulty: 'Intermediate',
        estimatedMinutes: 45,
        prerequisites: ['Application Protocols & The Journey of a Web Request'],
        objectives: [
          'Understand stateless HTTP session management and cookie security flags.',
          'Explain Insecure Direct Object References (IDOR) and broken authorization.',
          'Understand Cross-Site Scripting (XSS) and SQL Injection conceptually with defensive parameterized queries.',
          'Explain why client-side security checks alone are never sufficient.'
        ],
        sections: [
          {
            id: 'web-cookies-sessions',
            title: '1. Cookies & Session Security Flags',
            content: `Because HTTP is stateless, servers issue **Session Cookies** to identify authenticated users:

To protect session tokens, production servers configure three vital cookie flags:
1. **\`HttpOnly\`**: Prevents client-side JavaScript (\`document.cookie\`) from reading the cookie, neutralizing standard Cross-Site Scripting (XSS) session theft!
2. **\`Secure\`**: Instructs the browser to transmit the cookie *only* over encrypted HTTPS connections, preventing cleartext sniffing on Wi-Fi networks.
3. **\`SameSite=Lax/Strict\`**: Restricts whether cookies are sent with cross-site requests, protecting against Cross-Site Request Forgery (CSRF).`,
            codeBlocks: [
              {
                language: 'http',
                code: 'HTTP/1.1 200 OK\nSet-Cookie: session_id=abc123xyz456; Secure; HttpOnly; SameSite=Strict; Path=/',
                description: 'An authenticated server response setting a hardened security cookie.'
              }
            ]
          },
          {
            id: 'web-idor-injection',
            title: '2. Broken Access Control & Injection Defense',
            content: `### 1. Insecure Direct Object References (IDOR / BOLA)
An IDOR occurs when an application receives an identifier from the user (e.g., \`/api/invoice/4021\`) and retrieves the record without verifying whether the currently logged-in user actually owns that invoice!
* **Defensive Rule**: Always enforce server-side ownership checks:
  \`\`\`sql
  -- VULNERABLE:
  SELECT * FROM invoices WHERE id = :id;

  -- DEFENSIVE:
  SELECT * FROM invoices WHERE id = :id AND user_id = :current_user_id;
  \`\`\`

### 2. SQL Injection & Parameterized Queries
SQL Injection occurs when untrusted user input is directly concatenated into a raw database query string.
* **Defensive Rule**: Never concatenate input! Always use **Parameterized Queries (Prepared Statements)** where the database driver treats user input strictly as literal data, never as executable SQL commands!`,
            quickCheck: {
              id: 'qc-httponly-flag',
              type: 'multiple-choice',
              question: 'What does the HttpOnly cookie flag prevent?',
              options: [
                { id: 'a', text: 'It prevents the browser from loading images' },
                { id: 'b', text: 'It prevents client-side JavaScript (e.g., via XSS scripts) from accessing document.cookie' },
                { id: 'c', text: 'It blocks internet access' },
                { id: 'd', text: 'It disables passwords' }
              ],
              correctAnswer: 'b',
              explanation: 'HttpOnly prevents client-side scripts from reading the cookie, protecting session tokens from XSS theft.'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-web-sqli-def',
            type: 'multiple-choice',
            question: 'What is the most effective primary defense against SQL Injection vulnerabilities?',
            options: [
              { id: 'a', text: 'Running the database on port 8080' },
              { id: 'b', text: 'Using Prepared Statements (Parameterized Queries)' },
              { id: 'c', text: 'Adding JavaScript validation in the HTML form' },
              { id: 'd', text: 'Deleting all database tables' }
            ],
            correctAnswer: 'b',
            explanation: 'Prepared statements separate SQL query code from user data, preventing user strings from altering query logic.'
          }
        ],
        exercises: [
          {
            id: 'ex-web-idor',
            title: 'Analyze API Authorization Logic',
            instruction: 'In our upcoming Practical Lab, inspect an authorized simulation API endpoint to verify why server-side token validation is mandatory.',
            explanation: 'Demonstrates authorization boundaries in web applications.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-web-1',
            type: 'multiple-choice',
            question: 'Why is client-side validation (like HTML `required` or frontend JavaScript) insufficient for security?',
            options: [
              { id: 'a', text: 'Because an attacker can bypass frontend browser code by sending HTTP requests directly via curl, Python, or Postman' },
              { id: 'b', text: 'Because HTML is obsolete' },
              { id: 'c', text: 'Because browsers charge a fee for security' },
              { id: 'd', text: 'Because JavaScript cannot validate numbers' }
            ],
            correctAnswer: 'a',
            explanation: 'Client-side controls improve user experience but provide zero security; attackers craft raw HTTP requests directly to the API.'
          }
        ]
      }
    ]
  },
  {
    id: 'stage-6-labs',
    number: 6,
    title: 'Practical Security Labs (Authorized Sandbox)',
    shortTitle: 'Practical Labs',
    description: 'Apply theoretical principles in safe, contained educational sandboxes: Linux permission audits, encoded communication decoding, network packet analysis, and server log forensics.',
    difficulty: 'Advanced',
    estimatedTime: '3–4 weeks (15–20 hours)',
    lessonCount: 2,
    iconName: 'FlaskConical',
    lessons: [
      {
        id: 'labs-sandbox-intro',
        stageId: 'stage-6-labs',
        title: 'Authorized Sandboxes & Security Lab Methodology',
        summary: 'Understand the legal, ethical, and technical rules of authorized security practice: reproducible sandboxes, CTF challenge structures, evidence collection, and professional reporting.',
        difficulty: 'Intermediate',
        estimatedMinutes: 35,
        prerequisites: ['Core Principles: The CIA Triad, AAA & Threat Modeling'],
        objectives: [
          'Understand strict authorization boundaries: practicing only within simulated sandboxes and authorized environments.',
          'Learn the Capture-The-Flag (CTF) verification token mechanism.',
          'Formulate methodical hypotheses rather than random guessing.',
          'Document findings with clear root-cause remediation steps.'
        ],
        sections: [
          {
            id: 'labs-ethics',
            title: '1. The Golden Rule: Explicit Authorization',
            content: `In computer science and cybersecurity, the difference between an ethical security professional and a criminal is **explicit, written authorization**.

All labs in this academy run in **isolated, in-browser sandboxes**. Never attempt security probing, port scanning, or vulnerability testing against real organizations, schools, employers, or personal devices without prior formal written consent!`,
            commonMistakes: [
              {
                mistake: 'Practicing scanning commands on home smart devices or public websites.',
                whyItHappens: 'Learners want to test commands in "the real world".',
                correction: 'Unsolicited probing can trigger security alerts, violate Terms of Service, and breach computer misuse laws. Always use dedicated educational sandboxes, local VMs, and authorized CTF platforms.'
              }
            ]
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-lab-auth',
            type: 'multiple-choice',
            question: 'What is required before performing any technical security testing against an external computer network?',
            options: [
              { id: 'a', text: 'A fast computer' },
              { id: 'b', text: 'Explicit, written legal authorization from the verified system owner' },
              { id: 'c', text: 'An anonymous email account' },
              { id: 'd', text: 'A dark mode terminal' }
            ],
            correctAnswer: 'b',
            explanation: 'Testing without explicit written authorization is illegal under computer crime statutes worldwide.'
          }
        ],
        exercises: [
          {
            id: 'ex-lab-sandbox-open',
            title: 'Navigate to the Practical Labs Workspace',
            instruction: 'Click on the "Labs" tab in the left navigation to access the live interactive challenges: Linux Permission Audit, Encoded Traffic, Packet Inspection, and Log Forensics.',
            explanation: 'The dedicated Labs interface includes full interactive tooling and verification checks.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-lab-1',
            type: 'multiple-choice',
            question: 'What is the goal of an educational security challenge?',
            options: [
              { id: 'a', text: 'To understand how systems fail under misconfiguration and learn how to configure and defend them properly' },
              { id: 'b', text: 'To cause damage to servers' },
              { id: 'c', text: 'To steal passwords for fun' },
              { id: 'd', text: 'To crash websites' }
            ],
            correctAnswer: 'a',
            explanation: 'Security challenges teach defenders how vulnerabilities manifest in order to build resilient, hardened architectures.'
          }
        ]
      },
      {
        id: 'labs-challenge-walkthrough',
        stageId: 'stage-6-labs',
        title: 'Lab Playbook: Investigating System Artifacts & Logs',
        summary: 'Learn how incident responders and forensic analysts triage artifacts: auditing file permissions with stat, parsing authentication logs, and analyzing network packet captures.',
        difficulty: 'Advanced',
        estimatedMinutes: 45,
        prerequisites: ['Authorized Sandboxes & Security Lab Methodology'],
        objectives: [
          'Audit Linux permissions to identify unauthorized world-writable configuration files.',
          'Analyze web and authentication logs to detect brute-force patterns.',
          'Extract and decode multi-layered encoded transmissions (Hex, Base64).',
          'Document remediation recommendations.'
        ],
        sections: [
          {
            id: 'labs-playbook',
            title: '1. Forensic Analysis Playbook',
            content: `When investigating an authorized environment:
1. **Scope and Reconnaissance**: Discover running processes (\`ps aux\`), open listening ports, and user accounts.
2. **Permission Audit**: Search for files with insecure permissions:
   \`\`\`bash
   # Find world-writable files in the system
   find / -type f -perm -0002 2>/dev/null
   \`\`\`
3. **Log Examination**: Inspect \`/var/log/auth.log\` for failed authentication spikes.
4. **Remediation**: Correct insecure permissions with \`chmod\` and document findings.`,
            deepDive: {
              title: 'Evidence Preservation',
              content: 'In real-world incident response, investigators make bit-by-bit cryptographic disk images (`dd` or `ewf`) and compute SHA-256 hashes immediately to establish an unbroken Chain of Custody for legal admissibility.'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-lab-forensics',
            type: 'multiple-choice',
            question: 'Why do forensic investigators calculate SHA-256 hashes of disk images immediately upon acquisition?',
            options: [
              { id: 'a', text: 'To prove that the forensic copy has not been altered or tampered with at any point during analysis' },
              { id: 'b', text: 'To make the image smaller' },
              { id: 'c', text: 'To wipe the drive' },
              { id: 'd', text: 'To run the operating system' }
            ],
            correctAnswer: 'a',
            explanation: 'Cryptographic hashes establish mathematical proof of integrity for legal chain of custody.'
          }
        ],
        exercises: [
          {
            id: 'ex-lab-perm-audit',
            title: 'Perform Sandbox Audit',
            instruction: 'Jump into Lab 1 in the Labs section to locate the insecure configuration file with world-writable permissions.',
            explanation: 'Practical execution reinforces theoretical concepts.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-lab-2',
            type: 'multiple-choice',
            question: 'What command searches for files with octal permissions allowing anyone to write to them?',
            options: [
              { id: 'a', text: 'find / -type f -perm -0002' },
              { id: 'b', text: 'ls /all' },
              { id: 'c', text: 'chmod 777 /' },
              { id: 'd', text: 'grep write /' }
            ],
            correctAnswer: 'a',
            explanation: '`find` with `-perm -0002` checks for the others-write bit.'
          }
        ]
      }
    ]
  },
  {
    id: 'stage-7-advanced',
    number: 7,
    title: 'Advanced Security & Authorized Threat Analysis',
    shortTitle: 'Advanced Security',
    description: 'Master advanced security architecture inspired by professional authorized training: Linux kernel hardening (SUID, capabilities, SELinux), Active Directory Kerberos architecture, and SOC Incident Response.',
    difficulty: 'Expert',
    estimatedTime: '6–8 weeks (30–40 hours)',
    lessonCount: 3,
    iconName: 'Lock',
    lessons: [
      {
        id: 'adv-linux-hardening',
        stageId: 'stage-7-advanced',
        title: 'Advanced Linux Hardening: SUID, Capabilities & MAC',
        summary: 'Explore advanced Linux kernel privileges: the SUID/SGID bits (chmod 4755), Linux POSIX Capabilities (cap_net_bind_service), and Mandatory Access Control (SELinux/AppArmor).',
        difficulty: 'Advanced',
        estimatedMinutes: 50,
        prerequisites: ['Linux Permissions Masterclass: Octal Math & Symbolic Modes'],
        objectives: [
          'Understand special permission bits: SUID (4000), SGID (2000), and Sticky Bit (1000).',
          'Explain why SUID binaries (like /usr/bin/passwd) execute with file-owner privileges.',
          'Understand granular Linux Capabilities as an alternative to monolithic root privileges.',
          'Differentiate between Discretionary Access Control (DAC) and Mandatory Access Control (MAC).'
        ],
        sections: [
          {
            id: 'adv-suid',
            title: '1. SUID and SGID: The Special Permission Bits',
            content: `Normally, when a user executes a program, that program runs with the privileges of the *calling user*.

However, standard users sometimes need to perform an action requiring elevated rights—for example, changing their password in \`/etc/shadow\`.

Enter the **SUID (Set User ID)** bit:
* When a binary has SUID set (\`-rwsr-xr-x\`), whenever *anyone* executes it, the process runs with the privileges of the **file owner** (typically root)!
* Octal representation: \`chmod 4755 /path/to/binary\` (the leading 4 indicates SUID).
* **Security Risk**: If an SUID binary contains a vulnerability or misconfiguration, an attacker can leverage it to gain full root access!`,
            deepDive: {
              title: 'Linux Capabilities: Breaking Monolithic Root',
              content: 'Historically, a program either had UID 0 (root with all 40+ system powers) or non-root (no powers). Modern Linux divides root privileges into granular **Capabilities** (`man capabilities`). For example, `CAP_NET_BIND_SERVICE` allows a web server to bind to port 80/443 without needing any other root privileges!'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-suid-char',
            type: 'multiple-choice',
            question: 'In the permission string `-rwsr-xr-x`, what does the letter "s" in the owner section indicate?',
            options: [
              { id: 'a', text: 'The file is shared over Samba' },
              { id: 'b', text: 'The SUID (Set User ID) bit is active' },
              { id: 'c', text: 'The file is a script' },
              { id: 'd', text: 'The file is stopped' }
            ],
            correctAnswer: 'b',
            explanation: 'The "s" in place of "x" in the owner sphere denotes the SUID permission bit.'
          }
        ],
        exercises: [
          {
            id: 'ex-suid-find',
            title: 'Identify SUID Binaries',
            instruction: 'In a Linux terminal, how would you find all SUID binaries on the filesystem?',
            suggestedCommand: 'find / -perm -4000 -type f 2>/dev/null',
            explanation: 'Checks for the 4000 octal mask.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-adv-1',
            type: 'multiple-choice',
            question: 'What is the primary advantage of Linux Capabilities over granting full root SUID to a binary?',
            options: [
              { id: 'a', text: 'Capabilities follow Least Privilege by granting only the exact kernel power needed (e.g., binding port 80) rather than all 40+ root abilities' },
              { id: 'b', text: 'Capabilities make files smaller' },
              { id: 'c', text: 'Capabilities disable logging' },
              { id: 'd', text: 'Capabilities work without a kernel' }
            ],
            correctAnswer: 'a',
            explanation: 'Capabilities segment root privileges into fine-grained permissions.'
          }
        ]
      },
      {
        id: 'adv-active-directory-architecture',
        stageId: 'stage-7-advanced',
        title: 'Enterprise Architecture & Active Directory Security Concepts',
        summary: 'Understand enterprise identity architecture: Domain Controllers, LDAP directories, Group Policy, Kerberos authentication (TGT and TGS tickets), and how defenders monitor authentication anomalies.',
        difficulty: 'Expert',
        estimatedMinutes: 50,
        prerequisites: ['Core Principles: The CIA Triad, AAA & Threat Modeling'],
        objectives: [
          'Understand Microsoft Active Directory as the centralized enterprise identity backbone.',
          'Trace the Kerberos ticket-granting authentication flow: KDC, AS-REQ, TGT, TGS-REQ, and Service Tickets.',
          'Understand Group Policy Objects (GPO) and centralized configuration.',
          'Explain how Security Operations Centers (SOC) detect abnormal authentication behavior.'
        ],
        sections: [
          {
            id: 'ad-kerberos',
            title: '1. The Kerberos Authentication Flow',
            content: `In modern enterprise networks, passwords are never sent over the wire when accessing servers. Active Directory relies on **Kerberos tickets**:

1. **Authentication Service Request (AS-REQ)**: Client sends encrypted timestamp with their password hash to the Key Distribution Center (KDC).
2. **AS-REP**: KDC returns a **Ticket Granting Ticket (TGT)** encrypted with the secret KDC key (\`krbtgt\`).
3. **TGS-REQ**: When the user wants to access a file share or service, they present the TGT to the Ticket Granting Service.
4. **TGS-REP**: KDC issues a **Service Ticket** encrypted with the service account's password hash.
5. **AP-REQ**: Client presents the Service Ticket directly to the target server for instant access!`,
            deepDive: {
              title: 'Defending Active Directory',
              content: 'Enterprise defenders protect AD by enforcing Tiered Administration (Tier 0 Domain Controllers are isolated from workstation logons), monitoring Windows Event ID 4624 (logon) and 4769 (ticket requested), and enforcing Protected Users security groups.'
            }
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-ad-tgt',
            type: 'multiple-choice',
            question: 'In Kerberos authentication, what does TGT stand for?',
            options: [
              { id: 'a', text: 'Target Group Task' },
              { id: 'b', text: 'Ticket Granting Ticket' },
              { id: 'c', text: 'Total Guard Token' },
              { id: 'd', text: 'Terminal Gateway Transmission' }
            ],
            correctAnswer: 'b',
            explanation: 'The Ticket Granting Ticket is issued by the KDC upon initial successful authentication.'
          }
        ],
        exercises: [
          {
            id: 'ex-ad-concept',
            title: 'Trace Kerberos Ticket Lifecycle',
            instruction: 'Identify which ticket is presented when contacting an internal file server: the TGT or the Service Ticket?',
            explanation: 'The client presents the specific Service Ticket to the target application service.'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-adv-2',
            type: 'multiple-choice',
            question: 'Why is Tier 0 isolation enforced on Active Directory Domain Controllers?',
            options: [
              { id: 'a', text: 'To ensure Domain Admins never enter credentials on lower-tier workstations where credential caching/dumping attacks could compromise the entire domain' },
              { id: 'b', text: 'To speed up Ethernet transfers' },
              { id: 'c', text: 'To save license fees' },
              { id: 'd', text: 'Because Domain Controllers cannot connect to the internet' }
            ],
            correctAnswer: 'a',
            explanation: 'Tiered architecture prevents privileged credentials from being exposed on vulnerable endpoints.'
          }
        ]
      },
      {
        id: 'adv-soc-incident-response',
        stageId: 'stage-7-advanced',
        title: 'Incident Response, SOC Operations & Defense-in-Depth',
        summary: 'Step inside the Security Operations Center (SOC): the NIST Incident Response lifecycle (Preparation, Detection, Containment, Eradication, Recovery, Lessons Learned), SIEM telemetry, and MITRE ATT&CK mapping.',
        difficulty: 'Expert',
        estimatedMinutes: 50,
        prerequisites: ['Enterprise Architecture & Active Directory Security Concepts'],
        objectives: [
          'Master the 6 phases of the NIST SP 800-61 Incident Response Lifecycle.',
          'Understand Security Information and Event Management (SIEM) log correlation.',
          'Map adversary techniques to the MITRE ATT&CK enterprise matrix.',
          'Formulate containment strategies during active security incidents.'
        ],
        sections: [
          {
            id: 'soc-nist-lifecycle',
            title: '1. The NIST Incident Response Lifecycle',
            content: `When a breach or security anomaly occurs, professional SOC analysts follow the **NIST SP 800-61** standard:

1. **Preparation**: Hardening systems, configuring logging, deploying EDR, creating playbooks, and training staff.
2. **Detection & Analysis**: Identifying deviations from baseline using SIEM alerts, IDS signatures, and anomaly detection. Triage false positives.
3. **Containment**: Limiting impact (e.g., isolating infected host from VLAN, revoking compromised API keys) while preserving volatile RAM evidence.
4. **Eradication**: Removing malware, terminating unauthorized persistence mechanisms, and closing exploited entry vulnerabilities.
5. **Recovery**: Restoring systems from verified clean backups, testing services, and implementing enhanced monitoring.
6. **Lessons Learned**: Conducting a blameless post-mortem within 14 days to improve defenses and update playbooks!`,
            analogy: 'Incident response is like emergency trauma surgery: first you stop the bleeding (Containment), then remove the infection (Eradication), heal the patient (Recovery), and study what happened so it never reoccurs (Lessons Learned).'
          }
        ],
        interactiveQuestions: [
          {
            id: 'iq-soc-containment',
            type: 'multiple-choice',
            question: 'What is the immediate priority during the Containment phase of an active ransomware outbreak?',
            options: [
              { id: 'a', text: 'Reinstalling Windows on all machines immediately' },
              { id: 'b', text: 'Isolating compromised hosts from the network to prevent lateral movement while preserving evidence' },
              { id: 'c', text: 'Calling the news media' },
              { id: 'd', text: 'Paying the ransom' }
            ],
            correctAnswer: 'b',
            explanation: 'Network isolation stops propagation while preserving forensic memory state for analysis.'
          }
        ],
        exercises: [
          {
            id: 'ex-mitre-mapping',
            title: 'Explore MITRE ATT&CK Mapping',
            instruction: 'Consider an attacker who runs `whoami` and `net user`. Which MITRE ATT&CK tactic does this represent?',
            explanation: 'This represents Tactic: Discovery (Technique: T1033 System Owner/User Discovery).'
          }
        ],
        endOfLessonQuiz: [
          {
            id: 'quiz-adv-3',
            type: 'multiple-choice',
            question: 'Why is the "Lessons Learned" phase mandatory in professional incident response?',
            options: [
              { id: 'a', text: 'To update detection rules, patch systemic gaps, and prevent the identical vulnerability from being exploited again' },
              { id: 'b', text: 'To assign blame to employees' },
              { id: 'c', text: 'To delete all log files' },
              { id: 'd', text: 'To cancel insurance policies' }
            ],
            correctAnswer: 'a',
            explanation: 'Continuous learning converts incidents into long-term defensive resilience.'
          }
        ]
      }
    ]
  }
];
