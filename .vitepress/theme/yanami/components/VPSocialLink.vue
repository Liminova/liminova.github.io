<script lang="ts" setup>
import { computed } from "vue";
import type { SocialLinkIcon } from "../../../config.mts";
import { AtSign } from "lucide-vue-next";
import { OsuIcon } from "vue3-simple-icons";

const props = defineProps<{
	icon: SocialLinkIcon;
	link: string;
	ariaLabel?: string;
}>();

const svg = computed(() => {
	if (typeof props.icon === "object") {
		// eslint-disable-next-line prefer-object-has-own
		if (Object.prototype.hasOwnProperty.call(props.icon, "svg")) {
			return props.icon.svg;
		}

		return "";
	}

	if (!["osu", "mail"].includes(props.icon)) {
		return `<span class="vpi-social-${props.icon}" />`;
	}

	return "";
});

const icon = computed(() => {
	if (typeof props.icon === "object") {
		return "";
	}

	if (["osu", "mail"].includes(props.icon)) {
		return props.icon;
	}

	return "";
});
</script>

<template>
	<a
		class="VPSocialLink no-icon"
		:href="link"
		:aria-label="ariaLabel ?? (typeof icon === 'string' ? icon : '')"
		target="_blank"
		rel="noopener"
		v-html="svg"
		v-if="svg"
	></a>
	<a
		class="VPSocialLink no-icon"
		:href="link"
		:aria-label="ariaLabel ?? (typeof icon === 'string' ? icon : '')"
		target="_blank"
		rel="noopener"
		v-if="icon"
	>
		<AtSign v-if="icon === 'mail'" />
		<OsuIcon v-if="icon === 'osu'" />
	</a>
</template>

<style scoped>
.VPSocialLink {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 36px;
	height: 36px;
	color: var(--vp-c-text-2);
	transition: color 0.5s;
}

.VPSocialLink:hover {
	color: var(--vp-c-text-1);
	transition: color 0.25s;
}

.VPSocialLink > :deep(svg),
.VPSocialLink > :deep([class^="vpi-social-"]) {
	width: 20px;
	height: 20px;
	/* fill: currentColor; */
}
</style>
