import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
  "https://ybtpkxjgrnlfyjlggumx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidHBreGpncm5sZnlqbGdndW14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNzE1NjcsImV4cCI6MjA1ODY0NzU2N30.iBIKXC36S2_Ad-yrNWchOpHT5f6GmXsyXbKCisH6nrM"
);

// ...rest of the code (taken from canvas)
 