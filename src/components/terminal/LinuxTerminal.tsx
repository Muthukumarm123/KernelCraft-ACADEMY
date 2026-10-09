import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Copy, RotateCcw, Check, Sparkles, HelpCircle } from 'lucide-react';

interface FileNode {
  name: string;
  isDir: boolean;
  content?: string;
  mode: number; // e.g. 0o755
  uid: number;
  gid: number;
  user: string;
  group: string;
  inode: number;
  mtime: Date;
  ctime: Date;
  atime: Date;
  children?: { [key: string]: FileNode };
}

interface LinuxTerminalProps {
  onCommandExecuted?: (cmd: string, output: string) => void;
  initialWorkingDir?: string;
}

export const LinuxTerminal: React.FC<LinuxTerminalProps> = ({
  onCommandExecuted,
  initialWorkingDir = '/home/student',
}) => {
  const [cwd, setCwd] = useState<string>(initialWorkingDir);
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    {
      command: '',
      output: `Welcome to KernelCraft Linux Sandbox (Linux 6.8.0-45-generic x86_64)
Type 'help' to see available commands, or practice navigation (ls, pwd, cd, cat, stat, chmod, id).
Simulated sandbox environment - safe to experiment!`
    }
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize realistic virtual filesystem
  const createInitialFs = (): FileNode => {
    let nextInode = 1000;
    const now = new Date();

    const root: FileNode = {
      name: '/',
      isDir: true,
      mode: 0o755,
      uid: 0,
      gid: 0,
      user: 'root',
      group: 'root',
      inode: 2,
      mtime: now,
      ctime: now,
      atime: now,
      children: {}
    };

    const addDir = (parent: FileNode, name: string, mode = 0o755, user = 'root', group = 'root'): FileNode => {
      const dir: FileNode = {
        name,
        isDir: true,
        mode,
        uid: user === 'root' ? 0 : 1000,
        gid: group === 'root' ? 0 : 1000,
        user,
        group,
        inode: nextInode++,
        mtime: now,
        ctime: now,
        atime: now,
        children: {}
      };
      if (parent.children) parent.children[name] = dir;
      return dir;
    };

    const addFile = (parent: FileNode, name: string, content: string, mode = 0o644, user = 'root', group = 'root'): FileNode => {
      const file: FileNode = {
        name,
        isDir: false,
        content,
        mode,
        uid: user === 'root' ? 0 : 1000,
        gid: group === 'root' ? 0 : 1000,
        user,
        group,
        inode: nextInode++,
        mtime: now,
        ctime: now,
        atime: now
      };
      if (parent.children) parent.children[name] = file;
      return file;
    };

    const home = addDir(root, 'home');
    const student = addDir(home, 'student', 0o750, 'student', 'student');
    addFile(student, 'welcome.txt', 'Welcome to KernelCraft!\nUse this sandbox to practice Linux commands and labs.\n', 0o644, 'student', 'student');
    addFile(student, 'notes.sh', '#!/bin/bash\necho "Linux mastery starts here"\n', 0o755, 'student', 'student');

    const etc = addDir(root, 'etc');
    addFile(etc, 'passwd', `root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsyslog:x:104:110::/home/syslog:/usr/sbin/nologin\nstudent:x:1000:1000:KernelCraft Student,,,:/home/student:/bin/bash\noperator:x:1001:1001:System Operator:/home/operator:/bin/bash\n`);
    addFile(etc, 'group', `root:x:0:\ndaemon:x:1:\nadm:x:4:student\nsudo:x:27:student\nstudent:x:1000:\noperator:x:1001:\n`);
    addFile(etc, 'hosts', '127.0.0.1\tlocalhost\n127.0.1.1\tkernelcraft-srv\n');
    addFile(etc, 'resolv.conf', 'nameserver 1.1.1.1\nnameserver 8.8.8.8\n');

    // Security audit folder for Lab 1
    const secAudit = addDir(etc, 'security_audit', 0o755, 'root', 'root');
    addFile(secAudit, 'firewall_rules.conf', '# Production Firewall Policy\nALLOW TCP 80,443\nDENY ALL\n', 0o777, 'root', 'root'); // Misconfigured world-writable!
    addFile(secAudit, 'audit_token.txt', 'FLAG{L1NUX_P3RM1SS10NS_AUD1T_P4SS3D}\n', 0o640, 'root', 'root');

    // Sudoers directory for Lab 6
    const sudoersD = addDir(etc, 'sudoers.d', 0o750, 'root', 'root');
    addFile(sudoersD, 'audit_rules', '# Insecure sudoers rule\nstudent ALL=(ALL) NOPASSWD: /usr/bin/find\n', 0o440, 'root', 'root');

    const secDir = addDir(etc, 'security', 0o755, 'root', 'root');
    addFile(secDir, 'flag.txt', 'FLAG{D3F3NS3_1N_D3PTH_AUD1T_C0MPL3T3}\n', 0o644, 'root', 'root');

    const varDir = addDir(root, 'var');
    const logDir = addDir(varDir, 'log');
    addFile(logDir, 'auth.log', `Oct 09 03:30:12 srv sshd[1420]: Failed password for root from 198.51.100.77 port 44102 ssh2
Oct 09 03:30:15 srv sshd[1422]: Failed password for admin from 198.51.100.77 port 44108 ssh2
Oct 09 03:30:18 srv sshd[1425]: Failed password for user from 198.51.100.77 port 44115 ssh2
Oct 09 03:42:18 srv sshd[1580]: Accepted password for operator from 198.51.100.77 port 48212 ssh2
Oct 09 03:42:19 srv sshd[1580]: pam_unix(sshd:session): session opened for user operator by (uid=0)
`);
    addFile(logDir, 'syslog', 'Oct 09 03:00:01 srv CRON[1200]: (root) CMD (/usr/local/bin/backup.sh)\n');

    const tmp = addDir(root, 'tmp', 0o777);
    addFile(tmp, 'scratch.txt', 'temporary buffer\n', 0o666, 'student', 'student');

    const proc = addDir(root, 'proc');
    addFile(proc, 'cpuinfo', 'processor\t: 0\nmodel name\t: Intel(R) Core(TM) i7-14700K\ncpu MHz\t\t: 3400.000\ncache size\t: 33792 KB\ncpu cores\t: 8\n');
    addFile(proc, 'meminfo', 'MemTotal:       32645120 kB\nMemFree:        24108420 kB\nMemAvailable:   28941200 kB\nBuffers:          512400 kB\nCached:          4312000 kB\n');
    addFile(proc, 'version', 'Linux version 6.8.0-45-generic (buildd@kernelcraft) (gcc version 13.2.0) #45-Ubuntu SMP PREEMPT_DYNAMIC\n');

    addDir(root, 'usr');
    addDir(root, 'bin');
    addDir(root, 'dev');

    return root;
  };

  const fsRef = useRef<FileNode>(createInitialFs());

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Resolve absolute or relative path to a FileNode
  const resolvePath = (path: string): { node: FileNode | null; absPath: string; parent: FileNode | null; baseName: string } => {
    let clean = path.trim();
    if (clean === '~' || clean.startsWith('~/')) {
      clean = clean.replace(/^~/, '/home/student');
    }

    const isAbsolute = clean.startsWith('/');
    const parts = isAbsolute
      ? clean.split('/').filter(Boolean)
      : [...cwd.split('/').filter(Boolean), ...clean.split('/').filter(Boolean)];

    // Simplify .. and .
    const stack: string[] = [];
    for (const part of parts) {
      if (part === '.') continue;
      if (part === '..') {
        stack.pop();
      } else {
        stack.push(part);
      }
    }

    const absPath = '/' + stack.join('/');
    let curr: FileNode = fsRef.current;
    let parent: FileNode | null = null;
    let baseName = '';

    for (let i = 0; i < stack.length; i++) {
      const seg = stack[i];
      baseName = seg;
      if (!curr.children || !curr.children[seg]) {
        return { node: null, absPath, parent: curr, baseName: seg };
      }
      parent = curr;
      curr = curr.children[seg];
    }

    return { node: curr, absPath, parent, baseName: stack[stack.length - 1] || '/' };
  };

  const formatPerms = (mode: number, isDir: boolean): string => {
    const chars = ['---', '--x', '-w-', '-wx', 'r--', 'r-x', 'rw-', 'rwx'];
    const u = chars[(mode >> 6) & 7];
    const g = chars[(mode >> 3) & 7];
    const o = chars[mode & 7];
    return (isDir ? 'd' : '-') + u + g + o;
  };

  // Execute terminal command
  const executeCommand = (cmdLine: string) => {
    const trimmed = cmdLine.trim();
    if (!trimmed) {
      setHistory(prev => [...prev, { command: '', output: '' }]);
      return;
    }

    // Add to history
    setCmdHistory(prev => [trimmed, ...prev]);
    setHistoryPointer(-1);

    // Check for pipes |
    if (trimmed.includes('|')) {
      const pipeParts = trimmed.split('|').map(s => s.trim());
      let pipeOutput = runSingleCommand(pipeParts[0]);

      for (let i = 1; i < pipeParts.length; i++) {
        const nextCmd = pipeParts[i];
        pipeOutput = runPipedFilter(nextCmd, pipeOutput);
      }

      setHistory(prev => [...prev, { command: trimmed, output: pipeOutput }]);
      if (onCommandExecuted) onCommandExecuted(trimmed, pipeOutput);
      return;
    }

    // Check for redirection > or >>
    if (trimmed.includes('>') || trimmed.includes('>>')) {
      const isAppend = trimmed.includes('>>');
      const [cmdPart, filePart] = trimmed.split(isAppend ? '>>' : '>').map(s => s.trim());
      const rawOutput = runSingleCommand(cmdPart);
      const targetRes = resolvePath(filePart);

      if (targetRes.node && targetRes.node.isDir) {
        setHistory(prev => [...prev, { command: trimmed, output: `bash: ${filePart}: Is a directory` }]);
        return;
      }

      if (targetRes.node && !targetRes.node.isDir) {
        targetRes.node.content = isAppend ? (targetRes.node.content || '') + rawOutput + '\n' : rawOutput + '\n';
        targetRes.node.mtime = new Date();
      } else if (targetRes.parent && targetRes.parent.children) {
        targetRes.parent.children[targetRes.baseName] = {
          name: targetRes.baseName,
          isDir: false,
          content: rawOutput + '\n',
          mode: 0o644,
          uid: 1000,
          gid: 1000,
          user: 'student',
          group: 'student',
          inode: Math.floor(Math.random() * 90000) + 1000,
          mtime: new Date(),
          ctime: new Date(),
          atime: new Date()
        };
      }

      setHistory(prev => [...prev, { command: trimmed, output: '' }]);
      if (onCommandExecuted) onCommandExecuted(trimmed, '');
      return;
    }

    const output = runSingleCommand(trimmed);
    setHistory(prev => [...prev, { command: trimmed, output }]);
    if (onCommandExecuted) onCommandExecuted(trimmed, output);
  };

  const runPipedFilter = (cmd: string, inputData: string): string => {
    const tokens = cmd.split(/\s+/).filter(Boolean);
    const op = tokens[0];
    const lines = inputData.split('\n');

    if (op === 'grep') {
      const pattern = tokens[1]?.replace(/['"]/g, '');
      if (!pattern) return inputData;
      return lines.filter(l => l.includes(pattern)).join('\n');
    }
    if (op === 'wc') {
      if (tokens.includes('-l')) return String(lines.filter(l => l.length > 0).length);
      return `${lines.length} ${inputData.split(/\s+/).length} ${inputData.length}`;
    }
    if (op === 'head') {
      const n = parseInt(tokens[2] || '10', 10);
      return lines.slice(0, n).join('\n');
    }
    if (op === 'tail') {
      const n = parseInt(tokens[2] || '10', 10);
      return lines.slice(-n).join('\n');
    }
    return inputData;
  };

  const runSingleCommand = (cmd: string): string => {
    const tokens = cmd.split(/\s+/).filter(Boolean);
    const op = tokens[0]?.toLowerCase();
    const args = tokens.slice(1);

    switch (op) {
      case 'clear':
        setHistory([]);
        return '';

      case 'pwd':
        return cwd;

      case 'whoami':
        return 'student';

      case 'id':
        return 'uid=1000(student) gid=1000(student) groups=1000(student),4(adm),27(sudo)';

      case 'groups':
        return 'student adm sudo';

      case 'uname':
        if (args.includes('-a')) {
          return 'Linux kernelcraft-srv 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 x86_64 x86_64 GNU/Linux';
        }
        return 'Linux';

      case 'date':
        return new Date().toUTCString();

      case 'uptime':
        return ' 12:45:00 up 14 days,  3:22,  1 user,  load average: 0.08, 0.03, 0.01';

      case 'echo': {
        const text = args.join(' ');
        if (text === '$PATH') return '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin';
        if (text === '$USER') return 'student';
        if (text === '$HOME') return '/home/student';
        return text.replace(/["']/g, '');
      }

      case 'printenv':
        return 'USER=student\nHOME=/home/student\nSHELL=/bin/bash\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\nTERM=xterm-256color\nLANG=en_US.UTF-8';

      case 'cd': {
        const target = args[0] || '~';
        const res = resolvePath(target);
        if (!res.node) {
          return `bash: cd: ${target}: No such file or directory`;
        }
        if (!res.node.isDir) {
          return `bash: cd: ${target}: Not a directory`;
        }
        // Check execute permission
        if ((res.node.mode & 0o111) === 0) {
          return `bash: cd: ${target}: Permission denied`;
        }
        setCwd(res.absPath);
        return '';
      }

      case 'ls': {
        const showAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
        const showLong = args.includes('-l') || args.includes('-la') || args.includes('-al');
        const targetPath = args.find(a => !a.startsWith('-')) || '.';
        const res = resolvePath(targetPath);

        if (!res.node) {
          return `ls: cannot access '${targetPath}': No such file or directory`;
        }

        if (!res.node.isDir) {
          if (showLong) {
            return `${formatPerms(res.node.mode, false)} 1 ${res.node.user} ${res.node.group} ${(res.node.content || '').length} Oct 09 12:00 ${res.node.name}`;
          }
          return res.node.name;
        }

        const entries = Object.values(res.node.children || {});
        let filtered = showAll ? entries : entries.filter(e => !e.name.startsWith('.'));
        filtered.sort((a, b) => a.name.localeCompare(b.name));

        if (showLong) {
          const lines = filtered.map(f => {
            const size = f.isDir ? 4096 : (f.content || '').length;
            const perms = formatPerms(f.mode, f.isDir);
            return `${perms} 1 ${f.user} ${f.group} ${String(size).padStart(5, ' ')} Oct 09 12:00 ${f.name}${f.isDir ? '/' : ''}`;
          });
          return `total ${filtered.length * 4}\n` + lines.join('\n');
        }

        return filtered.map(f => f.name + (f.isDir ? '/' : '')).join('  ');
      }

      case 'cat': {
        if (!args[0]) return 'cat: missing file operand';
        const res = resolvePath(args[0]);
        if (!res.node) return `cat: ${args[0]}: No such file or directory`;
        if (res.node.isDir) return `cat: ${args[0]}: Is a directory`;
        return (res.node.content || '').trimEnd();
      }

      case 'stat': {
        if (!args[0]) return 'stat: missing operand';
        const res = resolvePath(args[0]);
        if (!res.node) return `stat: cannot stat '${args[0]}': No such file or directory`;
        const octalPerm = (res.node.mode & 0o777).toString(8).padStart(4, '0');
        const symPerm = formatPerms(res.node.mode, res.node.isDir);
        const size = res.node.isDir ? 4096 : (res.node.content || '').length;

        return `  File: ${args[0]}
  Size: ${size}         Blocks: 8          IO Block: 4096   ${res.node.isDir ? 'directory' : 'regular file'}
Device: 801h/2049d      Inode: ${res.node.inode}     Links: 1
Access: (${octalPerm}/${symPerm})  Uid: (${res.node.uid}/${res.node.user})   Gid: (${res.node.gid}/${res.node.group})
Access: ${res.node.atime.toISOString().replace('T', ' ').slice(0, 19)}
Modify: ${res.node.mtime.toISOString().replace('T', ' ').slice(0, 19)}
Change: ${res.node.ctime.toISOString().replace('T', ' ').slice(0, 19)}`;
      }

      case 'chmod': {
        if (args.length < 2) return 'chmod: missing operand';
        const modeArg = args[0];
        const fileArg = args[1];
        const res = resolvePath(fileArg);
        if (!res.node) return `chmod: cannot access '${fileArg}': No such file or directory`;

        // Handle numeric mode (e.g. 755, 640)
        if (/^[0-7]{3,4}$/.test(modeArg)) {
          const oct = parseInt(modeArg, 8);
          res.node.mode = oct;
          res.node.ctime = new Date();
          return '';
        }

        // Handle basic symbolic (u+x, g-w, o-r, u=rwx)
        if (modeArg.includes('+x')) res.node.mode |= 0o111;
        if (modeArg.includes('-w')) res.node.mode &= ~0o022;
        if (modeArg.includes('-r')) res.node.mode &= ~0o044;
        res.node.ctime = new Date();
        return '';
      }

      case 'chown': {
        if (args.length < 2) return 'chown: missing operand';
        const [ownerGroup, fileArg] = [args[0], args[1]];
        const res = resolvePath(fileArg);
        if (!res.node) return `chown: cannot access '${fileArg}': No such file or directory`;
        const [u, g] = ownerGroup.split(':');
        if (u) res.node.user = u;
        if (g) res.node.group = g;
        res.node.ctime = new Date();
        return '';
      }

      case 'mkdir': {
        if (!args[0]) return 'mkdir: missing operand';
        const res = resolvePath(args[0]);
        if (res.node) return `mkdir: cannot create directory '${args[0]}': File exists`;
        if (res.parent && res.parent.children) {
          res.parent.children[res.baseName] = {
            name: res.baseName,
            isDir: true,
            mode: 0o755,
            uid: 1000,
            gid: 1000,
            user: 'student',
            group: 'student',
            inode: Math.floor(Math.random() * 80000) + 2000,
            mtime: new Date(),
            ctime: new Date(),
            atime: new Date(),
            children: {}
          };
          return '';
        }
        return `mkdir: cannot create directory '${args[0]}': No such file or directory`;
      }

      case 'touch': {
        if (!args[0]) return 'touch: missing file operand';
        const res = resolvePath(args[0]);
        if (res.node) {
          res.node.mtime = new Date();
          return '';
        }
        if (res.parent && res.parent.children) {
          res.parent.children[res.baseName] = {
            name: res.baseName,
            isDir: false,
            content: '',
            mode: 0o644,
            uid: 1000,
            gid: 1000,
            user: 'student',
            group: 'student',
            inode: Math.floor(Math.random() * 80000) + 2000,
            mtime: new Date(),
            ctime: new Date(),
            atime: new Date()
          };
          return '';
        }
        return `touch: cannot touch '${args[0]}': No such file or directory`;
      }

      case 'rm': {
        if (!args[0]) return 'rm: missing operand';
        const isRecursive = args.includes('-r') || args.includes('-rf');
        const target = args.find(a => !a.startsWith('-')) || '';
        const res = resolvePath(target);
        if (!res.node) return `rm: cannot remove '${target}': No such file or directory`;
        if (res.node.isDir && !isRecursive) return `rm: cannot remove '${target}': Is a directory`;
        if (res.parent && res.parent.children) {
          delete res.parent.children[res.baseName];
          return '';
        }
        return '';
      }

      case 'ps':
        return `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1  168532 11840 ?        Ss   00:00   0:01 /sbin/init
root       412  0.0  0.0   72400  5120 ?        Ss   00:00   0:00 /usr/sbin/sshd -D
syslog     614  0.0  0.0  214200  4210 ?        Ssl  00:00   0:00 /usr/sbin/rsyslogd
student   1240  0.0  0.0   12450  4120 pts/0    Ss   12:40   0:00 -bash
student   1350  0.0  0.0   14200  2890 pts/0    R+   12:45   0:00 ps ${args.join(' ')}`;

      case 'top':
        return `top - 12:45:10 up 14 days,  1 user,  load average: 0.05, 0.03, 0.00
Tasks:  48 total,   1 running,  47 sleeping,   0 stopped,   0 zombie
%Cpu(s):  1.2 us,  0.4 sy,  0.0 ni, 98.4 id,  0.0 wa,  0.0 hi,  0.0 si
MiB Mem :  31880.0 total,  23543.4 free,   3951.2 used,   4385.4 buff/cache
MiB Swap:   4096.0 total,   4096.0 free,      0.0 used.  27928.8 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
      1 root      20   0  168532  11840   8420 S   0.0   0.0   0:01.42 systemd
    412 root      20   0   72400   5120   3840 S   0.0   0.0   0:00.18 sshd
   1240 student   20   0   12450   4120   2890 S   0.0   0.0   0:00.32 bash`;

      case 'find': {
        const rootRes = resolvePath(args[0] || '.');
        if (!rootRes.node) return `find: '${args[0]}': No such file or directory`;
        const list: string[] = [];
        const walk = (n: FileNode, p: string) => {
          list.push(p);
          if (n.isDir && n.children) {
            Object.values(n.children).forEach(c => walk(c, `${p}/${c.name}`));
          }
        };
        walk(rootRes.node, rootRes.absPath);
        return list.slice(0, 30).join('\n');
      }

      case 'help':
        return `KernelCraft Bash Terminal Reference:
Navigation:    pwd, cd <dir>, ls, ls -l, ls -la
File Ops:      touch <file>, mkdir <dir>, cat <file>, rm <file>, cp, mv
Permissions:   chmod <755|640|u+x> <file>, chown <u:g> <file>, stat <file>
Identity:      whoami, id, groups
Processes:     ps, ps aux, top
I/O & Pipes:   | (pipe), > (overwrite), >> (append), grep <pattern>, wc -l
System Info:   uname -a, date, uptime, echo $PATH, printenv
Management:    clear, reset, help`;

      default:
        return `bash: ${op}: command not found. Type 'help' for available commands.`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextPtr = Math.min(cmdHistory.length - 1, historyPointer + 1);
        setHistoryPointer(nextPtr);
        setInputVal(cmdHistory[nextPtr]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer > 0) {
        const nextPtr = historyPointer - 1;
        setHistoryPointer(nextPtr);
        setInputVal(cmdHistory[nextPtr]);
      } else if (historyPointer === 0) {
        setHistoryPointer(-1);
        setInputVal('');
      }
    }
  };

  const handleResetTerminal = () => {
    fsRef.current = createInitialFs();
    setCwd(initialWorkingDir);
    setHistory([
      {
        command: '',
        output: 'Terminal sandbox reset to pristine factory state.'
      }
    ]);
  };

  const copyBlock = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs my-6">
      {/* Window Title Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-slate-400 text-xs ml-2 flex items-center gap-1.5 font-sans font-medium">
            <TerminalIcon className="w-3.5 h-3.5 text-indigo-400" />
            student@kernelcraft: {cwd}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => executeCommand('help')}
            className="flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] transition-colors border border-slate-700"
          >
            <HelpCircle className="w-3 h-3" /> Quick Help
          </button>
          <button
            onClick={handleResetTerminal}
            className="flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] transition-colors border border-slate-700"
            title="Reset Filesystem"
          >
            <RotateCcw className="w-3 h-3" /> Reset FS
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="p-4 bg-slate-950/95 overflow-y-auto max-h-[380px] min-h-[260px] space-y-3 cursor-text text-slate-300 selection:bg-indigo-700 selection:text-white"
      >
        {history.map((item, idx) => (
          <div key={idx} className="group relative">
            {item.command && (
              <div className="flex items-center gap-1 text-slate-200">
                <span className="text-emerald-400 font-bold">student@kernelcraft</span>
                <span className="text-slate-500">:</span>
                <span className="text-sky-400 font-bold">{cwd}</span>
                <span className="text-slate-400 font-bold">$</span>
                <span className="ml-1 text-white">{item.command}</span>
              </div>
            )}
            {item.output && (
              <div className="relative mt-1">
                <pre className="text-slate-300 whitespace-pre-wrap font-mono leading-relaxed pl-1">
                  {item.output}
                </pre>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyBlock(item.output, idx);
                  }}
                  className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 text-[10px] flex items-center gap-1"
                >
                  {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedIndex === idx ? 'Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Active Command Input Line */}
        <div className="flex items-center gap-1.5 pt-1">
          <span className="text-emerald-400 font-bold shrink-0">student@kernelcraft</span>
          <span className="text-slate-500 shrink-0">:</span>
          <span className="text-sky-400 font-bold shrink-0">{cwd}</span>
          <span className="text-slate-400 font-bold shrink-0">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-transparent border-0 outline-none text-white font-mono text-xs caret-emerald-400 p-0"
            spellCheck={false}
          />
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* Suggested Command Quick-Chips */}
      <div className="bg-slate-900/80 border-t border-slate-800/80 px-4 py-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
        <span>Suggested commands:</span>
        {['pwd', 'ls -la', 'id', 'cat /etc/passwd | head -n 5', 'stat welcome.txt', 'chmod 755 notes.sh'].map(cmd => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 rounded border border-slate-700/60 font-mono transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
