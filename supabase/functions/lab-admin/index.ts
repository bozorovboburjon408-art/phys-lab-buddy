import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LAB_ADMIN_PASSWORD = "admin77";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, password, ...data } = await req.json();

    // Verify admin password
    if (password !== LAB_ADMIN_PASSWORD) {
      console.log("Invalid lab admin password attempt");
      return new Response(
        JSON.stringify({ success: false, error: "Noto'g'ri parol" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Lab admin action: ${action}`);

    switch (action) {
      case "verify": {
        return new Response(
          JSON.stringify({ success: true, message: "Parol to'g'ri" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "add": {
        const { title, title_uz, purpose, purpose_uz, equipment, equipment_uz, theory, theory_uz, procedure, procedure_uz, table_columns, sort_order } = data;
        
        const { data: item, error } = await supabase
          .from("laboratories")
          .insert({
            title,
            title_uz,
            purpose,
            purpose_uz,
            equipment: equipment || [],
            equipment_uz: equipment_uz || [],
            theory,
            theory_uz,
            procedure: procedure || [],
            procedure_uz: procedure_uz || [],
            table_columns: table_columns || [],
            sort_order: sort_order || 0,
          })
          .select()
          .single();

        if (error) {
          console.error("Error adding lab:", error);
          return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        console.log("Lab added successfully:", item.id);
        return new Response(
          JSON.stringify({ success: true, item }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "update": {
        const { id, ...updateData } = data;
        
        const { data: item, error } = await supabase
          .from("laboratories")
          .update(updateData)
          .eq("id", id)
          .select()
          .single();

        if (error) {
          console.error("Error updating lab:", error);
          return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        console.log("Lab updated successfully:", id);
        return new Response(
          JSON.stringify({ success: true, item }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "delete": {
        const { id } = data;
        
        const { error } = await supabase
          .from("laboratories")
          .delete()
          .eq("id", id);

        if (error) {
          console.error("Error deleting lab:", error);
          return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        console.log("Lab deleted successfully:", id);
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ success: false, error: "Noma'lum amal" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Noma'lum xato";
    console.error("Error in lab-admin function:", error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
