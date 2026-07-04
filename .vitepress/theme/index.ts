import './style.css'
import type { EnhanceAppContext, Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import TeamMembers from './yanami/components/TeamMembers.vue'
import Blog from './yanami/layouts/Blog.vue'
import Contests from './yanami/layouts/Contests.vue'
import CustomLayout from './yanami/layouts/CustomLayout.vue'
import WallOfYanami from './yanami/layouts/WallOfYanami.vue'
import { goatcounter } from './yanami/plugins/goatcounter'

export default {
	extends: DefaultTheme,
	Layout: CustomLayout,
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	enhanceApp({ app }: EnhanceAppContext) {
		app.component('Blog', Blog)
		app.component('Contests', Contests)
		app.component('TeamMembers', TeamMembers)
		app.component('WallOfYanami', WallOfYanami)
		goatcounter({ id: 'liminova' })
	}
} satisfies Theme
