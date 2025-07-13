import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Trophy, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface LeaderboardEntry {
  user_id: string;
  full_name: string | null;
  total_points: number;
  current_level: number;
  rank: number;
  isCurrentUser: boolean;
}

const LeaderboardComponent = () => {
  const { user, userProfile } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    loadLeaderboard();
  }, [user]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);

      // Get top 10 users by points
      const { data: topUsers, error: topUsersError } = await supabase
        .from('profiles')
        .select('user_id, full_name, total_points, current_level')
        .order('total_points', { ascending: false })
        .order('current_level', { ascending: false })
        .limit(10);

      if (topUsersError) throw topUsersError;

      // Get current user's rank
      let currentUserRank = null;
      if (user && userProfile) {
        const { data: rankData, error: rankError } = await supabase
          .rpc('get_user_rank', { user_id_param: user.id as any });

        if (!rankError && rankData !== null) {
          currentUserRank = rankData;
        }
      }

      // Format leaderboard data
      const formattedLeaderboard: LeaderboardEntry[] = (topUsers || []).map((profile, index) => ({
        user_id: profile.user_id,
        full_name: profile.full_name || 'Anonymous User',
        total_points: profile.total_points || 0,
        current_level: profile.current_level || 1,
        rank: index + 1,
        isCurrentUser: user ? profile.user_id === user.id : false
      }));

      // If current user is not in top 10, add them at the end
      if (user && userProfile && currentUserRank && currentUserRank > 10) {
        const isAlreadyInList = formattedLeaderboard.some(entry => entry.user_id === user.id);
        
        if (!isAlreadyInList) {
          formattedLeaderboard.push({
            user_id: user.id,
            full_name: userProfile.full_name || 'You',
            total_points: userProfile.total_points || 0,
            current_level: userProfile.current_level || 1,
            rank: currentUserRank,
            isCurrentUser: true
          });
        }
      }

      setLeaderboard(formattedLeaderboard);
      setUserRank(currentUserRank);

    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Trophy className="w-5 h-5 text-amber-600" />;
      default:
        return <Star className="w-5 h-5 text-primary" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default:
        return 'bg-primary/20';
    }
  };

  if (loading) {
    return (
      <Card className="islamic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            Community Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted"></div>
                  <div className="space-y-1">
                    <div className="w-24 h-4 bg-muted rounded"></div>
                    <div className="w-16 h-3 bg-muted rounded"></div>
                  </div>
                </div>
                <div className="w-12 h-6 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="islamic-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          Community Leaderboard
        </CardTitle>
        {userRank && (
          <p className="text-sm text-muted-foreground">
            Your current rank: #{userRank}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboard.map((entry) => (
            <div
              key={entry.user_id}
              className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                entry.isCurrentUser
                  ? 'bg-primary/10 border border-primary/20 shadow-sm'
                  : 'bg-muted/50 hover:bg-muted/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankColor(entry.rank)}`}>
                  {entry.rank <= 3 ? (
                    getRankIcon(entry.rank)
                  ) : (
                    <span className="text-sm font-bold text-white">#{entry.rank}</span>
                  )}
                </div>
                <div>
                  <p className="font-medium flex items-center gap-2">
                    {entry.isCurrentUser ? 'You' : entry.full_name}
                    {entry.isCurrentUser && (
                      <Badge variant="outline" className="text-xs">You</Badge>
                    )}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Level {entry.current_level}</span>
                    {entry.rank <= 3 && (
                      <Badge variant="secondary" className="text-xs">
                        Top {entry.rank}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary text-lg">{entry.total_points.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
            </div>
          ))}
          
          {leaderboard.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Data Yet</h3>
              <p className="text-muted-foreground">
                Complete lessons and earn points to appear on the leaderboard!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardComponent;