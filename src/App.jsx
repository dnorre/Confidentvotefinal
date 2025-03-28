...

{!isVoting ? (
  <div className="w-full max-w-xl space-y-4 pt-6 text-center">
    <div className="text-xl font-semibold">Share this link:</div>
    <div className="text-blue-600 underline break-all">
      {typeof window !== "undefined" && window.location.href}
    </div>
    <button
      className="text-lg px-8 py-4 rounded-2xl bg-green-600 text-white hover:bg-green-700 transition"
      onClick={() => setIsVoting(true)}
    >
      Vote
    </button>
  </div>
) : (
  <div className="w-full max-w-xl space-y-4">
    
    {/* ✅ Nytt block för Share this link under röstning */}
    <div className="text-center space-y-2">
      <div className="text-xl font-semibold">Share this link:</div>
      <div className="text-blue-600 underline break-all">
        {typeof window !== "undefined" && window.location.href}
      </div>
    </div>

    <div className="text-lg font-medium">Question: {question}</div>
    <input
      placeholder="Your name"
      className="border p-2 rounded w-full"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <input
      type="number"
      placeholder="Score (1-10)"
      className="border p-2 rounded w-full"
      value={score}
      onChange={(e) => setScore(e.target.value)}
    />
    <button
      className="text-lg px-8 py-4 rounded-2xl bg-purple-600 text-white hover:bg-purple-700 transition"
      onClick={submitVote}
    >
      Submit vote
    </button>
  </div>
)}

...
