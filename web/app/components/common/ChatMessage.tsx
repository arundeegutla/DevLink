export interface ChatMessage {
  messageContent: string;
  isSelfMessage: boolean;
  user: any;
}

export default function ChatMessage({
  messageContent,
  isSelfMessage,
  user,
}: ChatMessage) {
  return (
    <div className={`w-auto max-w-sm h-auto break-words ${isSelfMessage ? "bg-amber-500" : "bg-cyan-600"} ${isSelfMessage ? "self-end" : "self-start"} rounded-xl p-2 mt-2`}>
      <h1 className="font-medium">{messageContent}</h1>
    </div>
  )
}