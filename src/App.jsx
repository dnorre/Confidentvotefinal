
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { HomeIcon } from "@heroicons/react/24/solid";

const SUPABASE_URL = "https://ybtpkxjgrnlfyjlggumx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidHBreGpncm5sZnlqbGdndW14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNzE1NjcsImV4cCI6MjA1ODY0NzU2N30.iBIKXC36S2_Ad-yrNWchOpHT5f6GmXsyXbKCisH6nrM";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function ConfidenceVote() {
  const [sessionId, setSessionId] = useState("");
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [votes, setVotes] = useState([]);
  const [isVoting, setIsVoting] = useState(false);
  const [copied, setCopied] = useState(false);


  useEffect(() => {
    const path = window.location.pathname;
    const id = path.startsWith("/vote/") ? path.split("/vote/")[1] : "";
    if (id) {
      setSessionId(id);
      fetchSession(id);
    }
  }, []);

  const fetchSession = async (id) => {
    const { data: session } = await supabase.from("sessions").select().eq("id", id).single();
    if (session) {
      setQuestion(session.question);
      const { data: votes } = await supabase.from("votes").select().eq("session_id", id);
      setVotes(votes || []);
    }
  };

  const createSession = async () => {
    const newId = uuidv4();
    const { error } = await supabase.from("sessions").insert({ id: newId, question });
    if (!error) {
      setSessionId(newId);
      window.history.pushState({}, "", `/vote/${newId}`);
    }
  };

  const submitVote = async () => {
    if (!name || !score) return;
    const newVote = { id: uuidv4(), session_id: sessionId, name, score: Number(score) };
    const { error } = await supabase.from("votes").insert(newVote);
    if (!error) {
      setVotes([...votes, newVote]);
      setName("");
      setScore("");
    }
  };

  const deleteVote = async (voteId) => {
    const { error } = await supabase.from("votes").delete().eq("id", voteId);
    if (!error) {
      setVotes(votes.filter((v) => v.id !== voteId));
    }
  };

  const calculateAverage = () => {
    const valid = votes.map((v) => v.score).filter((v) => !isNaN(v));
    const sum = valid.reduce((a, b) => a + b, 0);
    return valid.length ? (sum / valid.length).toFixed(2) : "-";
  };

  const sortedVotes = [...votes].sort((a, b) => a.name.localeCompare(b.name));

  const goHome = () => {
    setSessionId("");
    setQuestion("");
    setVotes([]);
    setIsVoting(false);
    window.history.pushState({}, "", "/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-6 space-y-6 bg-gray-50 text-gray-800">
      <button
        className="fixed top-4 left-4 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded shadow"
        onClick={goHome}
      >
        <HomeIcon className="h-4 w-4" /> Home
      </button>

      {!sessionId ? (
        <div className="w-full max-w-xl space-y-6 pt-10 text-center">
          <h1 className="text-2xl font-bold">Create a Confidence Vote</h1>
          <input
            placeholder="What are you voting on?"
            className="border p-2 rounded w-full"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            className="text-lg px-8 py-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={createSession}
          >
            Create vote
          </button>
        </div>
      ) : (
        <>
          {!isVoting ? (
            <div className="w-full max-w-xl space-y-4 pt-6 text-center">
             <div className="text-center space-y-2">
  <div className="text-xl font-semibold">Share this link:</div>
  <div className="flex items-center justify-center gap-2">
    <span className="text-blue-600 underline break-all">
      {typeof window !== "undefined" && window.location.href}
    </span>
    <button
      onClick={() => {
        navigator.clipboard.writeText(window.location.href); // 👈 Kopierar länken
        setCopied(true);                                     // 👈 Visar "Copied!"
        setTimeout(() => setCopied(false), 2000);            // 👈 Döljer det efter 2 sek
      }}
      title="Copy link"
      className="hover:text-blue-800"
    >
      <ClipboardIcon className="w-5 h-5" /> {/* 👈 Ikonen */}
    </button>
    {copied && <span className="text-green-600 text-sm">✔ Copied!</span>} {/* 👈 Texten */}
  </div>
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
              <div className="text-center space-y-2">
        <div className="text-center space-y-2">
  <div className="text-xl font-semibold">Share this link:</div>
  <div className="flex items-center justify-center gap-2">
    <span className="text-blue-600 underline break-all">
      {typeof window !== "undefined" && window.location.href}
    </span>
    <button
      onClick={() => {
        navigator.clipboard.writeText(window.location.href); // 👈 Kopierar länken
        setCopied(true);                                     // 👈 Visar "Copied!"
        setTimeout(() => setCopied(false), 2000);            // 👈 Döljer det efter 2 sek
      }}
      title="Copy link"
      className="hover:text-blue-800"
    >
      <ClipboardIcon className="w-5 h-5" /> {/* 👈 Ikonen */}
    </button>
    {copied && <span className="text-green-600 text-sm">✔ Copied!</span>} {/* 👈 Texten */}
  </div>
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

          <div className="w-full max-w-xl">
            <div className="pt-6 text-center space-y-4">
              <div className="text-xl font-semibold">Results</div>
              <div className="text-lg">Question: {question}</div>
              <div className="text-2xl">Average score: {calculateAverage()}</div>
              <div className="text-sm text-gray-500">
                {votes.length} participant(s) have voted
              </div>
              <div className="space-y-1">
                {sortedVotes.map((v) => (
                  <div key={v.id} className="text-sm flex justify-between items-center px-4">
                    <span>{v.name}: {v.score}</span>
                    <button
                      className="text-xs bg-red-500 text-white hover:bg-red-600 px-2 py-1 rounded"
                      onClick={() => deleteVote(v.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
