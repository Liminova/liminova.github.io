<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
	HoverCardContent,
	type HoverCardContentProps,
	HoverCardPortal,
	useForwardProps,
} from "radix-vue";
import { type HTMLAttributes, computed } from "vue";
import { classname } from "../../../libs";

// adding "class" to the props, allow override tailwind classes
// setting "sideOffset" to 4 because shadcn-ui said so
const props = withDefaults(
	defineProps<HoverCardContentProps & { class?: HTMLAttributes["class"] }>(),
	{
		sideOffset: 4,
	}
);

// still props but without the "class"
const forwardedProps = useForwardProps(
	computed(() => {
		const { class: _, ...delegated } = props;

		return delegated;
	})
);
</script>

<template>
	<HoverCardPortal>
		<HoverCardContent
			v-bind="forwardedProps"
			:class="
				classname(
					'z-50 w-64 rounded-md border border-[color:var(--vp-c-border)] bg-[color:var(--vp-c-bg)] p-4 text-[color:var(--vp-c-text-1)] shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
					props.class
				)
			"
		>
			<slot />
		</HoverCardContent>
	</HoverCardPortal>
</template>
