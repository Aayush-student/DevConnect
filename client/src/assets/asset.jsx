export const codeLines = [
  { id: "01", text: 'import { Socket } from "devconnect";' },
  { id: "02", text: "const room = new Socket('debug-01');" },
  { id: "03", text: "room.on('codeChange', syncData);", highlighted: true },
  { id: "04", text: "// Connected and syncing live..." }
];

export const bugRooms = [
  {
    id: 1,
    title: "React Context API not updating",
    author: "@coder_01",
    language: "JavaScript",
    difficulty: "Hard",
    activeUsers: 8
  },
  {
    id: 2,
    title: "Express Middleware looping indefinitely",
    author: "@node_wizard",
    language: "Node.js",
    difficulty: "Medium",
    activeUsers: 3
  },
  {
    id: 3,
    title: "Centering a div with Tailwind",
    author: "@ui_newbie",
    language: "CSS",
    difficulty: "Easy",
    activeUsers: 15
  }
];

export const roomParticipants = [
  { id: 1, name: "Aayush Kumar", role: "Host", status: "online" },
  { id: 2, name: "Dev_Explorer", role: "Contributor", status: "online" },
  { id: 3, name: "AI_Assistant", role: "Bot", status: "online" }
];

export const mockMessages = [
  { id: 1, user: "Dev_Explorer", text: "I think the issue is in the useEffect dependency array." },
  { id: 2, user: "Aayush Kumar", text: "Let me check... if I add the state variable there, it loops." },
  { id: 3, user: "AI_Assistant", text: "Try using a ref to track the previous value instead." }
];