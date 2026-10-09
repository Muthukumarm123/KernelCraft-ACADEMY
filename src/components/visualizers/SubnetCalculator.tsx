import React, { useState } from 'react';
import { Network, Globe, Shield, RefreshCw } from 'lucide-react';

export const SubnetCalculator: React.FC = () => {
  const [ipStr, setIpStr] = useState<string>('192.168.1.100');
  const [cidr, setCidr] = useState<number>(24);

  // Helper functions for IP conversion
  const ipToInt = (ip: string): number => {
    const parts = ip.split('.').map(p => parseInt(p, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return 0;
    return ((parts[0] << 24) >>> 0) + ((parts[1] << 16) >>> 0) + ((parts[2] << 8) >>> 0) + (parts[3] >>> 0);
  };

  const intToIp = (int: number): string => {
    return [
      (int >>> 24) & 255,
      (int >>> 16) & 255,
      (int >>> 8) & 255,
      int & 255,
    ].join('.');
  };

  const currentIpInt = ipToInt(ipStr);
  const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const wildcardInt = ~maskInt >>> 0;

  const networkInt = (currentIpInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;

  const totalAddresses = Math.pow(2, 32 - cidr);
  const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalAddresses - 2);

  const firstHostInt = cidr >= 31 ? networkInt : networkInt + 1;
  const lastHostInt = cidr >= 31 ? broadcastInt : broadcastInt - 1;

  // Check RFC 1918 private IP
  const isPrivateRfc1918 = () => {
    const p1 = (currentIpInt >>> 24) & 255;
    const p2 = (currentIpInt >>> 16) & 255;
    if (p1 === 10) return 'Class A Private (10.0.0.0/8)';
    if (p1 === 172 && p2 >= 16 && p2 <= 31) return 'Class B Private (172.16.0.0/12)';
    if (p1 === 192 && p2 === 168) return 'Class C Private (192.168.0.0/16)';
    if (p1 === 127) return 'Loopback (127.0.0.0/8)';
    return 'Public Internet Routable';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 my-6 text-slate-200 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-400" />
            Interactive IPv4 Subnet & CIDR Calculator
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Calculate network boundaries, broadcast addresses, usable host capacities, and bit allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-indigo-300 font-mono border border-slate-700 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            {isPrivateRfc1918()}
          </span>
        </div>
      </div>

      {/* Input row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Target IPv4 Host Address:</label>
          <input
            type="text"
            value={ipStr}
            onChange={e => setIpStr(e.target.value.trim())}
            placeholder="192.168.1.100"
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 font-mono text-white text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold text-slate-400">Subnet Mask Prefix (CIDR):</label>
            <span className="text-xs font-mono font-bold text-indigo-400">/{cidr}</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="8"
              max="30"
              value={cidr}
              onChange={e => setCidr(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-500"
            />
            <span className="text-xs font-mono text-slate-400 whitespace-nowrap">
              {intToIp(maskInt)}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Bit Allocation Bar */}
      <div className="my-4 p-3 bg-slate-950 rounded-lg border border-slate-800">
        <div className="flex justify-between text-[11px] text-slate-400 mb-1.5 font-mono">
          <span>Network Bits: {cidr}</span>
          <span>Host Bits: {32 - cidr}</span>
        </div>
        <div className="h-4 w-full flex rounded overflow-hidden">
          <div
            style={{ width: `${(cidr / 32) * 100}%` }}
            className="bg-indigo-600 h-full flex items-center justify-center text-[9px] font-bold text-white tracking-wider"
          >
            NETWORK PREFIX ({cidr})
          </div>
          <div
            style={{ width: `${((32 - cidr) / 32) * 100}%` }}
            className="bg-emerald-600 h-full flex items-center justify-center text-[9px] font-bold text-white tracking-wider"
          >
            HOSTS ({32 - cidr})
          </div>
        </div>
      </div>

      {/* Calculations Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Network Address</div>
          <div className="text-base font-mono font-bold text-indigo-400 mt-0.5">{intToIp(networkInt)}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Wire identifier</div>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Broadcast Address</div>
          <div className="text-base font-mono font-bold text-rose-400 mt-0.5">{intToIp(broadcastInt)}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">All-hosts address</div>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Usable Host Range</div>
          <div className="text-xs font-mono font-bold text-emerald-400 mt-1 truncate">
            {intToIp(firstHostInt)} - {intToIp(lastHostInt)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Assignable host IPs</div>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Usable Host Count</div>
          <div className="text-base font-mono font-bold text-amber-400 mt-0.5">
            {usableHosts.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Total capacity: {totalAddresses.toLocaleString()}</div>
        </div>
      </div>

      {/* Quick Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs pt-2">
        <span className="text-slate-400">Common Subnets:</span>
        <button
          onClick={() => { setIpStr('192.168.1.100'); setCidr(24); }}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 font-mono"
        >
          /24 (254 hosts - Home/Office)
        </button>
        <button
          onClick={() => { setIpStr('10.0.0.50'); setCidr(16); }}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 font-mono"
        >
          /16 (65,534 hosts - Campus)
        </button>
        <button
          onClick={() => { setIpStr('172.16.10.5'); setCidr(28); }}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 font-mono"
        >
          /28 (14 hosts - Small DMZ)
        </button>
        <button
          onClick={() => { setIpStr('192.0.2.1'); setCidr(30); }}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 font-mono"
        >
          /30 (2 hosts - Point-to-Point Link)
        </button>
      </div>
    </div>
  );
};
