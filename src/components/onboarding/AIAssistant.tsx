
interface AIAssistantProps {
  message: string;
}

export const AIAssistant = ({ message }: AIAssistantProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <p className="font-medium text-gray-700">AI Assistant:</p>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};
