import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminPassword = Deno.env.get("ADMIN_PASSWORD")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, password, ...data } = await req.json();

    // Verify admin password
    if (password !== adminPassword) {
      console.log("Invalid admin password attempt");
      return new Response(
        JSON.stringify({ error: "Noto'g'ri parol" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Admin action: ${action}`);

    switch (action) {
      case "verify": {
        // Just verify password
        return new Response(
          JSON.stringify({ success: true, message: "Parol to'g'ri" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "add": {
        const { title, description, type, category, file_url, external_url } = data;
        
        const { data: item, error } = await supabase
          .from("library_items")
          .insert({
            title,
            description,
            type: type || "book",
            category,
            file_url,
            external_url,
          })
          .select()
          .single();

        if (error) {
          console.error("Error adding item:", error);
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        console.log("Item added successfully:", item.id);
        return new Response(
          JSON.stringify({ success: true, item }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "delete": {
        const { id } = data;
        
        const { error } = await supabase
          .from("library_items")
          .delete()
          .eq("id", id);

        if (error) {
          console.error("Error deleting item:", error);
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        console.log("Item deleted successfully:", id);
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "upload": {
        const { fileName, fileData, contentType } = data;
        
        // Decode base64 file data
        const binaryData = Uint8Array.from(atob(fileData), c => c.charCodeAt(0));
        
        const { data: uploadData, error } = await supabase.storage
          .from("library-files")
          .upload(fileName, binaryData, {
            contentType,
            upsert: true,
          });

        if (error) {
          console.error("Error uploading file:", error);
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data: publicUrl } = supabase.storage
          .from("library-files")
          .getPublicUrl(fileName);

        console.log("File uploaded successfully:", publicUrl.publicUrl);
        return new Response(
          JSON.stringify({ success: true, url: publicUrl.publicUrl }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: "Noma'lum amal" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Noma'lum xato";
    console.error("Error in library-admin function:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
