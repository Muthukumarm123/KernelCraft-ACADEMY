import { SecurityLab } from '../types';

export const PRACTICAL_LABS: SecurityLab[] = [
  {
    id: 'lab-1-linux-permissions-audit',
    title: 'Lab 1: Linux Permissions & Configuration Audit',
    stage: 'Stage 2 & 6',
    difficulty: 'Beginner',
    category: 'Linux Hardening',
    objective: 'Audit a simulated server filesystem, locate a dangerously misconfigured world-writable file in /etc/security_audit, inspect it using stat, correct the permissions to secure mode, and recover the authorized audit verification token.',
    scenario: 'You are conducting a scheduled compliance audit on a Linux application server. An automated scanner warned that a sensitive configuration file has permissions allowing any standard user to overwrite it. You must locate the file, inspect its metadata, restrict permissions, and verify the fix.',
    backgroundKnowledge: 'Standard configuration files must be owned by root:root with maximum permissions of 644 (-rw-r--r--) or 640 (-rw-r-----). Any file with 777 (-rwxrwxrwx) or 666 (-rw-rw-rw-) allows arbitrary unprivileged accounts to tamper with system integrity.',
    tasks: [
      {
        id: 't1',
        instruction: 'Navigate to `/etc/security_audit` and list all files in detailed long format (`ls -la`).',
        hint: 'Run `cd /etc/security_audit && ls -la` in the terminal.',
        completed: false
      },
      {
        id: 't2',
        instruction: 'Identify the world-writable file `firewall_rules.conf` and inspect its inode, UID, and permissions with `stat firewall_rules.conf`.',
        hint: 'Notice Access is (0777/-rwxrwxrwx). This is severely insecure!',
        completed: false
      },
      {
        id: 't3',
        instruction: 'Harden the file by setting permissions so owner has read+write, group has read-only, and others have zero access (`chmod 640 firewall_rules.conf`).',
        hint: 'Run `chmod 640 firewall_rules.conf`.',
        completed: false
      },
      {
        id: 't4',
        instruction: 'Read the verification token from `cat audit_token.txt` and submit the flag below.',
        hint: 'Use `cat audit_token.txt`. Flag format is `FLAG{...}`.',
        completed: false
      }
    ],
    verificationFlag: 'FLAG{L1NUX_P3RM1SS10NS_AUD1T_P4SS3D}',
    solutionExplanation: 'By auditing /etc/security_audit, we observed that firewall_rules.conf had 0777 permissions. Using stat confirmed owner uid=0 and gid=0. Applying `chmod 640 firewall_rules.conf` removed group write privileges and all others access, restoring compliance with least privilege.',
    simulatedEnvironmentType: 'terminal',
    initialFiles: {
      '/etc/security_audit/firewall_rules.conf': '# Production Firewall Rules\nALLOW TCP 80,443\nDENY ALL',
      '/etc/security_audit/audit_token.txt': 'FLAG{L1NUX_P3RM1SS10NS_AUD1T_P4SS3D}'
    }
  },
  {
    id: 'lab-2-encoded-communications',
    title: 'Lab 2: Multi-Layer Encoded Communication Analyst',
    stage: 'Stage 5 & 6',
    difficulty: 'Beginner',
    category: 'Cryptography',
    objective: 'Decode a multi-layer intercepted transmission: convert a hexadecimal byte stream into ASCII, decode the resulting Base64 payload, and reverse a Caesar ROT13 substitution cipher to recover the authorized security key.',
    scenario: 'During an authorized network assessment, an unknown service responded with an encoded telemetry payload. The transmission is not encrypted with a secret key, but rather multi-layer encoded. As a security analyst, unpack each encoding layer systematically.',
    backgroundKnowledge: 'Encoding transforms data into another format for transport or storage (reversible without a key). Cryptographic encryption requires a secret key. Adversaries often chain encodings (Hex -> Base64 -> Rot13) to evade superficial signature filters.',
    tasks: [
      {
        id: 't1',
        instruction: 'Convert the raw hex stream: `546d39304e5746736231383058334a766444457a58334e6b61313930614756666133563563673d3d` into readable ASCII string.',
        hint: 'Notice each pair of hex digits (54, 6d, 39...) corresponds to an ASCII character. In the lab decoder below, use the Hex-to-Text tool.',
        completed: false
      },
      {
        id: 't2',
        instruction: 'The resulting string is Base64: `Tm90NWFsY180X3JvdD1zX3Nka190aGVfa3V5cg==`. Decode this Base64 string into plain text.',
        hint: 'Use the Base64 decoder tool below. The decoded string will look like ROT13 text.',
        completed: false
      },
      {
        id: 't3',
        instruction: 'Apply ROT13 (Caesar cipher shift of 13 letters) to the decoded string `No5alc_4_rot1s_sdk_the_kuyr` to reveal the plain message and submit the flag.',
        hint: 'A ROT13 shift transforms N->A, o->b, etc. Flag format: FLAG{...}.',
        completed: false
      }
    ],
    verificationFlag: 'FLAG{Ab5nyp_4_ebg1f_fqx_gur_xhlr}',
    solutionExplanation: 'We decoded Hex (base-16 byte pairs) to reveal the Base64 string. Decoding Base64 yielded the shifted text. Applying a 13-character Caesar rotation reversed the substitution cipher, recovering the authorized transmission token.',
    simulatedEnvironmentType: 'terminal'
  },
  {
    id: 'lab-3-packet-capture-analysis',
    title: 'Lab 3: Network Packet Capture & Cleartext Credential Hunter',
    stage: 'Stage 4 & 6',
    difficulty: 'Intermediate',
    category: 'Network Analysis',
    objective: 'Analyze an intercepted pcap packet stream log, detect unencrypted HTTP traffic over port 80, extract the Basic Authorization header, and demonstrate why HTTPS (TLS 1.3) is mandatory for data confidentiality.',
    scenario: 'An internal corporate network audit logged traffic from an employee workstation. A legacy internal portal was suspected of using unencrypted HTTP instead of HTTPS. Inspect the packet stream, locate the authentication transaction, and recover the cleartext credentials.',
    backgroundKnowledge: 'HTTP Basic Authentication sends credentials in the header as `Authorization: Basic <base64(user:pass)>`. Because Base64 is not encryption, anyone capturing packets on the local wire or Wi-Fi can decode the password in milliseconds. HTTPS encrypts the entire HTTP header and payload inside TLS.',
    tasks: [
      {
        id: 't1',
        instruction: 'Filter the packet stream for TCP destination port 80 (Cleartext HTTP).',
        hint: 'Look for Frame #14 in the packet table below.',
        completed: false
      },
      {
        id: 't2',
        instruction: 'Examine Frame #14: `POST /api/login HTTP/1.1`. Notice the header `Authorization: Basic YWRtaW5fc2VjdXJlOldlbGNvbWUyS2VybmVsQ3JhZnQh`.',
        hint: 'Base64 strings end in `=` or contain alphanumeric characters.',
        completed: false
      },
      {
        id: 't3',
        instruction: 'Decode the Base64 authorization token `YWRtaW5fc2VjdXJlOldlbGNvbWUyS2VybmVsQ3JhZnQh` into username:password format and submit the flag.',
        hint: 'Decoding yields `admin_secure:Welcome2KernelCraft!`. Enter flag: FLAG{admin_secure:Welcome2KernelCraft!}',
        completed: false
      }
    ],
    verificationFlag: 'FLAG{admin_secure:Welcome2KernelCraft!}',
    solutionExplanation: 'Analyzing Frame #14 showed unencrypted HTTP on port 80. The Basic Auth header contained base64-encoded credentials. Decoding revealed the admin password in seconds, proving why TLS encryption on port 443 is non-negotiable for enterprise networks.',
    simulatedEnvironmentType: 'packets'
  },
  {
    id: 'lab-4-idor-web-audit',
    title: 'Lab 4: Web Application IDOR & Authorization Audit',
    stage: 'Stage 5 & 6',
    difficulty: 'Intermediate',
    category: 'Web Security',
    objective: 'Audit a simulated REST API, identify an Insecure Direct Object Reference (IDOR) on /api/user/:id/invoice, test parameter tampering in a safe sandbox, and observe how server-side token validation mitigates the flaw.',
    scenario: 'You are reviewing an invoice viewing portal. When a user requests their invoice, the browser issues `GET /api/user/1042/invoice`. Can user 1042 view user 1001\'s invoice simply by editing the URL parameter? Investigate the simulated endpoint.',
    backgroundKnowledge: 'IDOR (Insecure Direct Object Reference), classified under OWASP A01: Broken Access Control, occurs when an application exposes a direct reference to an internal database key without verifying if the requesting session token has ownership rights.',
    tasks: [
      {
        id: 't1',
        instruction: 'Issue request to your assigned account: `GET /api/user/1042/invoice` with header `Authorization: Bearer student_token_1042`.',
        hint: 'Click "Send Request" in the API Inspector below.',
        completed: false
      },
      {
        id: 't2',
        instruction: 'Test parameter tampering: change the URL to `GET /api/user/1001/invoice` while keeping the same student bearer token.',
        hint: 'Notice the simulated vulnerable server returns user 1001\'s confidential invoice data!',
        completed: false
      },
      {
        id: 't3',
        instruction: 'Toggle "Enable Server-Side Authorization Check" to inspect the secure code pattern (`403 Forbidden`). Extract the verified audit flag from the response header.',
        hint: 'Flag format: FLAG{IDOR_AUTH_CHECK_PATCHED_2026}',
        completed: false
      }
    ],
    verificationFlag: 'FLAG{IDOR_AUTH_CHECK_PATCHED_2026}',
    solutionExplanation: 'User 1042 was able to retrieve user 1001\'s invoice because the backend queried `WHERE id = :id` without checking `AND user_id = :session_user_id`. Enabling strict authorization enforces 403 Forbidden when token ownership does not match target object IDs.',
    simulatedEnvironmentType: 'api-inspector'
  },
  {
    id: 'lab-5-incident-log-forensics',
    title: 'Lab 5: Server Incident Forensics & SSH Brute-Force Triage',
    stage: 'Stage 2 & 6',
    difficulty: 'Intermediate',
    category: 'Log Forensics',
    objective: 'Parse an extracted Linux `/var/log/auth.log` file, identify an automated SSH brute-force dictionary attack, calculate attacker attempt frequencies, isolate the offending IP address, and identify the compromised username.',
    scenario: 'The SOC received an alert for an anomalous spike in failed SSH logins. You are provided with a snapshot of `/var/log/auth.log`. You must isolate the malicious IP address, determine how many failed attempts occurred, and check whether any login ultimately succeeded.',
    backgroundKnowledge: 'Linux PAM logs authentication events to `/var/log/auth.log` (Debian/Ubuntu) or `/var/log/secure` (RHEL). Failed attempts log `Failed password for [user] from [IP] port [port] ssh2`. A spike of hundreds of failures followed by `Accepted password` indicates a successful credential compromise.',
    tasks: [
      {
        id: 't1',
        instruction: 'Search the log snapshot for `Failed password` entries using the interactive log parser below.',
        hint: 'Notice the repeated source IP `198.51.100.77` hitting accounts `root`, `admin`, `guest`, `service`.',
        completed: false
      },
      {
        id: 't2',
        instruction: 'Find the entry where the attacker finally succeeded (`Accepted password`).',
        hint: 'Look for line: `Accepted password for operator from 198.51.100.77 port 48212`.',
        completed: false
      },
      {
        id: 't3',
        instruction: 'Combine the attacking IP and the compromised username into the flag format: `FLAG{IP_USERNAME}` (e.g., `FLAG{198.51.100.77_operator}`).',
        hint: 'Submit `FLAG{198.51.100.77_operator}`.',
        completed: false
      }
    ],
    verificationFlag: 'FLAG{198.51.100.77_operator}',
    solutionExplanation: 'Log analysis revealed 142 failed login attempts from 198.51.100.77 targeting common administrative usernames. At 03:42:18 UTC, a login succeeded for the `operator` account, confirming account compromise that demands immediate credential revocation and fail2ban/firewall IP blocking.',
    simulatedEnvironmentType: 'logs'
  },
  {
    id: 'lab-6-defense-in-depth-audit',
    title: 'Lab 6: Multi-Stage Defense-in-Depth Investigation',
    stage: 'Stage 6 & 7',
    difficulty: 'Advanced',
    category: 'Multi-Stage Defense',
    objective: 'Perform an end-to-end authorized security assessment in a multi-stage environment: audit open network ports, analyze an internal service configuration, detect an insecure sudoers permission rule, and draft the remediation flag.',
    scenario: 'You are conducting a thorough defensive hardening review on a simulated staging environment. Trace through network configuration, process listings, file permissions, and privilege escalation configurations to identify and remediate defensive flaws.',
    backgroundKnowledge: 'Defense in depth requires ensuring that even if an attacker gains initial low-privilege access, strict least-privilege configurations (like restrictive `/etc/sudoers` rules and file ownership) prevent privilege escalation.',
    tasks: [
      {
        id: 't1',
        instruction: 'Check listening services with `netstat -tuln` or `ps aux` in the terminal.',
        hint: 'Notice an internal diagnostic daemon running on port 8088.',
        completed: false
      },
      {
        id: 't2',
        instruction: 'Inspect `/etc/sudoers.d/audit_rules` to examine what commands user `student` is permitted to run as root.',
        hint: 'Run `cat /etc/sudoers.d/audit_rules`. Notice: `student ALL=(ALL) NOPASSWD: /usr/bin/find`.',
        completed: false
      },
      {
        id: 't3',
        instruction: 'Explain why granting `NOPASSWD: /usr/bin/find` in sudoers is a high-risk misconfiguration.',
        hint: 'The `find` utility has an `-exec` parameter that can spawn a root shell: `sudo find . -exec /bin/sh \\; -quit`.',
        completed: false
      },
      {
        id: 't4',
        instruction: 'Submit the authorized defense audit flag from `/etc/security/flag.txt`.',
        hint: 'Run `cat /etc/security/flag.txt` to retrieve the flag.',
        completed: false
      }
    ],
    verificationFlag: 'FLAG{D3F3NS3_1N_D3PTH_AUD1T_C0MPL3T3}',
    solutionExplanation: 'We audited the system and discovered that /etc/sudoers.d/audit_rules granted unrestricted sudo access to /usr/bin/find. Because find features interactive execution flags (-exec), this allowed privilege escalation. The remediation is removing /usr/bin/find from sudoers and using dedicated restricted scripts with sudo.',
    simulatedEnvironmentType: 'terminal',
    initialFiles: {
      '/etc/sudoers.d/audit_rules': '# Insecure sudoers rule\nstudent ALL=(ALL) NOPASSWD: /usr/bin/find',
      '/etc/security/flag.txt': 'FLAG{D3F3NS3_1N_D3PTH_AUD1T_C0MPL3T3}'
    }
  }
];
