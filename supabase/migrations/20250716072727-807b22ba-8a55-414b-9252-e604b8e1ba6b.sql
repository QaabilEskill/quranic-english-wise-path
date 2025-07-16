-- Create trigger to award points for chat interactions
CREATE OR REPLACE TRIGGER award_chat_points_trigger
    AFTER INSERT ON chat_history
    FOR EACH ROW
    EXECUTE FUNCTION award_chat_points();

-- Update the edge function config in supabase/config.toml to ensure TTS function has correct settings
-- Also ensure all RLS policies are properly set