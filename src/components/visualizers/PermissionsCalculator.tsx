import React, { useState } from 'react';
import { Copy, Check, Info, ShieldCheck, RefreshCw } from 'lucide-react';

interface SpherePerms {
  r: boolean;
  w: boolean;
  x: boolean;
}

export const PermissionsCalculator: React.FC = () => {
  const [owner, setOwner] = useState<SpherePerms>({ r: true, w: true, x: true });
  const [group, setGroup] = useState<SpherePerms>({ r: true, w: false, x: true });
  const [others, setOthers] = useState<SpherePerms>({ r: true, w: false, x: true });
  const [isDir, setIsDir] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Challenge test state
  const [targetOctal, setTargetOctal] = useState<string>('640');
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);

  const calcDigit = (p: SpherePerms) => (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);
  const octal = `${calcDigit(owner)}${calcDigit(group)}${calcDigit(others)}`;

  const toSymbolic = (p: SpherePerms) => `${p.r ? 'r' : '-'}${p.w ? 'w' : '-'}${p.x ? 'x' : '-'}`;
  const symbolic = `${isDir ? 'd' : '-'}${toSymbolic(owner)}${toSymbolic(group)}${toSymbolic(others)}`;

  const command = `chmod ${octal} ${isDir ? 'directory/' : 'filename'}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setPreset = (o: number, g: number, ot: number, dir = false) => {
    const parse = (num: number): SpherePerms => ({
      r: (num & 4) !== 0,
      w: (num & 2) !== 0,
      x: (num & 1) !== 0,
    });
    setOwner(parse(o));
    setGroup(parse(g));
    setOthers(parse(ot));
    setIsDir(dir);
  };

  const checkChallenge = () => {
    if (octal === targetOctal) {
      setChallengeFeedback('✅ Perfect! Your permission bits match the target requirement.');
    } else {
      setChallengeFeedback(`❌ Current octal is ${octal}, but target is ${targetOctal}. Review the 4 (r), 2 (w), 1 (x) math.`);
    }
  };

  const generateNewChallenge = () => {
    const presets = ['640', '750', '600', '755', '644', '700', '400'];
    const filtered = presets.filter(p => p !== targetOctal);
    const next = filtered[Math.floor(Math.random() * filtered.length)];
    setTargetOctal(next);
    setChallengeFeedback(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 my-6 text-slate-200 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Interactive Linux Permissions & Octal Calculator
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Toggle bits to see real-time octal math, symbolic representations, and directory behavior.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-lg text-xs">
          <button
            onClick={() => setIsDir(false)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${!isDir ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Regular File (-)
          </button>
          <button
            onClick={() => setIsDir(true)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${isDir ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Directory (d)
          </button>
        </div>
      </div>

      {/* Main calculation matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
        {/* Owner Sphere */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-amber-400">Owner (User / u)</span>
            <span className="text-xs font-mono bg-slate-900 px-2 py-0.5 rounded text-amber-300 font-bold">
              Digit: {calcDigit(owner)}
            </span>
          </div>
          <div className="space-y-2">
            <label className="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded hover:bg-slate-700/40">
              <span>Read (r = 4)</span>
              <input
                type="checkbox"
                checked={owner.r}
                onChange={e => setOwner({ ...owner, r: e.target.checked })}
                className="w-4 h-4 accent-amber-500 rounded"
              />
            </label>
            <label className="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded hover:bg-slate-700/40">
              <span>Write (w = 2)</span>
              <input
                type="checkbox"
                checked={owner.w}
                onChange={e => setOwner({ ...owner, w: e.target.checked })}
                className="w-4 h-4 accent-amber-500 rounded"
              />
            </label>
            <label className="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded hover:bg-slate-700/40">
              <span>Execute (x = 1)</span>
              <input
                type="checkbox"
                checked={owner.x}
                onChange={e => setOwner({ ...owner, x: e.target.checked })}
                className="w-4 h-4 accent-amber-500 rounded"
              />
            </label>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-700/50 text-[11px] text-slate-400 font-mono">
            Symbolic: {toSymbolic(owner)}
          </div>
        </div>

        {/* Group Sphere */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-sky-400">Group (g)</span>
            <span className="text-xs font-mono bg-slate-900 px-2 py-0.5 rounded text-sky-300 font-bold">
              Digit: {calcDigit(group)}
            </span>
          </div>
          <div className="space-y-2">
            <label className="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded hover:bg-slate-700/40">
              <span>Read (r = 4)</span>
              <input
                type="checkbox"
                checked={group.r}
                onChange={e => setGroup({ ...group, r: e.target.checked })}
                className="w-4 h-4 accent-sky-500 rounded"
              />
            </label>
            <label className="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded hover:bg-slate-700/40">
              <span>Write (w = 2)</span>
              <input
                type="checkbox"
                checked={group.w}
                onChange={e => setGroup({ ...group, w: e.target.checked })}
                className="w-4 h-4 accent-sky-500 rounded"
              />
            </label>
            <label className="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded hover:bg-slate-700/40">
              <span>Execute (x = 1)</span>
              <input
                type="checkbox"
                checked={group.x}
                onChange={e => setGroup({ ...group, x: e.target.checked })}
                className="w-4 h-4 accent-sky-500 rounded"
              />
            </label>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-700/50 text-[11px] text-slate-400 font-mono">
            Symbolic: {toSymbolic(group)}
          </div>
        </div>

        {/* Others Sphere */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-rose-400">Others (o)</span>
            <span className="text-xs font-mono bg-slate-900 px-2 py-0.5 rounded text-rose-300 font-bold">
              Digit: {calcDigit(others)}
            </span>
          </div>
          <div className="space-y-2">
            <label className="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded hover:bg-slate-700/40">
              <span>Read (r = 4)</span>
              <input
                type="checkbox"
                checked={others.r}
                onChange={e => setOthers({ ...others, r: e.target.checked })}
                className="w-4 h-4 accent-rose-500 rounded"
              />
            </label>
            <label className="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded hover:bg-slate-700/40">
              <span>Write (w = 2)</span>
              <input
                type="checkbox"
                checked={others.w}
                onChange={e => setOthers({ ...others, w: e.target.checked })}
                className="w-4 h-4 accent-rose-500 rounded"
              />
            </label>
            <label className="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded hover:bg-slate-700/40">
              <span>Execute (x = 1)</span>
              <input
                type="checkbox"
                checked={others.x}
                onChange={e => setOthers({ ...others, x: e.target.checked })}
                className="w-4 h-4 accent-rose-500 rounded"
              />
            </label>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-700/50 text-[11px] text-slate-400 font-mono">
            Symbolic: {toSymbolic(others)}
          </div>
        </div>
      </div>

      {/* Result Display Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left items-center">
          <div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wider">Octal Mode</div>
            <div className="text-2xl font-bold text-emerald-400 mt-0.5">{octal}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wider">Symbolic String</div>
            <div className="text-2xl font-bold text-sky-400 mt-0.5 tracking-wider">{symbolic}</div>
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs transition-colors border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Command!' : 'Copy Command'}
            </button>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Simulated ls -l line:</span>
          <span className="text-slate-300 font-mono">
            {symbolic} 1 student student 4096 Oct 09 12:00 {isDir ? 'directory/' : 'filename'}
          </span>
        </div>
      </div>

      {/* Common Presets */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400">Presets:</span>
        <button
          onClick={() => setPreset(7, 5, 5, false)}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700"
        >
          755 (Exec Script)
        </button>
        <button
          onClick={() => setPreset(6, 4, 4, false)}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700"
        >
          644 (Standard File)
        </button>
        <button
          onClick={() => setPreset(7, 0, 0, false)}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700"
        >
          700 (Private Exec)
        </button>
        <button
          onClick={() => setPreset(6, 0, 0, false)}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700"
        >
          600 (SSH Private Key)
        </button>
        <button
          onClick={() => setPreset(7, 5, 5, true)}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700"
        >
          755 Directory (Traversable)
        </button>
      </div>

      {/* Explanation Callout */}
      <div className="mt-4 p-3 bg-slate-800/40 rounded-lg border border-slate-700/50 flex items-start gap-2 text-xs text-slate-300">
        <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <div>
          {isDir ? (
            <p>
              <strong>Directory Mode Notice:</strong> Execute (<code>x</code>) on a directory means <em>traversal</em> permission. Without <code>x</code>, users cannot <code>cd</code> into this folder or access any files inside, even if they know their names! Read (<code>r</code>) controls whether <code>ls</code> can list names.
            </p>
          ) : (
            <p>
              <strong>File Mode Notice:</strong> Execute (<code>x</code>) allows the file to be executed as an application or shell script. Notice that modifying file data requires write (<code>w</code>), but <em>deleting</em> the file is controlled by permissions on its parent folder!
            </p>
          )}
        </div>
      </div>

      {/* Mini Challenge Section */}
      <div className="mt-4 p-4 bg-slate-950/80 rounded-lg border border-indigo-900/40">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-indigo-300">Target Challenge: Configure chmod {targetOctal}</span>
          <button
            onClick={generateNewChallenge}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
          >
            <RefreshCw className="w-3 h-3" /> New Target
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Adjust the checkboxes above until the Octal Mode matches <strong>{targetOctal}</strong>, then click Check:
        </p>
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={checkChallenge}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold"
          >
            Verify My Configuration
          </button>
          {challengeFeedback && (
            <span className="text-xs font-medium text-slate-200">{challengeFeedback}</span>
          )}
        </div>
      </div>
    </div>
  );
};
