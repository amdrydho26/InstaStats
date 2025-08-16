<script setup>

    import { ref } from 'vue';
    import { useRouter } from 'vue-router'

    const router = useRouter();

    const text = ref("Lagi dikerjain...")

    setTimeout(() => {
        text.value = "Beres.";
    }, 1250);

    setTimeout(() => {
        text.value = "Sabar.";
    }, 1996);

    setTimeout(() => {
        router.replace('/result');
    }, 2000);

</script>

<template>
    <div class="container">
        <div class="content">
            <div class="video">
                <video autoplay muted playsinline>
                    <source src="../assets/loading.mp4" type="video/mp4">
                    Ini Loading
                </video>
            </div>
            <p>{{ text }}</p>
        </div>
    </div>
</template>

<style scoped>

    .container {
        width: 100%;
        height: 100vh;
        background-color: var(--bg-prime);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .container .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .container .content .video {
        width: 60px;
        height: 50px;
        margin-bottom: 8px;
    }

    .container .content .video video {
        width: 100%;
    }

    .container .content p {
        color: var(--text-second);
        font-size: 14px;
    }

</style>