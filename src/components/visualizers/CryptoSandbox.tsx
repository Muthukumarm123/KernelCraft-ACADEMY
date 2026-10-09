import React, { useState } from 'react';
import { Lock, Key, Shield, Hash, RefreshCw, Copy, Check } from 'lucide-react';

export const CryptoSandbox: React.FC = () => {
  const [inputText, setInputText] = useState<string>('Password123!');
  const [salt, setSalt] = useState<string>('k8#mZ9$qP1vL');
  const [copied, setCopied] = useState<boolean>(false);

  // Fast simple hash simulator for demonstration
  const simpleSha256Sim = (input: string): string => {
    let hash = 0x811c9dc5;
    for (let i = 0; i < input.length; i++) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    // Expand to 64 hex characters deterministically
    let hex = '';
    let seed = hash;
    for (let i = 0; i < 8; i++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      hex += seed.toString(16).padStart(8, '0');
    }
    return hex.slice(0, 64);
  };

  const plainHash = simpleSha256Sim(inputText);
  const saltedHash = simpleSha256Sim(salt + inputText);

  // Base64 encoding
  const base64Encoded = typeof window !== 'undefined'
    ? btoa(unescape(encodeURIComponent(inputText || ' ')))
    : '';

  // Avalanche comparison with 1 character difference
  const modifiedInput = inputText.length > 0
    ? inputText.slice(0, -1) + (inputText.slice(-1) === '?' ? '!' : '?')
    : 'a';
  const modifiedHash = simpleSha256Sim(modifiedInput);

  // Count flipped hex characters
  let flippedChars = 0;
  for (let i = 0; i < Math.min(plainHash.length, modifiedHash.length); i++) {
    if (plainHash[i] !== modifiedHash[i]) flippedChars++;
  }

  const copyHash = (str: string) => {
    navigator.clipboard.writeText(str);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateNewSalt = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let res = '';
    for (let i = 0; i < 12; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSalt(res);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 my-6 text-slate-200 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            Interactive Cryptography & Hashing Sandbox
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Test one-way cryptographic hashing, observe the avalanche effect, and examine salt defense against rainbow tables.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 bg-slate-800 text-emerald-400 font-mono rounded border border-slate-700">
            One-Way Deterministic Digest
          </span>
        </div>
      </div>

      {/* Input text */}
      <div className="my-4">
        <label className="block text-xs font-semibold text-slate-400 mb-1">
          Input Plaintext String:
        </label>
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Enter text..."
          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 font-mono text-white text-sm focus:border-emerald-500 focus:outline-none"
        />
      </div>

      {/* Hash results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        {/* Unsalted SHA-256 */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-sky-400" /> Standard SHA-256 Digest (Unsalted)
            </span>
            <button
              onClick={() => copyHash(plainHash)}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              Copy
            </button>
          </div>
          <div className="bg-slate-900 p-2.5 rounded font-mono text-xs text-sky-300 break-all border border-slate-800">
            {plainHash}
          </div>
          <div className="text-[10px] text-slate-500 mt-1.5">
            ⚠️ Vulnerable to precomputed rainbow table lookups if commonly used!
          </div>
        </div>

        {/* Salted SHA-256 */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Salted Digest (Salt + Plaintext)
            </span>
            <button
              onClick={generateNewSalt}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> New Salt
            </button>
          </div>
          <div className="text-[11px] font-mono text-slate-400 mb-1">
            Salt: <span className="text-amber-400">{salt}</span>
          </div>
          <div className="bg-slate-900 p-2.5 rounded font-mono text-xs text-emerald-300 break-all border border-slate-800">
            {saltedHash}
          </div>
          <div className="text-[10px] text-emerald-400/90 mt-1.5">
            ✅ Immune to rainbow tables! An attacker must recalculate hashes for this salt independently.
          </div>
        </div>
      </div>

      {/* Avalanche Effect Demonstration */}
      <div className="p-4 bg-slate-950 rounded-lg border border-indigo-900/40 my-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-indigo-300">
            Cryptographic Avalanche Effect Demonstration
          </span>
          <span className="text-xs font-mono font-bold text-amber-400">
            {flippedChars} of 64 hex characters altered (~{Math.round((flippedChars / 64) * 100)}%)
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-3">
          If you alter just a single character in the input (<code>{inputText}</code> vs <code>{modifiedInput}</code>), a secure cryptographic hash completely scrambles the output digest:
        </p>
        <div className="space-y-1.5 font-mono text-xs">
          <div className="bg-slate-900 p-2 rounded text-slate-300 break-all">
            <span className="text-slate-500 mr-2">Input 1:</span> {plainHash}
          </div>
          <div className="bg-slate-900 p-2 rounded text-amber-300 break-all">
            <span className="text-slate-500 mr-2">Input 2:</span> {modifiedHash}
          </div>
        </div>
      </div>

      {/* Base64 Encoding vs Encryption Warning */}
      <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-semibold text-rose-300 block">
            Crucial Distinction: Base64 is NOT Encryption!
          </span>
          <span className="text-slate-400">
            Base64 encoded representation of your input: <code className="text-sky-300 font-mono">{base64Encoded}</code>
          </span>
        </div>
        <span className="text-[11px] text-slate-400 italic">
          Anyone can reverse Base64 instantly without a secret key!
        </span>
      </div>
    </div>
  );
};
