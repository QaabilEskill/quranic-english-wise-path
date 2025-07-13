-- Create function to get user rank
CREATE OR REPLACE FUNCTION get_user_rank(user_id_param UUID)
RETURNS INTEGER AS $$
DECLARE
  user_rank INTEGER;
BEGIN
  SELECT rank_position INTO user_rank
  FROM (
    SELECT 
      user_id,
      ROW_NUMBER() OVER (ORDER BY total_points DESC, current_level DESC, created_at ASC) as rank_position
    FROM profiles
    WHERE total_points > 0 OR current_level > 1
  ) ranked_users
  WHERE user_id = user_id_param;
  
  RETURN COALESCE(user_rank, 0);
END;
$$ LANGUAGE plpgsql;