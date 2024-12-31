import { create } from 'zustand'
import { supabase } from '../lib/supabase'

interface WheelState {
  names: string[]
  selectedNames: string[]
  isSpinning: boolean
  winner: string | null
  fetchNames: () => Promise<void>
  addName: (name: string) => Promise<void>
  removeName: (name: string) => Promise<void>
  spin: () => Promise<void>
  reset: () => Promise<void>
}

export const useWheelStore = create<WheelState>((set, get) => ({
  names: [],
  selectedNames: [],
  isSpinning: false,
  winner: null,

  fetchNames: async () => {
    const { data } = await supabase
      .from('names')
      .select('*')
      .eq('selected', false)
    
    if (data) {
      set({ names: data.map(n => n.name) })
    }
  },

  addName: async (name: string) => {
    await supabase.from('names').insert({ name, selected: false })
    get().fetchNames()
  },

  removeName: async (name: string) => {
    await supabase.from('names').delete().eq('name', name)
    get().fetchNames()
  },

  spin: async () => {
    set({ isSpinning: true })
    
    // Simulate spinning delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const { names, selectedNames } = get()
    const availableNames = names.filter(name => !selectedNames.includes(name))
    
    if (availableNames.length === 0) {
      set({ isSpinning: false, winner: null })
      return
    }
    
    const winner = availableNames[Math.floor(Math.random() * availableNames.length)]
    
    await supabase
      .from('names')
      .update({ selected: true })
      .eq('name', winner)
    
    set(state => ({
      isSpinning: false,
      winner,
      selectedNames: [...state.selectedNames, winner]
    }))
    
    get().fetchNames()
  },

  reset: async () => {
    await supabase
      .from('names')
      .update({ selected: false })
      .not('id', 'is', null)
    
    set({ selectedNames: [], winner: null })
    get().fetchNames()
  }
}))