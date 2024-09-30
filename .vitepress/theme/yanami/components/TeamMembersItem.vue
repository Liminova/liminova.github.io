<script setup lang="ts">
import { AtSign } from "lucide-vue-next";
import VPLink from "vitepress/dist/client/theme-default/components/VPLink.vue";
import { OsuIcon } from "vue3-simple-icons";
import type { TeamMember } from "../../../config.mjs";

withDefaults(
	defineProps<{
		size?: "small" | "medium";
		member: TeamMember;
	}>(),
	{
		size: "medium",
	}
);
</script>

<template>
	<article class="TeamMembersItem" :class="[size]">
		<div class="profile">
			<figure class="avatar">
				<video
					v-if="member.avatar && member.avatar.endsWith('.mp4')"
					class="avatar-img"
					:src="member.avatar"
					autoplay
					muted
					loop
					playsinline
				/>
				<img
					v-else-if="member.avatar"
					class="avatar-img"
					:src="member.avatar"
					:alt="member.name"
				/>
			</figure>

			<div class="data">
				<h1 class="name">
					{{ member.name }}
				</h1>
				<p v-if="member.title || member.org" class="affiliation">
					<span v-if="member.title" class="title">
						{{ member.title }}
					</span>
					<span v-if="member.title && member.org" class="at"> @ </span>
					<VPLink
						v-if="member.org"
						class="org"
						:class="{ link: member.orgLink }"
						:href="member.orgLink"
						no-icon
					>
						{{ member.org }}
					</VPLink>
				</p>
				<p v-if="member.desc" class="desc" v-html="member.desc" />

				<div v-if="member.links" class="links">
					<a
						v-for="{ link, icon } in member.links"
						:key="link"
						class="flex size-9 items-center justify-center !text-[var(--vp-c-text-2)] transition-colors duration-500 hover:!text-[var(--vp-c-text-1)] hover:duration-200"
						:href="link"
						:aria-label="`${icon}`"
						target="_blank"
						rel="noopener"
					>
						<AtSign v-if="icon === 'mail'" />
						<OsuIcon v-else-if="icon === 'osu'" />
						<span v-else :class="`vpi-social-${icon} w-5 h-5`" />
					</a>
				</div>
			</div>
		</div>

		<div v-if="member.sponsor" class="sponsor-link">
			<VPLink
				class="flex items-center justify-center bg-[var(--vp-c-bg-soft)] p-4 text-center text-sm font-medium text-[var(--vp-c-sponsor)] transition-colors duration-200"
				:href="member.sponsor"
				no-icon
			>
				<span class="vpi-heart sp-icon mr-2 text-[16px]" />
				{{ member.actionText || "Sponsor" }}
			</VPLink>
		</div>
	</article>
</template>

<style scoped>
.sponsor-link:hover,
.sponsor-link:focus {
	outline: none;
	color: var(--vp-c-white);
	background-color: var(--vp-c-sponsor);
}

.TeamMembersItem {
	display: flex;
	flex-direction: column;
	gap: 2px;
	border-radius: 12px;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.TeamMembersItem.small .profile {
	padding: 32px;
}

.TeamMembersItem.small .data {
	padding-top: 20px;
}

.TeamMembersItem.small .avatar {
	width: 64px;
	height: 64px;
}

.TeamMembersItem.small .name {
	line-height: 24px;
	font-size: 16px;
}

.TeamMembersItem.small .affiliation {
	padding-top: 4px;
	line-height: 20px;
	font-size: 14px;
}

.TeamMembersItem.small .desc {
	padding-top: 12px;
	line-height: 20px;
	font-size: 14px;
}

.TeamMembersItem.small .links {
	margin: 0 -16px -20px;
	padding: 10px 0 0;
}

.TeamMembersItem.medium .profile {
	padding: 48px 32px;
}

.TeamMembersItem.medium .data {
	padding-top: 24px;
	text-align: center;
}

.TeamMembersItem.medium .avatar {
	width: 96px;
	height: 96px;
}

.TeamMembersItem.medium .name {
	letter-spacing: 0.15px;
	line-height: 28px;
	font-size: 20px;
}

.TeamMembersItem.medium .affiliation {
	padding-top: 4px;
	font-size: 16px;
}

.TeamMembersItem.medium .desc {
	padding-top: 16px;
	max-width: 288px;
	font-size: 16px;
}

.TeamMembersItem.medium .links {
	margin: 0 -16px -12px;
	padding: 16px 12px 0;
}

.profile {
	flex-grow: 1;
	background-color: var(--vp-c-bg-soft);
}

.data {
	text-align: center;
}

.avatar {
	position: relative;
	flex-shrink: 0;
	margin: 0 auto;
	border-radius: 50%;
	box-shadow: var(--vp-shadow-3);
}

.avatar-img {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	border-radius: 50%;
	object-fit: cover;
	aspect-ratio: 1/1;
}

.name {
	margin: 0;
	font-weight: 600;
}

.affiliation {
	margin: 0;
	font-weight: 500;
	color: var(--vp-c-text-2);
}

.org.link {
	color: var(--vp-c-text-2);
	transition: color 0.25s;
}

.org.link:hover {
	color: var(--vp-c-brand-1);
}

.desc {
	margin: 0 auto;
}

.desc :deep(a) {
	font-weight: 500;
	color: var(--vp-c-brand-1);
	text-decoration-style: dotted;
	transition: color 0.25s;
}

.links {
	display: flex;
	justify-content: center;
	height: 56px;
}
</style>
