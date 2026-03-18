import React, { useState, useRef } from 'react';

const START_CODE = `// DevConnect v1.0\n// Joint session active...\n\nfunction helloWorld() {\n  console.log("Happy coding!");\n}`;

const Editor = () => {
  const [code, setCode] = useState(START_CODE);
  const editorRef = useRef(null);

  const handleTab = (e) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();

    const { selectionStart, selectionEnd } = e.target;
    const updatedCode =
      code.substring(0, selectionStart) +
      "  " +
      code.substring(selectionEnd);

    setCode(updatedCode);

    requestAnimationFrame(() => {
      editorRef.current.selectionStart =
        editorRef.current.selectionEnd =
        selectionStart + 2;
    });
  };

  const lines = code.split('\n').length;

  return (
    <div className="flex-1 bg-[#0B0E14] border border-white/10 rounded-xl overflow-hidden flex flex-col">
      <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            main.js
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-auto group">
        <div className="w-12 pt-6 flex flex-col items-center border-r border-white/5 bg-black/10 select-none">
          {Array.from({ length: lines }).map((_, i) => (
            <span
              key={i}
              className="text-[10px] font-mono text-gray-700 leading-6"
            >
              {i + 1}
            </span>
          ))}
        </div>

        <textarea
          ref={editorRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleTab}
          spellCheck="false"
          className="flex-1 p-6 bg-transparent text-indigo-100 font-mono text-sm outline-none resize-none leading-6 selection:bg-indigo-500/30 placeholder:text-gray-800"
          placeholder="// Start typing..."
        />
      </div>
    </div>
  );
};

export default Editor;