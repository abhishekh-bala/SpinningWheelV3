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
      names: {
        Row: {
          id: number
          name: string
          created_at: string
          selected: boolean
        }
        Insert: {
          id?: number
          name: string
          created_at?: string
          selected?: boolean
        }
        Update: {
          id?: number
          name?: string
          created_at?: string
          selected?: boolean
        }
      }
      admin: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
    }
  }
}