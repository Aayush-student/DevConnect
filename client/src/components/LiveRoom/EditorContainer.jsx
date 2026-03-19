import React from "react";
import Editor from "@monaco-editor/react";

const EditorContainer = ({ editorRef, language, onReady }) => {
  const handleMount = (editor) => {
    editorRef.current = editor;
    onReady && onReady();
  };

  return (
    <div className="flex-1 relative w-full h-full overflow-hidden min-h-0">
      <Editor
        theme="vs-dark"
        language={language || "javascript"}
        onMount={handleMount}
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