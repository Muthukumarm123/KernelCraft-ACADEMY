import React, { useState } from 'react';
import { Globe, ArrowRight, ArrowLeft, Play, Pause, RotateCcw, CheckCircle2, ShieldCheck } from 'lucide-react';

interface JourneyStep {
  title: string;
  layer: string;
  protocol: string;
  actorSource: string;
  actorDestination: string;
  summary: string;
  technicalDetails: string;
  headers: { [key: string]: string };
}

export const PacketJourneySimulator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const steps: JourneyStep[] = [
    {
      title: 'Step 1: Browser Cache & OS Resolver Check',
      layer: 'Layer 7 (Application) & OS Subsystem',
      protocol: 'Internal IPC / /etc/hosts',
      actorSource: 'Web Browser',
      actorDestination: 'OS Network Stack',
      summary: 'The browser checks its in-memory DNS cache. If expired or missing, it queries the OS resolver (which consults /etc/hosts and getaddrinfo).',
      technicalDetails: 'To avoid unnecessary network latency, browsers cache DNS responses for TTL (Time To Live) durations. Finding no record, the OS socket library prepares a UDP DNS request.',
      headers: {
        'Lookup Query': 'example.com',
        'Cache Status': 'MISS (Expired or not found)',
        'Local File Checked': '/etc/hosts'
      }
    },
    {
      title: 'Step 2: Recursive DNS Resolution Hierarchy',
      layer: 'Layer 7 (Application) / Layer 4 (UDP Port 53)',
      protocol: 'DNS (Domain Name System)',
      actorSource: 'Client Resolver',
      actorDestination: 'Recursive Resolver (1.1.1.1) → Root (.) → TLD (.com) → Authoritative',
      summary: 'The recursive resolver queries the global DNS hierarchy: Root Name Server (.) → .com TLD Server → Authoritative Server for example.com.',
      technicalDetails: 'The authoritative server returns the final A record: 93.184.216.34 with a TTL of 3600 seconds. The client stores this in memory.',
      headers: {
        'DNS Query': 'IN A example.com',
        'Protocol Transport': 'UDP Source Port 53210 → Dest Port 53',
        'Returned A Record': '93.184.216.34',
        'TTL': '3600 seconds'
      }
    },
    {
      title: 'Step 3: ARP Resolution for Default Gateway',
      layer: 'Layer 2 (Data Link) / Layer 3 (Network)',
      protocol: 'ARP (Address Resolution Protocol)',
      actorSource: 'Workstation Network Card (NIC)',
      actorDestination: 'Local Gateway Router (192.168.1.1)',
      summary: 'Because 93.184.216.34 is outside the local subnet (/24), the packet must be sent to the default router. The host sends an ARP broadcast to discover the router\'s physical MAC address.',
      technicalDetails: 'Ethernet broadcasts "Who has 192.168.1.1? Tell 192.168.1.50". The router responds with its hardware MAC address (00:1A:2B:3C:4D:5E), stored in the local ARP table (`arp -a`).',
      headers: {
        'Ethernet Source MAC': 'A4:BB:6D:11:22:33 (Client NIC)',
        'Ethernet Dest MAC': '00:1A:2B:3C:4D:5E (Router Gateway)',
        'Opcode': 'ARP Reply (2)'
      }
    },
    {
      title: 'Step 4: TCP 3-Way Handshake Connection',
      layer: 'Layer 4 (Transport)',
      protocol: 'TCP (Transmission Control Protocol)',
      actorSource: 'Client (192.168.1.50:54321)',
      actorDestination: 'Web Server (93.184.216.34:443)',
      summary: 'Client and web server exchange SYN → SYN-ACK → ACK to establish an in-order, reliable transport connection on HTTPS port 443.',
      technicalDetails: 'Client sends SYN (Seq=1000). Server returns SYN-ACK (Seq=5000, Ack=1001). Client sends ACK (Seq=1001, Ack=5001). The socket status transitions to ESTABLISHED.',
      headers: {
        'Packet 1': 'SYN [Seq=1000, Window=64240]',
        'Packet 2': 'SYN, ACK [Seq=5000, Ack=1001]',
        'Packet 3': 'ACK [Seq=1001, Ack=5001]',
        'Socket State': 'ESTABLISHED'
      }
    },
    {
      title: 'Step 5: TLS 1.3 Cryptographic Handshake',
      layer: 'Layer 6 (Presentation) / TLS Security',
      protocol: 'TLS 1.3 (Transport Layer Security)',
      actorSource: 'Client TLS Engine',
      actorDestination: 'Server TLS Engine',
      summary: 'Client and server perform ephemeral Elliptic Curve Diffie-Hellman key exchange (ECDHE) and verify the server\'s digital X.509 certificate.',
      technicalDetails: 'Client sends ClientHello with supported ciphers and key share. Server returns ServerHello, X.509 Certificate signed by a trusted CA, and Finished. Both compute matching AES-256-GCM symmetric session keys.',
      headers: {
        'Handshake': 'TLS 1.3 1-RTT Key Exchange',
        'Cipher Suite': 'TLS_AES_256_GCM_SHA384',
        'Key Exchange': 'ECDHE (X25519)',
        'Certificate Verification': 'Valid CA Root Chain (DigiCert)'
      }
    },
    {
      title: 'Step 6: Encrypted HTTP/2 Request & Server 200 OK',
      layer: 'Layer 7 (Application)',
      protocol: 'HTTP/2 over TLS',
      actorSource: 'Client HTTP Client',
      actorDestination: 'Server Nginx Daemon',
      summary: 'The client sends an encrypted HTTP GET request. The web server evaluates request routes and streams back the HTML document with HTTP 200 OK.',
      technicalDetails: 'The plaintext HTTP request payload is sealed using the symmetric AES session key, wrapped into TCP segments, and transmitted. Server decrypts, parses, and sends the response payload.',
      headers: {
        ':method': 'GET',
        ':path': '/',
        ':scheme': 'https',
        ':status': '200 OK',
        'content-type': 'text/html; charset=UTF-8',
        'strict-transport-security': 'max-age=31536000; includeSubDomains'
      }
    },
    {
      title: 'Step 7: Browser DOM Parsing & Critical Rendering Path',
      layer: 'Application Presentation',
      protocol: 'HTML5 / CSSOM / JavaScript',
      actorSource: 'Browser Rendering Engine (Blink/Gecko)',
      actorDestination: 'User Display Screen',
      summary: 'The browser receives the HTML byte stream, parses tokens to build the DOM tree, fetches external CSS and JavaScript, builds the Render Tree, paints pixels to the screen.',
      technicalDetails: 'The rendering engine parses HTML tokens, generates the Document Object Model (DOM), constructs the CSS Object Model (CSSOM), runs layout calculations, and composites frames at 60fps to the GPU.',
      headers: {
        'Status': 'Page Fully Rendered',
        'DOM Nodes Created': '42 nodes',
        'Security Lock': 'Encrypted Connection Verified'
      }
    }
  ];

  const current = steps[currentStep];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 my-6 text-slate-200 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-sky-400" />
            Interactive Web Request Journey: https://example.com
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Trace the complete microsecond journey from keyboard Enter through DNS, ARP, TCP, TLS, to browser rendering.
          </p>
        </div>

        {/* Stepper Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-semibold text-slate-200 rounded border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Previous
          </button>
          <button
            onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-30 text-xs font-semibold text-white rounded transition-colors"
          >
            Next Stage <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentStep(0)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress timeline dots */}
      <div className="my-5 flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-800 -z-0" />
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentStep(idx)}
            className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
              idx === currentStep
                ? 'bg-sky-500 text-slate-950 ring-4 ring-sky-500/30'
                : idx < currentStep
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Main step content card */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
          <div>
            <span className="text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider block">
              {current.layer} · Protocol: {current.protocol}
            </span>
            <h4 className="text-base font-bold text-white mt-0.5">{current.title}</h4>
          </div>

          <div className="text-right text-xs">
            <span className="text-slate-400">Data Flow: </span>
            <span className="font-mono text-indigo-300">{current.actorSource}</span>
            <span className="text-slate-500 mx-1">→</span>
            <span className="font-mono text-emerald-300">{current.actorDestination}</span>
          </div>
        </div>

        {/* Narrative & Technical Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div>
            <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              What Happens Conceptually:
            </h5>
            <p className="text-sm text-slate-200 leading-relaxed">
              {current.summary}
            </p>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Internal Technical Mechanics:
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded border border-slate-800">
              {current.technicalDetails}
            </p>
          </div>
        </div>

        {/* Packet Inspector Table */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="text-xs font-mono font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            Packet Header & Wire Telemetry Inspector:
          </div>
          <div className="bg-slate-900 rounded border border-slate-800 p-3 font-mono text-xs space-y-1">
            {Object.entries(current.headers).map(([key, value]) => (
              <div key={key} className="flex flex-wrap items-center justify-between gap-2 py-0.5 border-b border-slate-800/50 last:border-0">
                <span className="text-slate-400">{key}:</span>
                <span className="text-sky-300 font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
