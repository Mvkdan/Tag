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
      email_logs: {
        Row: {
          error_message: string | null
          id: string
          order_id: string | null
          sent_at: string
          status: string
          template_name: string | null
        }
        Insert: {
          error_message?: string | null
          id?: string
          order_id?: string | null
          sent_at?: string
          status: string
          template_name?: string | null
        }
        Update: {
          error_message?: string | null
          id?: string
          order_id?: string | null
          sent_at?: string
          status?: string
          template_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_logs_template_name_fkey"
            columns: ["template_name"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["name"]
          },
        ]
      }
      email_templates: {
        Row: {
          created_at: string
          html_content: string
          id: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string
          html_content: string
          id?: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string
          html_content?: string
          id?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          image: string
          name: string
          order_id: string
          price: number
          product_id: string
          quantity: number
        }
        Insert: {
          id?: string
          image: string
          name: string
          order_id: string
          price: number
          product_id: string
          quantity: number
        }
        Update: {
          id?: string
          image?: string
          name?: string
          order_id?: string
          price?: number
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          address: string
          city: string
          created_at: string
          discount: number | null
          email: string
          error_message: string | null
          first_name: string
          id: string
          last_name: string
          payment_date: string | null
          phone: string
          postal_code: string
          promo_code: string | null
          shipping_cost: number
          shipping_method: string
          status: string
          status_timeline: Json[] | null
          stripe_payment_intent_id: string | null
          total: number
          user_id: string | null
        }
        Insert: {
          address: string
          city: string
          created_at?: string
          discount?: number | null
          email: string
          error_message?: string | null
          first_name: string
          id?: string
          last_name: string
          payment_date?: string | null
          phone: string
          postal_code: string
          promo_code?: string | null
          shipping_cost: number
          shipping_method: string
          status?: string
          status_timeline?: Json[] | null
          stripe_payment_intent_id?: string | null
          total: number
          user_id?: string | null
        }
        Update: {
          address?: string
          city?: string
          created_at?: string
          discount?: number | null
          email?: string
          error_message?: string | null
          first_name?: string
          id?: string
          last_name?: string
          payment_date?: string | null
          phone?: string
          postal_code?: string
          promo_code?: string | null
          shipping_cost?: number
          shipping_method?: string
          status?: string
          status_timeline?: Json[] | null
          stripe_payment_intent_id?: string | null
          total?: number
          user_id?: string | null
        }
        Relationships: []
      }
      stripe_webhook_events: {
        Row: {
          error_message: string | null
          id: string
          payload: Json
          processed_at: string | null
          received_at: string
          status: string
          stripe_event_id: string
          type: string
        }
        Insert: {
          error_message?: string | null
          id?: string
          payload: Json
          processed_at?: string | null
          received_at?: string
          status?: string
          stripe_event_id: string
          type: string
        }
        Update: {
          error_message?: string | null
          id?: string
          payload?: Json
          processed_at?: string | null
          received_at?: string
          status?: string
          stripe_event_id?: string
          type?: string
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
