<script setup>
const props = defineProps({
    name: String,
    value: [String, Number]
})
</script>

<template>
    <div class="video-info-line" v-if="props.value !== '' && props.value !== null && props.value !== undefined">
        <div class="video-info-line-name">{{ props.name }}</div>
        <div>:</div>
        <div class="video-info-line-value">{{ props.value }}</div>
    </div>
</template>

<style scoped>
.video-info-line {
    display: flex;
    margin: .25em 2rem .25em 0;
    line-height: 1.5em;
    user-select: text;
    font-size: 12px;
}

.video-info-line-name {
    width: 6rem;
    text-align: right;
    margin-right: .5em;
}

.video-info-line-value {
    margin-left: .65em;
    flex: 1;
}
</style>