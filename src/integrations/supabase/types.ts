export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      inquiries: {
        Row: {
          created_at: string
          description: string
          id: string
          status: string
          tags: string[] | null
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          status?: string
          tags?: string[] | null
          title: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          status?: string
          tags?: string[] | null
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          inquiry_id: string
          offer_id: string | null
          sender_id: string
          status: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          inquiry_id: string
          offer_id?: string | null
          sender_id: string
          status?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          inquiry_id?: string
          offer_id?: string | null
          sender_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "inquiries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          created_at: string
          currency: string
          description: string
          id: string
          inquiry_id: string
          number_of_ratings: number | null
          price: number
          seller_id: string
          seller_rating: number | null
          status: string
          total_sales: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency: string
          description: string
          id?: string
          inquiry_id: string
          number_of_ratings?: number | null
          price: number
          seller_id: string
          seller_rating?: number | null
          status?: string
          total_sales?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          description?: string
          id?: string
          inquiry_id?: string
          number_of_ratings?: number | null
          price?: number
          seller_id?: string
          seller_rating?: number | null
          status?: string
          total_sales?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "offers_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "inquiries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          communication_language: string | null
          company_name: string
          company_number: string | null
          contact_name: string | null
          contact_position: string | null
          created_at: string
          currency: string | null
          description: string | null
          facebook: string | null
          founding_year: number | null
          id: string
          instagram: string | null
          linkedin: string | null
          phone: string | null
          pib: string | null
          postal_code: string | null
          preferred_communication: string | null
          region: string | null
          tags: string[] | null
          updated_at: string
          website: string | null
          working_hours: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          communication_language?: string | null
          company_name: string
          company_number?: string | null
          contact_name?: string | null
          contact_position?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          facebook?: string | null
          founding_year?: number | null
          id: string
          instagram?: string | null
          linkedin?: string | null
          phone?: string | null
          pib?: string | null
          postal_code?: string | null
          preferred_communication?: string | null
          region?: string | null
          tags?: string[] | null
          updated_at?: string
          website?: string | null
          working_hours?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          communication_language?: string | null
          company_name?: string
          company_number?: string | null
          contact_name?: string | null
          contact_position?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          facebook?: string | null
          founding_year?: number | null
          id?: string
          instagram?: string | null
          linkedin?: string | null
          phone?: string | null
          pib?: string | null
          postal_code?: string | null
          preferred_communication?: string | null
          region?: string | null
          tags?: string[] | null
          updated_at?: string
          website?: string | null
          working_hours?: string | null
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
