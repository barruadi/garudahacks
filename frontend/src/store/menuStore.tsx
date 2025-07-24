import { create } from 'zustand'
import type { menuOption } from '@/types/menu.types';

interface MenuBarOption {
    selected: menuOption;
    setSelected: ( menuOpt: menuOption ) => void;
}

export const useMenuBarOption = create<MenuBarOption>(
    (set) => ({
        selected: 'Local Products',
        setSelected: (menuOpt) => set({ selected: menuOpt})
    })
)