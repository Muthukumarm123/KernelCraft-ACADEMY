import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, RotateCcw, Cpu } from 'lucide-react';

interface MicroStep {
  phase: 'FETCH' | 'DECODE' | 'EXECUTE';
  subStep: number;
  description: string;
  activeBus: 'none' | 'address' | 'data' | 'control';
  activeComponent: string;
}

export const CpuCycleSimulator: React.FC = () => {
  // Registers state
  const [pc, setPc] = useState<number>(0);
  const [mar, setMar] = useState<string>('0x00');
  const [mdr, setMdr] = useState<string>('0x00');
  const [ir, setIr] = useState<string>('NONE');
  const [acc, setAcc] = useState<number>(0);

  // Simulation step state (0 to 11)
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // RAM state (memory table)
  const [ram, setRam] = useState<{ [addr: string]: { label: string; value: string | number } }>({
    '0x00': { label: 'Code 0', value: 'LOAD 0x10' },
    '0x01': { label: 'Code 1', value: 'ADD 0x11' },
    '0x02': { label: 'Code 2', value: 'STORE 0x12' },
    '0x03': { label: 'Code 3', value: 'HALT' },
    '0x10': { label: 'Data A', value: 15 },
    '0x11': { label: 'Data B', value: 27 },
    '0x12': { label: 'Result', value: 0 },
  });

  const steps: MicroStep[] = [
    // Inst 1: LOAD 0x10
    { phase: 'FETCH', subStep: 1, description: 'FETCH Step 1: Program Counter (PC=0x00) is copied into Memory Address Register (MAR). Address bus signals RAM.', activeBus: 'address', activeComponent: 'MAR' },
    { phase: 'FETCH', subStep: 2, description: 'FETCH Step 2: RAM reads address 0x00. Instruction byte "LOAD 0x10" is placed on Data Bus into MDR.', activeBus: 'data', activeComponent: 'MDR' },
    { phase: 'FETCH', subStep: 3, description: 'FETCH Step 3: Instruction copied from MDR to Instruction Register (IR). PC is incremented to 0x01.', activeBus: 'none', activeComponent: 'IR' },
    { phase: 'DECODE', subStep: 4, description: 'DECODE: Control Unit decodes opcode "LOAD". Determines operand 0x10 must be read from RAM.', activeBus: 'control', activeComponent: 'CU' },
    { phase: 'EXECUTE', subStep: 5, description: 'EXECUTE: Address 0x10 loaded into MAR -> Data 15 fetched into MDR -> ACC loaded with 15.', activeBus: 'data', activeComponent: 'ACC' },

    // Inst 2: ADD 0x11
    { phase: 'FETCH', subStep: 1, description: 'FETCH Step 1: PC (0x01) copied to MAR. Address bus queries RAM.', activeBus: 'address', activeComponent: 'MAR' },
    { phase: 'FETCH', subStep: 2, description: 'FETCH Step 2: RAM outputs "ADD 0x11" onto Data Bus into MDR.', activeBus: 'data', activeComponent: 'MDR' },
    { phase: 'FETCH', subStep: 3, description: 'FETCH Step 3: MDR copied into IR. PC incremented to 0x02.', activeBus: 'none', activeComponent: 'IR' },
    { phase: 'DECODE', subStep: 4, description: 'DECODE: Control Unit decodes "ADD". Directs ALU to prepare addition with ACC and memory 0x11.', activeBus: 'control', activeComponent: 'ALU' },
    { phase: 'EXECUTE', subStep: 5, description: 'EXECUTE: Memory 0x11 (27) fetched; ALU computes 15 + 27 = 42. Accumulator (ACC) updated to 42!', activeBus: 'data', activeComponent: 'ALU' },

    // Inst 3: STORE 0x12
    { phase: 'FETCH', subStep: 1, description: 'FETCH Step 1: PC (0x02) copied to MAR. Address bus queries RAM.', activeBus: 'address', activeComponent: 'MAR' },
    { phase: 'FETCH', subStep: 2, description: 'FETCH Step 2: RAM outputs "STORE 0x12" into MDR.', activeBus: 'data', activeComponent: 'MDR' },
    { phase: 'FETCH', subStep: 3, description: 'FETCH Step 3: MDR copied to IR. PC incremented to 0x03.', activeBus: 'none', activeComponent: 'IR' },
    { phase: 'DECODE', subStep: 4, description: 'DECODE: Control Unit decodes "STORE". Prepares memory write to 0x12.', activeBus: 'control', activeComponent: 'CU' },
    { phase: 'EXECUTE', subStep: 5, description: 'EXECUTE: ACC value (42) written over Data Bus into RAM location 0x12. Result stored!', activeBus: 'data', activeComponent: 'RAM' },

    // Inst 4: HALT
    { phase: 'FETCH', subStep: 1, description: 'FETCH: PC (0x03) copied to MAR.', activeBus: 'address', activeComponent: 'MAR' },
    { phase: 'FETCH', subStep: 2, description: 'FETCH: "HALT" read into MDR and IR.', activeBus: 'data', activeComponent: 'IR' },
    { phase: 'EXECUTE', subStep: 3, description: 'EXECUTE: Control Unit halts clock generator. Program complete!', activeBus: 'control', activeComponent: 'CU' },
  ];

  const currentStep = steps[currentStepIndex] || steps[0];

  // Apply state changes according to step index
  useEffect(() => {
    switch (currentStepIndex) {
      case 0:
        setPc(0);
        setMar('0x00');
        break;
      case 1:
        setMdr('LOAD 0x10');
        break;
      case 2:
        setIr('LOAD 0x10');
        setPc(1);
        break;
      case 3:
        break;
      case 4:
        setAcc(15);
        setMar('0x10');
        break;
      case 5:
        setMar('0x01');
        break;
      case 6:
        setMdr('ADD 0x11');
        break;
      case 7:
        setIr('ADD 0x11');
        setPc(2);
        break;
      case 8:
        break;
      case 9:
        setAcc(42);
        setMar('0x11');
        break;
      case 10:
        setMar('0x02');
        break;
      case 11:
        setMdr('STORE 0x12');
        break;
      case 12:
        setIr('STORE 0x12');
        setPc(3);
        break;
      case 13:
        break;
      case 14:
        setRam(prev => ({ ...prev, '0x12': { ...prev['0x12'], value: 42 } }));
        setMar('0x12');
        break;
      case 15:
        setMar('0x03');
        break;
      case 16:
        setMdr('HALT');
        setIr('HALT');
        break;
      case 17:
        setIsRunning(false);
        break;
      default:
        break;
    }
  }, [currentStepIndex]);

  // Auto-runner loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsRunning(false);
        }
      }, 1400);
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentStepIndex, steps.length]);

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStepIndex(0);
    setPc(0);
    setMar('0x00');
    setMdr('0x00');
    setIr('NONE');
    setAcc(0);
    setRam({
      '0x00': { label: 'Code 0', value: 'LOAD 0x10' },
      '0x01': { label: 'Code 1', value: 'ADD 0x11' },
      '0x02': { label: 'Code 2', value: 'STORE 0x12' },
      '0x03': { label: 'Code 3', value: 'HALT' },
      '0x10': { label: 'Data A', value: 15 },
      '0x11': { label: 'Data B', value: 27 },
      '0x12': { label: 'Result', value: 0 },
    });
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 my-6 text-slate-200 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            Interactive CPU Fetch-Decode-Execute Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Observe micro-architectural data flow across CPU registers, ALU, and the system bus.
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              isRunning ? 'bg-amber-600 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isRunning ? 'Pause' : 'Auto Run'}
          </button>
          <button
            onClick={handleNextStep}
            disabled={currentStepIndex >= steps.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded text-xs font-semibold transition-colors border border-slate-700"
          >
            <SkipForward className="w-3.5 h-3.5" /> Next Clock Tick
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors border border-slate-700"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Step Description Banner */}
      <div className="my-4 p-3.5 bg-slate-950 border border-indigo-900/40 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase ${
              currentStep.phase === 'FETCH' ? 'bg-sky-950 text-sky-400 border border-sky-800' :
              currentStep.phase === 'DECODE' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
              'bg-emerald-950 text-emerald-400 border border-emerald-800'
            }`}>
              {currentStep.phase} PHASE
            </span>
            <span className="text-xs text-slate-400">
              Clock Tick {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
          <p className="text-sm font-medium text-slate-100 mt-1">
            {currentStep.description}
          </p>
        </div>

        {/* Bus Indicator */}
        <div className="text-right shrink-0">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Active Bus</span>
          <span className={`text-xs font-mono font-bold ${
            currentStep.activeBus === 'address' ? 'text-amber-400' :
            currentStep.activeBus === 'data' ? 'text-sky-400' :
            currentStep.activeBus === 'control' ? 'text-rose-400' : 'text-slate-500'
          }`}>
            {currentStep.activeBus.toUpperCase()} BUS
          </span>
        </div>
      </div>

      {/* Architecture Visual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* CPU Registers Panel */}
        <div className="lg:col-span-2 bg-slate-950/70 border border-slate-800 rounded-lg p-4">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>CPU Internal Die (Execution Units & Registers)</span>
            <span className="text-[11px] text-indigo-400 font-mono">Registers: ~0.5ns latency</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Program Counter (PC) */}
            <div className={`p-3 rounded-lg border transition-all ${
              currentStep.activeComponent === 'PC' ? 'bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-500' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Program Counter (PC)</div>
              <div className="text-lg font-mono font-bold text-indigo-300 mt-0.5">0x0{pc}</div>
              <div className="text-[10px] text-slate-500 mt-1">Next instruction pointer</div>
            </div>

            {/* Memory Address Register (MAR) */}
            <div className={`p-3 rounded-lg border transition-all ${
              currentStep.activeComponent === 'MAR' ? 'bg-amber-950/60 border-amber-500 ring-1 ring-amber-500' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Address Reg (MAR)</div>
              <div className="text-lg font-mono font-bold text-amber-300 mt-0.5">{mar}</div>
              <div className="text-[10px] text-slate-500 mt-1">Address on memory bus</div>
            </div>

            {/* Memory Data Register (MDR) */}
            <div className={`p-3 rounded-lg border transition-all ${
              currentStep.activeComponent === 'MDR' ? 'bg-sky-950/60 border-sky-500 ring-1 ring-sky-500' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Data Reg (MDR)</div>
              <div className="text-sm font-mono font-bold text-sky-300 mt-1 truncate">{mdr}</div>
              <div className="text-[10px] text-slate-500 mt-1">Buffer to/from RAM</div>
            </div>

            {/* Instruction Register (IR) */}
            <div className={`p-3 rounded-lg border transition-all ${
              currentStep.activeComponent === 'IR' ? 'bg-rose-950/60 border-rose-500 ring-1 ring-rose-500' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Instruction Reg (IR)</div>
              <div className="text-sm font-mono font-bold text-rose-300 mt-1 truncate">{ir}</div>
              <div className="text-[10px] text-slate-500 mt-1">Current executing opcode</div>
            </div>

            {/* Accumulator (ACC) */}
            <div className={`p-3 rounded-lg border transition-all ${
              currentStep.activeComponent === 'ACC' ? 'bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-500' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Accumulator (ACC)</div>
              <div className="text-lg font-mono font-bold text-emerald-300 mt-0.5">{acc}</div>
              <div className="text-[10px] text-slate-500 mt-1">ALU math result storage</div>
            </div>

            {/* Control Unit (CU) */}
            <div className={`p-3 rounded-lg border transition-all ${
              currentStep.activeComponent === 'CU' ? 'bg-purple-950/60 border-purple-500 ring-1 ring-purple-500' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Control Unit (CU)</div>
              <div className="text-sm font-mono font-bold text-purple-300 mt-1">
                {currentStep.phase}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Microcode coordinator</div>
            </div>
          </div>
        </div>

        {/* RAM Memory Table */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-4">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Main Memory (RAM)</span>
            <span className="text-[11px] text-slate-500 font-mono">Shared Bus</span>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            {Object.entries(ram).map(([addr, item]) => {
              const isSelected = mar === addr;
              return (
                <div
                  key={addr}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded transition-colors ${
                    isSelected ? 'bg-indigo-900/60 text-white font-bold border border-indigo-500' : 'bg-slate-900/60 text-slate-300'
                  }`}
                >
                  <span className="text-slate-400">{addr}</span>
                  <span className="text-[11px] text-slate-500">{item.label}</span>
                  <span className="text-indigo-200">{String(item.value)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
