import React, { useState } from 'react';
import { PRACTICAL_LABS } from '../../data/labs';
import { SecurityLab } from '../../types';
import { LinuxTerminal } from '../terminal/LinuxTerminal';
import { FlaskConical, CheckCircle2, ShieldCheck, HelpCircle, ChevronRight, AlertTriangle, Key, Search, Send, Lock } from 'lucide-react';

interface PracticalLabsProps {
  completedLabIds: string[];
  onLabCompleted: (labId: string) => void;
}

export const PracticalLabs: React.FC<PracticalLabsProps> = ({ completedLabIds, onLabCompleted }) => {
  const [selectedLabId, setSelectedLabId] = useState<string>(PRACTICAL_LABS[0].id);
  const [flagInput, setFlagInput] = useState<string>('');
  const [flagStatus, setFlagStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showHintIndex, setShowHintIndex] = useState<number | null>(null);

  // Lab 2 State (Decoder tool)
  const [decoderInput, setDecoderInput] = useState<string>('546d39304e5746736231383058334a766444457a58334e6b61313930614756666133563563673d3d');
  const [decoderMode, setDecoderMode] = useState<'hex' | 'base64' | 'rot13'>('hex');
  const [decoderOutput, setDecoderOutput] = useState<string>('');

  // Lab 4 State (API Inspector)
  const [apiUrl, setApiUrl] = useState<string>('/api/user/1042/invoice');
  const [apiToken, setApiToken] = useState<string>('Bearer student_token_1042');
  const [apiAuthCheckEnabled, setApiAuthCheckEnabled] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<any>(null);

  // Lab 5 State (Log filter)
  const [logSearchQuery, setLogSearchQuery] = useState<string>('Failed password');

  const selectedLab = PRACTICAL_LABS.find(l => l.id === selectedLabId) || PRACTICAL_LABS[0];
  const isCompleted = completedLabIds.includes(selectedLab.id);

  const handleDecoderRun = () => {
    try {
      if (decoderMode === 'hex') {
        let str = '';
        for (let i = 0; i < decoderInput.length; i += 2) {
          str += String.fromCharCode(parseInt(decoderInput.substr(i, 2), 16));
        }
        setDecoderOutput(str);
      } else if (decoderMode === 'base64') {
        setDecoderOutput(atob(decoderInput));
      } else if (decoderMode === 'rot13') {
        const rot13 = (s: string) =>
          s.replace(/[a-zA-Z]/g, (c: string) => {
            const code = c.charCodeAt(0);
            const base = code >= 97 ? 97 : 65;
            return String.fromCharCode(((code - base + 13) % 26) + base);
          });
        setDecoderOutput(rot13(decoderInput));
      }
    } catch (e: any) {
      setDecoderOutput('Error decoding input: ' + e.message);
    }
  };

  const handleApiRequest = () => {
    const match = apiUrl.match(/\/api\/user\/(\d+)\/invoice/);
    const reqUserId = match ? match[1] : '1042';

    if (apiAuthCheckEnabled) {
      if (reqUserId !== '1042') {
        setApiResponse({
          status: 403,
          statusText: 'Forbidden',
          headers: {
            'x-security-policy': 'Strict-Ownership-Enforced',
            'x-verified-flag': 'FLAG{IDOR_AUTH_CHECK_PATCHED_2026}'
          },
          body: {
            error: 'Access Denied: Token principal (UID 1042) does not own resource (UID ' + reqUserId + ')'
          }
        });
        return;
      }
    }

    // Vulnerable response
    setApiResponse({
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type': 'application/json'
      },
      body: {
        invoiceId: `INV-2026-${reqUserId}`,
        userId: reqUserId,
        clientName: reqUserId === '1001' ? 'Executive Global Accounts' : 'KernelCraft Student Portal',
        amountDue: reqUserId === '1001' ? '$450,000.00' : '$0.00',
        confidentialContract: reqUserId === '1001' ? 'CONFIDENTIAL_CONTRACT_RECORD' : 'Standard Student Access'
      }
    });
  };

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (flagInput.trim() === selectedLab.verificationFlag) {
      setFlagStatus('correct');
      onLabCompleted(selectedLab.id);
    } else {
      setFlagStatus('incorrect');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">Authorized Practical Security Labs</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Safe, isolated educational environments designed to build hands-on defensive mastery. Investigate real misconfigurations, analyze logs, and extract verified audit flags.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400">Labs Completed:</span>
            <span className="px-2.5 py-1 bg-indigo-950 text-indigo-300 font-mono font-bold rounded border border-indigo-800">
              {completedLabIds.length} / {PRACTICAL_LABS.length}
            </span>
          </div>
        </div>

        {/* Labs selection pills */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800">
          {PRACTICAL_LABS.map(lab => {
            const done = completedLabIds.includes(lab.id);
            const active = lab.id === selectedLab.id;
            return (
              <button
                key={lab.id}
                onClick={() => {
                  setSelectedLabId(lab.id);
                  setFlagInput('');
                  setFlagStatus('idle');
                  setShowHintIndex(null);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/60'
                }`}
              >
                {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                <span>{lab.title.split(':')[0]}</span>
                <span className="text-[10px] text-slate-400 font-normal">({lab.category})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Lab Workspace */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-5">
        {/* Lab Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              <span>{selectedLab.stage}</span>
              <span>·</span>
              <span>{selectedLab.category}</span>
              <span>·</span>
              <span className="text-emerald-400">{selectedLab.difficulty}</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">{selectedLab.title}</h3>
          </div>

          {isCompleted && (
            <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Challenge Completed
            </span>
          )}
        </div>

        {/* Scenario & Objective */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-400" /> Operational Scenario
            </h4>
            <p className="text-slate-300 leading-relaxed">{selectedLab.scenario}</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-400" /> Lab Objective
            </h4>
            <p className="text-slate-300 leading-relaxed">{selectedLab.objective}</p>
          </div>
        </div>

        {/* Tasks Checklist */}
        <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
            Investigation Tasks & Checkpoints:
          </h4>
          <div className="space-y-2.5">
            {selectedLab.tasks.map((task, idx) => (
              <div key={task.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-200 leading-relaxed">{task.instruction}</span>
                  </div>

                  <button
                    onClick={() => setShowHintIndex(showHintIndex === idx ? null : idx)}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 shrink-0 font-medium"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    {showHintIndex === idx ? 'Hide Hint' : 'Hint'}
                  </button>
                </div>

                {showHintIndex === idx && (
                  <div className="mt-2.5 pt-2 border-t border-slate-800 text-slate-400 text-[11px] bg-slate-950/60 p-2 rounded italic">
                    💡 <strong>Hint:</strong> {task.hint}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Simulated Environment Tool Container */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Integrated Authorized Sandbox Tooling:
          </h4>

          {/* Render Terminal for Terminal Labs */}
          {(selectedLab.simulatedEnvironmentType === 'terminal' || selectedLab.id === 'lab-1-linux-permissions-audit' || selectedLab.id === 'lab-6-defense-in-depth-audit') && (
            <LinuxTerminal
              initialWorkingDir={selectedLab.id === 'lab-1-linux-permissions-audit' ? '/etc/security_audit' : '/home/student'}
            />
          )}

          {/* Render Decoder for Lab 2 */}
          {selectedLab.id === 'lab-2-encoded-communications' && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-slate-300 font-bold uppercase tracking-wider">Multi-Layer Encoding Workbench</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setDecoderMode('hex')}
                    className={`px-2.5 py-1 rounded text-[11px] ${decoderMode === 'hex' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    1. Hex to ASCII
                  </button>
                  <button
                    onClick={() => setDecoderMode('base64')}
                    className={`px-2.5 py-1 rounded text-[11px] ${decoderMode === 'base64' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    2. Base64 Decode
                  </button>
                  <button
                    onClick={() => setDecoderMode('rot13')}
                    className={`px-2.5 py-1 rounded text-[11px] ${decoderMode === 'rot13' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    3. ROT13 Caesar
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Payload Input:</label>
                <textarea
                  rows={2}
                  value={decoderInput}
                  onChange={e => setDecoderInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecoderRun}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-sans font-semibold text-xs"
                >
                  Execute Decode Operation
                </button>
                {decoderOutput && (
                  <button
                    onClick={() => setDecoderInput(decoderOutput)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-sans text-xs border border-slate-700"
                  >
                    Use Output as Next Input
                  </button>
                )}
              </div>

              {decoderOutput && (
                <div className="mt-3 p-3 bg-slate-900 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Decoded Output:</div>
                  <div className="text-emerald-400 font-bold break-all">{decoderOutput}</div>
                </div>
              )}
            </div>
          )}

          {/* Render Packet Capture Inspector for Lab 3 */}
          {selectedLab.id === 'lab-3-packet-capture-analysis' && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-3">
              <div className="flex justify-between items-center text-slate-400">
                <span className="font-bold text-white">Live Packet Stream Inspection (auth_stream.pcap)</span>
                <span className="text-[11px] text-slate-500">15 Captured Packets</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                      <th className="py-1 px-2">#</th>
                      <th className="py-1 px-2">Source IP</th>
                      <th className="py-1 px-2">Dest IP</th>
                      <th className="py-1 px-2">Proto</th>
                      <th className="py-1 px-2">Info</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr className="hover:bg-slate-900/60">
                      <td className="py-1 px-2 text-slate-500">1</td>
                      <td className="py-1 px-2">192.168.1.50</td>
                      <td className="py-1 px-2">1.1.1.1</td>
                      <td className="py-1 px-2 text-sky-400">DNS</td>
                      <td className="py-1 px-2">Standard query 0x12a A legacy-portal.internal</td>
                    </tr>
                    <tr className="hover:bg-slate-900/60">
                      <td className="py-1 px-2 text-slate-500">2</td>
                      <td className="py-1 px-2">1.1.1.1</td>
                      <td className="py-1 px-2">192.168.1.50</td>
                      <td className="py-1 px-2 text-sky-400">DNS</td>
                      <td className="py-1 px-2">Standard query response A 10.0.5.12</td>
                    </tr>
                    <tr className="hover:bg-slate-900/60">
                      <td className="py-1 px-2 text-slate-500">3</td>
                      <td className="py-1 px-2">192.168.1.50</td>
                      <td className="py-1 px-2">10.0.5.12</td>
                      <td className="py-1 px-2 text-indigo-400">TCP</td>
                      <td className="py-1 px-2">54320 → 80 [SYN] Seq=0 Win=64240</td>
                    </tr>
                    <tr className="bg-amber-950/30 border border-amber-800/60">
                      <td className="py-1 px-2 text-amber-400 font-bold">14</td>
                      <td className="py-1 px-2">192.168.1.50</td>
                      <td className="py-1 px-2">10.0.5.12</td>
                      <td className="py-1 px-2 text-rose-400 font-bold">HTTP</td>
                      <td className="py-1 px-2 text-amber-200">
                        POST /api/login HTTP/1.1 (Authorization: Basic YWRtaW5fc2VjdXJlOldlbGNvbWUyS2VybmVsQ3JhZnQh)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Render API Inspector for Lab 4 */}
          {selectedLab.id === 'lab-4-idor-web-audit' && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <span className="font-bold text-white font-sans">Simulated REST API Client</span>
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-sans">
                  <input
                    type="checkbox"
                    checked={apiAuthCheckEnabled}
                    onChange={e => setApiAuthCheckEnabled(e.target.checked)}
                    className="accent-indigo-500 w-4 h-4 rounded"
                  />
                  <span>Enable Server-Side Authorization Check</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-emerald-950 text-emerald-400 font-bold rounded">GET</span>
                <input
                  type="text"
                  value={apiUrl}
                  onChange={e => setApiUrl(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white text-xs"
                />
                <button
                  onClick={handleApiRequest}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-sans font-semibold flex items-center gap-1"
                >
                  <Send className="w-3 h-3" /> Send
                </button>
              </div>

              {apiResponse && (
                <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Status:</span>
                    <span className={`font-bold ${apiResponse.status === 200 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {apiResponse.status} {apiResponse.statusText}
                    </span>
                  </div>
                  {apiResponse.headers['x-verified-flag'] && (
                    <div className="p-2 bg-emerald-950/60 border border-emerald-800 rounded text-emerald-300 font-bold">
                      Flag: {apiResponse.headers['x-verified-flag']}
                    </div>
                  )}
                  <pre className="text-slate-300 whitespace-pre-wrap text-[11px]">
                    {JSON.stringify(apiResponse.body, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Render Log Forensics Parser for Lab 5 */}
          {selectedLab.id === 'lab-5-incident-log-forensics' && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <span className="font-bold text-white font-sans">/var/log/auth.log Forensics Triage</span>
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={logSearchQuery}
                    onChange={e => setLogSearchQuery(e.target.value)}
                    placeholder="Search pattern..."
                    className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-white text-xs"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded border border-slate-800 max-h-48 overflow-y-auto space-y-1 text-slate-300 text-[11px]">
                <div className="text-slate-500">Oct 09 03:30:10 srv sshd[1419]: pam_unix(sshd:auth): check pass; user unknown</div>
                <div className="text-rose-400">Oct 09 03:30:12 srv sshd[1420]: Failed password for invalid user admin from 198.51.100.77 port 44102 ssh2</div>
                <div className="text-rose-400">Oct 09 03:30:15 srv sshd[1422]: Failed password for root from 198.51.100.77 port 44108 ssh2</div>
                <div className="text-rose-400">Oct 09 03:30:18 srv sshd[1425]: Failed password for service from 198.51.100.77 port 44115 ssh2</div>
                <div className="text-slate-500">[... 138 identical failed authentication lines from 198.51.100.77 ...]</div>
                <div className="text-emerald-400 font-bold bg-emerald-950/40 p-1 rounded border border-emerald-800/60">
                  Oct 09 03:42:18 srv sshd[1580]: Accepted password for operator from 198.51.100.77 port 48212 ssh2
                </div>
                <div className="text-amber-300">Oct 09 03:42:19 srv sshd[1580]: pam_unix(sshd:session): session opened for user operator by (uid=0)</div>
              </div>
            </div>
          )}
        </div>

        {/* Verification Flag Submission Box */}
        <div className="bg-slate-950 border border-indigo-900/40 rounded-xl p-4">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-400" />
            Submit Verification Token / Flag:
          </h4>

          <form onSubmit={handleFlagSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={flagInput}
              onChange={e => setFlagInput(e.target.value)}
              placeholder="FLAG{...}"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 font-mono text-white text-xs focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs transition-colors shrink-0"
            >
              Verify & Complete Lab
            </button>
          </form>

          {flagStatus === 'correct' && (
            <div className="mt-3 p-3 bg-emerald-950/80 border border-emerald-800 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Flag Verified!</strong> Excellent work. You successfully completed this practical challenge.
              </span>
            </div>
          )}

          {flagStatus === 'incorrect' && (
            <div className="mt-3 p-3 bg-rose-950/80 border border-rose-800 rounded-lg text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong>Incorrect Token.</strong> Recheck the hint and verify the exact token syntax (format: <code>FLAG&#123;...&#125;</code>).
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
