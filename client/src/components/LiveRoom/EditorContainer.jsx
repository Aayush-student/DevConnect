import React from "react";
import Editor from "@monaco-editor/react";

const EditorContainer = ({ editorRef, broadcastCode }) => {
  const handleMount = (editor) => {
    editorRef.current = editor;
  };

  const handleChange = (value) => {
    if (value !== undefined) {
      broadcastCode(value);
    }
  };

  return (
    <div className="flex-1 relative w-full h-full overflow-hidden">
      <Editor
        theme="vs-dark"
        defaultLanguage="javascript"
        onMount={handleMount}
        onChange={handleChange}
        height="100%"
        width="100%"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          padding: { top: 20 },
          smoothScrolling: true,
          cursorBlinking: "smooth",
          fontFamily: "Fira Code, monospace",
          lineNumbersMinChars: 3,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
        }}
      />
    </div>
  );
};

export default EditorContainer;