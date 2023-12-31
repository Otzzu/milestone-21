export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      activities: {
        Row: {
          created_at: string
          desc: string | null
          id: string
          img: string | null
          name: string | null
          tag: string | null
        }
        Insert: {
          created_at?: string
          desc?: string | null
          id?: string
          img?: string | null
          name?: string | null
          tag?: string | null
        }
        Update: {
          created_at?: string
          desc?: string | null
          id?: string
          img?: string | null
          name?: string | null
          tag?: string | null
        }
        Relationships: []
      }
      review: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          tags: string[] | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          tags?: string[] | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          tags?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "review_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          faculty: string | null
          full_name: string | null
          id: string
          major: string | null
          roadmap_data: Json | null
          role: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          faculty?: string | null
          full_name?: string | null
          id: string
          major?: string | null
          roadmap_data?: Json | null
          role?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          faculty?: string | null
          full_name?: string | null
          id?: string
          major?: string | null
          roadmap_data?: Json | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
