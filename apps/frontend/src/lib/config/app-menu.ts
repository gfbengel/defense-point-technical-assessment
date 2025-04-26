
import { SquareTerminal } from "lucide-react";

import { NavMainItemProps } from "@/view/components/nav-main";

export const appMenu: NavMainItemProps[] = [
  {
    title: 'General',

    icon: SquareTerminal,

    options: [
      {
        to: '/',
        label: 'Dashboard',
      },

      {
        to: '/ingredients',
        label: 'Ingredients',
      },

      // {
      //   to: '/recipes',
      //   label: 'Recipes',
      // },

      // {
      //   to: '/favorites',
      //   label: 'Favorites',
      // },

    ],
  },


]
