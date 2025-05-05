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
      credit_applications: {
        Row: {
          all_loans_paid: boolean | null
          amount: number
          application_date: string
          created_at: string
          "E-Mail": string | null
          id: string
          installment_count: number
          kvkk_consent: boolean | null
          marketing_consent: boolean | null
          no_active_loans: boolean | null
          no_legal_proceedings: boolean | null
          notes: string | null
          result_date: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          all_loans_paid?: boolean | null
          amount: number
          application_date?: string
          created_at?: string
          "E-Mail"?: string | null
          id?: string
          installment_count: number
          kvkk_consent?: boolean | null
          marketing_consent?: boolean | null
          no_active_loans?: boolean | null
          no_legal_proceedings?: boolean | null
          notes?: string | null
          result_date?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          all_loans_paid?: boolean | null
          amount?: number
          application_date?: string
          created_at?: string
          "E-Mail"?: string | null
          id?: string
          installment_count?: number
          kvkk_consent?: boolean | null
          marketing_consent?: boolean | null
          no_active_loans?: boolean | null
          no_legal_proceedings?: boolean | null
          notes?: string | null
          result_date?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      findeks_reports: {
        Row: {
          created_at: string
          file_path: string | null
          id: string
          report_date: string
          score: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_path?: string | null
          id?: string
          report_date?: string
          score: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_path?: string | null
          id?: string
          report_date?: string
          score?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          birth_date: string | null
          city: string | null
          consent_updated_at: string | null
          district: string | null
          education_level: string | null
          full_name: string | null
          id: string
          kvkk_consent: boolean | null
          marketing_consent: boolean | null
          monthly_income: number | null
          occupation: string | null
          phone: string | null
          tc_kimlik: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          city?: string | null
          consent_updated_at?: string | null
          district?: string | null
          education_level?: string | null
          full_name?: string | null
          id: string
          kvkk_consent?: boolean | null
          marketing_consent?: boolean | null
          monthly_income?: number | null
          occupation?: string | null
          phone?: string | null
          tc_kimlik?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          city?: string | null
          consent_updated_at?: string | null
          district?: string | null
          education_level?: string | null
          full_name?: string | null
          id?: string
          kvkk_consent?: boolean | null
          marketing_consent?: boolean | null
          monthly_income?: number | null
          occupation?: string | null
          phone?: string | null
          tc_kimlik?: string | null
          updated_at?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
