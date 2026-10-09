import React, { useState } from 'react';
import { Binary, RefreshCw } from 'lucide-react';

export const BinaryDataSandbox: React.FC = () => {
  // 8 bits array: index 0 is Bit 7 (128), index 7 is Bit 0 (1)
  const [bits, setBits] = useState<boolean[]>([false, true, false, false, false, false, false, true]); // 01000001 = 65 = 'A'

  const bitWeights = [128, 64, 32, 16, 8, 4, 2, 1];

  const unsignedDecimal = bits.reduce((acc, bit, idx) => acc + (bit ? bitWeights[idx] : 0), 0);
  
  // Signed 2's complement: Bit 7 represents -128
  const signedDecimal = (bits[0] ? -128 : 0) + bits.slice(1).reduce((acc, bit, idx) => acc + (bit ? bitWeights[idx + 1] : 0), 0);

  const hexString = `0x${unsignedDecimal.toString(16).toUpperCase().padStart(2, '0')}`;
  
  const asciiChar = unsignedDecimal >= 32 && unsignedDecimal <= 126
    ? String.fromCharCode(unsignedDecimal)
    : unsignedDecimal === 10 ? '\\n (newline)'
    : unsignedDecimal === 13 ? '\\r (carriage return)'
    : unsignedDecimal === 0 ? '\\0 (null terminator)'
    : '[Non-printable control code]';

  const toggleBit = (idx: number) => {
    const updated = [...bits];
    updated[idx] = !updated[idx];
    setBits(updated);
  };

  const setFromDecimal = (val: number) => {
    const clamped = Math.max(0, Math.min(255, val || 0));
    const newBits = [];
    for (let i = 7; i >= 0; i--) {
      newBits.push(((clamped >> i) & 1) === 1);
    }
    setBits(newBits);
  };

  const applyBitwiseNot = () => {
    setBits(bits.map(b => !b));
  };

  const applyShiftLeft = () => {
    setBits([...bits.slice(1), false]);
  };

  const applyShiftRight = () => {
    setBits([false, ...bits.slice(0, 7)]);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 my-6 text-slate-200 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Binary className="w-5 h-5 text-sky-400" />
            Interactive 8-Bit Data Representation Sandbox
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Toggle binary bits to observe simultaneous representations in Hexadecimal, Decimal, Two's Complement, and ASCII.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFromDecimal(65)}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded border border-slate-700"
          >
            Reset to 'A' (65)
          </button>
          <button
            onClick={() => setFromDecimal(255)}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded border border-slate-700"
          >
            All 1s (0xFF)
          </button>
          <button
            onClick={() => setFromDecimal(0)}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded border border-slate-700"
          >
            All 0s
          </button>
        </div>
      </div>

      {/* Bit Toggler Interface */}
      <div className="my-5">
        <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
          Click any bit to toggle physical voltage (0V ↔ +3.3V):
        </div>

        <div className="grid grid-cols-8 gap-2">
          {bits.map((bit, idx) => {
            const bitIndex = 7 - idx;
            const weight = bitWeights[idx];
            return (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-[10px] text-slate-500 font-mono mb-1">
                  Bit {bitIndex} ({weight})
                </span>
                <button
                  onClick={() => toggleBit(idx)}
                  className={`w-full aspect-square max-w-[64px] rounded-lg text-xl sm:text-2xl font-mono font-bold transition-all shadow-md flex items-center justify-center ${
                    bit
                      ? 'bg-sky-500 text-slate-950 shadow-sky-500/20 ring-2 ring-sky-400'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-750 border border-slate-700'
                  }`}
                >
                  {bit ? '1' : '0'}
                </button>
                <span className="text-[10px] text-slate-400 font-mono mt-1">
                  {bit ? `+${weight}` : '+0'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conversion Output Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        {/* Unsigned Decimal */}
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Unsigned Decimal</div>
          <div className="text-2xl font-mono font-bold text-sky-400 mt-1">{unsignedDecimal}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Range: 0 to 255</div>
        </div>

        {/* Signed Two's Complement */}
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Two's Complement</div>
          <div className="text-2xl font-mono font-bold text-amber-400 mt-1">{signedDecimal}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Range: -128 to +127</div>
        </div>

        {/* Hexadecimal */}
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Hexadecimal (0x)</div>
          <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">{hexString}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Nibbles: {bits.slice(0, 4).map(b => b ? '1' : '0').join('')} {bits.slice(4).map(b => b ? '1' : '0').join('')}</div>
        </div>

        {/* ASCII Character */}
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">ASCII Character</div>
          <div className="text-2xl font-mono font-bold text-purple-400 mt-1 truncate">
            {asciiChar}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Character Encoding</div>
        </div>
      </div>

      {/* Bitwise Arithmetic Operations */}
      <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Bitwise Operations:</span>
          <button
            onClick={applyBitwiseNot}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 font-mono"
          >
            NOT (Invert)
          </button>
          <button
            onClick={applyShiftLeft}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 font-mono"
          >
            &lt;&lt; 1 (Double)
          </button>
          <button
            onClick={applyShiftRight}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 font-mono"
          >
            &gt;&gt; 1 (Halve)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Set Decimal:</span>
          <input
            type="number"
            min="0"
            max="255"
            value={unsignedDecimal}
            onChange={e => setFromDecimal(parseInt(e.target.value, 10))}
            className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-center font-mono text-white text-xs"
          />
        </div>
      </div>
    </div>
  );
};
