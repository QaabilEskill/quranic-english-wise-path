export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      bookmarks: {
        Row: {
          created_at: string | null
          id: string
          meaning: string | null
          phrase: string
          source_id: string | null
          source_type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          meaning?: string | null
          phrase: string
          source_id?: string | null
          source_type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          meaning?: string | null
          phrase?: string
          source_id?: string | null
          source_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      chat_history: {
        Row: {
          created_at: string | null
          id: string
          message: string
          response: string
          session_type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          response: string
          session_type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          response?: string
          session_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      daily_hadith: {
        Row: {
          created_at: string | null
          explanation: string | null
          hadith_text: string
          id: string
          source: string | null
          translation: string
        }
        Insert: {
          created_at?: string | null
          explanation?: string | null
          hadith_text: string
          id?: string
          source?: string | null
          translation: string
        }
        Update: {
          created_at?: string | null
          explanation?: string | null
          hadith_text?: string
          id?: string
          source?: string | null
          translation?: string
        }
        Relationships: []
      }
      duas: {
        Row: {
          arabic_text: string
          category: string | null
          created_at: string | null
          english_translation: string
          id: string
          occasion: string | null
          transliteration: string | null
        }
        Insert: {
          arabic_text: string
          category?: string | null
          created_at?: string | null
          english_translation: string
          id?: string
          occasion?: string | null
          transliteration?: string | null
        }
        Update: {
          arabic_text?: string
          category?: string | null
          created_at?: string | null
          english_translation?: string
          id?: string
          occasion?: string | null
          transliteration?: string | null
        }
        Relationships: []
      }
      islamic_stories: {
        Row: {
          content: string
          created_at: string | null
          id: string
          level: string | null
          moral_lesson: string | null
          title: string
          vocabulary_focus: string[] | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          level?: string | null
          moral_lesson?: string | null
          title: string
          vocabulary_focus?: string[] | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          level?: string | null
          moral_lesson?: string | null
          title?: string
          vocabulary_focus?: string[] | null
        }
        Relationships: []
      }
      lessons: {
        Row: {
          category: string | null
          content: string | null
          created_at: string | null
          description: string | null
          id: string
          is_islamic_themed: boolean | null
          level: number | null
          title: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_islamic_themed?: boolean | null
          level?: number | null
          title: string
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_islamic_themed?: boolean | null
          level?: number | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio_data: string | null
          created_at: string | null
          current_level: number | null
          demo_messages_used: number | null
          email: string | null
          full_name: string | null
          has_paid_access: boolean | null
          id: string
          phone_number: string | null
          total_points: number | null
          updated_at: string | null
          user_id: string
          user_type: string | null
        }
        Insert: {
          bio_data?: string | null
          created_at?: string | null
          current_level?: number | null
          demo_messages_used?: number | null
          email?: string | null
          full_name?: string | null
          has_paid_access?: boolean | null
          id?: string
          phone_number?: string | null
          total_points?: number | null
          updated_at?: string | null
          user_id: string
          user_type?: string | null
        }
        Update: {
          bio_data?: string | null
          created_at?: string | null
          current_level?: number | null
          demo_messages_used?: number | null
          email?: string | null
          full_name?: string | null
          has_paid_access?: boolean | null
          id?: string
          phone_number?: string | null
          total_points?: number | null
          updated_at?: string | null
          user_id?: string
          user_type?: string | null
        }
        Relationships: []
      }
      quiz_tests: {
        Row: {
          created_at: string | null
          id: string
          level: number
          passing_score: number | null
          questions: Json
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          level: number
          passing_score?: number | null
          questions: Json
          title: string
        }
        Update: {
          created_at?: string | null
          id?: string
          level?: number
          passing_score?: number | null
          questions?: Json
          title?: string
        }
        Relationships: []
      }
      quranic_words: {
        Row: {
          arabic_word: string
          context: string | null
          created_at: string | null
          english_meaning: string
          id: string
          transliteration: string | null
        }
        Insert: {
          arabic_word: string
          context?: string | null
          created_at?: string | null
          english_meaning: string
          id?: string
          transliteration?: string | null
        }
        Update: {
          arabic_word?: string
          context?: string | null
          created_at?: string | null
          english_meaning?: string
          id?: string
          transliteration?: string | null
        }
        Relationships: []
      }
      user_activity: {
        Row: {
          activity_type: string
          created_at: string
          duration_minutes: number | null
          id: string
          points_awarded: number | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          points_awarded?: number | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          points_awarded?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          lesson_id: string | null
          score: number | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          score?: number | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_test_results: {
        Row: {
          answers: Json | null
          completed_at: string | null
          id: string
          passed: boolean | null
          quiz_id: string
          score: number
          user_id: string
        }
        Insert: {
          answers?: Json | null
          completed_at?: string | null
          id?: string
          passed?: boolean | null
          quiz_id: string
          score: number
          user_id: string
        }
        Update: {
          answers?: Json | null
          completed_at?: string | null
          id?: string
          passed?: boolean | null
          quiz_id?: string
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_test_results_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quiz_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      vocabulary: {
        Row: {
          arabic_word: string | null
          category: string | null
          created_at: string | null
          english_word: string
          example_sentence: string | null
          id: string
          meaning: string
          pronunciation: string | null
        }
        Insert: {
          arabic_word?: string | null
          category?: string | null
          created_at?: string | null
          english_word: string
          example_sentence?: string | null
          id?: string
          meaning: string
          pronunciation?: string | null
        }
        Update: {
          arabic_word?: string | null
          category?: string | null
          created_at?: string | null
          english_word?: string
          example_sentence?: string | null
          id?: string
          meaning?: string
          pronunciation?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      award_points_for_activity: {
        Args: {
          user_id_param: string
          activity_type: string
          points_to_add?: number
        }
        Returns: undefined
      }
      get_user_rank: {
        Args: { user_id_param: string }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
