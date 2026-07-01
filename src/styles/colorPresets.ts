export type AccentKey = 'tomato' | 'sakura' | 'ocean' | 'emerald' | 'mustard' | 'gruvbox'

export const colorPresets: Record<AccentKey, { primary: string; light: string; label: string }> = {
  tomato:  { primary: '#D63731', light: '#EC443E', label: 'Tomato' },
  sakura:  { primary: '#E0639A', light: '#F085B8', label: 'Sakura' },
  ocean:   { primary: '#3B82F6', light: '#60A5FA', label: 'Ocean' },
  emerald: { primary: '#10B981', light: '#34D399', label: 'Emerald' },
  mustard: { primary: '#D97706', light: '#F59E0B', label: 'Mustard' },
  gruvbox: { primary: '#A8825A', light: '#C4A07A', label: 'Gruvbox' },
}
