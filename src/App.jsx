import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { HomeIcon } from "@heroicons/react/24/solid";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function ConfidenceVote() {
  return <div>Hello World</div>;
}

export default ConfidenceVote;
