import Angry from "@/components/emojis/Angry";
import Disgusted from "@/components/emojis/Disgusted";
import Fearful from "@/components/emojis/Fearful";
import Happy from "@/components/emojis/Happy";
import Neutral from "@/components/emojis/Neutral";
import Sad from "@/components/emojis/Sad";
import Surprised from "@/components/emojis/Surprised";

function EmptyChatContainer() {
  return (
    <div className="flex-1 bg-[#1c1d25] flex flex-col justify-center items-center duration-1000 transition-all">
      <div className="text-center max-w-md px-6">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 animate-spin-slow"></div>
        
        </div>

        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          Welcome to FeeloChat
        </h2>

        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          Ready to express yourself? Select a chat and let your expressions talk ✨
        </p>

        <div className="flex justify-center gap-6 text-4xl mb-10">
          {[
            <Neutral />,
            <Happy />,
            <Sad />,
            <Surprised />,
            <Angry />,
            <Disgusted />,
            <Fearful />,
          ].map((emoji, index) => (
            <span
              key={index}
              className="transform hover:scale-110 transition-transform cursor-pointer"
              style={{
                animation: "float 3s infinite",
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {emoji}
            </span>
          ))}
        </div>

        <div className="bg-[#2c2e3b] rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm border border-[#3a3b45]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-sm">⚠️</span>
            </div>
            <h3 className="font-semibold text-white">Privacy? Yeah, We Got That!</h3>
          </div>
          <ul className="space-y-3 text-gray-400">
            {[
              "Chats are end-to-end encrypted",
              "Your camera reads emotions, not secrets.",
              "All processing stays on your device.",
              "Only emotions, no faces shared.",
              
            ].map((tip, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default EmptyChatContainer;