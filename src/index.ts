// === NECTAR API - Cloudflare Worker ===
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",                    // Allow all origins (change to your domain later for security)
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

// Handle preflight (OPTIONS) requests - Very Important!
function handleOptions(request) {
  return new Response(null, {
    headers: corsHeaders,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return handleOptions(request);
    }

    // === REGISTER ===
    if (url.pathname === "/register" && request.method === "POST") {
      try {
        const userData = await request.json();

        // TODO: Add your actual registration logic here
        // Example: Save to KV, D1 database, or just test response
        console.log("Register attempt:", userData.username);

        // For testing right now - return success
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Registration successful (test mode)" 
          }),
          { 
            headers: { 
              ...corsHeaders, 
              "Content-Type": "application/json" 
            } 
          }
        );

      } catch (err) {
        return new Response(
          JSON.stringify({ error: "Invalid data" }),
          { 
            status: 400, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
    }

    // === LOGIN ===
    if (url.pathname === "/login" && request.method === "POST") {
      try {
        const loginData = await request.json();

        // TODO: Add real login logic (check password, etc.)
        console.log("Login attempt:", loginData.username);

        return new Response(
          JSON.stringify({
            username: loginData.username,
            name: "Test Student",
            nis: 12345,
            uClass: "7A",
            exam_status: "Not Taken",
            // score: 85   // uncomment when you have score
          }),
          { 
            headers: { 
              ...corsHeaders, 
              "Content-Type": "application/json" 
            } 
          }
        );

      } catch (err) {
        return new Response(
          JSON.stringify({ error: "Invalid credentials" }),
          { 
            status: 401, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
    }

    // Default response
    return new Response(
      JSON.stringify({ message: "NECTAR API is running" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  },
};
