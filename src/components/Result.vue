<script setup>

    import { onMounted, computed, ref, watch } from 'vue';
    import { useDataStore } from '../store/dataStore.js'
    import { useRouter } from 'vue-router'

    const store = useDataStore();
    const router = useRouter();

    const followersShow = ref(0);
    const followingShow = ref(0);
    const mutualFollowShow = ref(0);
    const youNotFollowShow = ref(0);
    const notFollowBackShow = ref(0);
    const followBackPercentageShow = ref(0);

    const showModal = ref(false);

    
    watch(showModal, (val) => {
        if (val) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    })
    
    const mutualFollow = computed(() =>
        store.followers.filter(f => store.following.some(fl => fl.value === f.value))
    )

    const notFollowBack = computed(() =>
        store.following.filter(f => !store.followers.some(fl => fl.value === f.value))
    )

    const youNotFollow = computed(() =>
        store.followers.filter(f => !store.following.some(fl => fl.value === f.value))
    )

    const followBackPercentage = computed(() => {
        if (store.following.length === 0) return 0
        return ((mutualFollow.value.length / store.following.length) * 100).toFixed(2)
    })

    function exit () {
        router.push('/')
    }

    function exitWithClear () {
        store.clearLocal('followers');
        store.clearLocal('following');
        router.push('/')
    }

    function animateCounter (refVar, target, duration = 1000) {
        let startValue = 0;
        let startTime = performance.now();

        function update (currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            refVar.value = Math.floor(startValue + (target - startValue) * progress);

            if (progress < 1) {
                requestAnimationFrame(update)
            }
        }

        requestAnimationFrame(update);
    }

    onMounted(() => {
        store.loadFromStorage();
        animateCounter(followersShow, store.followers.length, 2500);
        animateCounter(followingShow, store.following.length, 2500);
        animateCounter(mutualFollowShow, mutualFollow.value.length, 2500);
        animateCounter(youNotFollowShow, youNotFollow.value.length, 2500);
        animateCounter(notFollowBackShow, notFollowBack.value.length, 2500);
        animateCounter(followBackPercentageShow, followBackPercentage.value, 2500);
    })


</script>

<template>
    <div class="container">

        <div class="top-bar">
            <div class="logo">
                <div @click="showModal = true" style="cursor: pointer;">
                    <span style="color: var(--accent);"><font-awesome-icon icon="angle-left"/></span>
                    <span style="font-weight: 400; color: var(--accent);">Insta</span> <span style="font-weight: 700; color: var(--text-second);">Stats</span>
                </div>
            </div>
            <div class="icon">
                <a href="https://github.com/amdrydho26/InstaStats.git" target="_blank"><font-awesome-icon icon="code" /></a>
            </div>
        </div>

        <div class="stats">
            <h1>Statistik</h1>
            <div class="stat">
                <div class="stat-item">
                    <p class="title">Total Pengikut</p>
                    <p class="count">{{ followersShow }}</p>
                </div>
                <div class="stat-item">
                    <p class="title">Total Mengikuti</p>
                    <p class="count">{{ followingShow }}</p>
                </div>
                <div class="stat-item">
                    <p class="title">Saling Mengikuti</p>
                    <p class="count">{{ mutualFollowShow }}</p>
                </div>
                <div class="stat-item">
                    <p class="title">Kamu Tidak Follback</p>
                    <p class="count">{{ youNotFollowShow }}</p>
                </div>
                <div class="stat-item">
                    <p class="title">Tidak Follback Kamu</p>
                    <p class="count">{{ notFollowBackShow }}</p>
                </div>
                <div class="stat-item">
                    <p class="title">Tingkat Follback Kamu</p>
                    <p class="count">{{ followBackPercentageShow }}%</p>
                </div>
            </div>
        </div>

        <div class="content">
            <h1>Saling Mengikuti <span style="font-size: 1.5rem; color: var(--accent);">{{ mutualFollow.length }}</span></h1>
            <p>Orang yang mengikuti kamu dan kamu ikuti balik</p>
            <div class="table">
                <table>
                    <tr v-for="user in mutualFollow" :key="user.href">
                        <td class="name"><a :href="user.href" target="_blank">{{ user.value }}</a></td>
                        <td class="date">{{ user.timestamp }}</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="content">
            <h1>Tidak follow kamu balik <span style="font-size: 1.5rem; color: var(--accent);">{{ notFollowBack.length }}</span></h1>
            <p>Orang yang kamu ikuti tapi mereka tidak mengikuti kamu balik</p>
            <div class="table">
                <table>
                    <tr v-for="user in notFollowBack" :key="user.href">
                        <td class="name"><a :href="user.href" target="_blank">{{ user.value }}</a></td>
                        <td class="date">{{ user.timestamp }}</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="content">
            <h1>Kamu Tidak Follow Balik <span style="font-size: 1.5rem; color: var(--accent);">{{ youNotFollow.length }}</span></h1>
            <p>Orang yang mengikuti kamu tapi kamu tidak mengikuti mereka balik</p>
            <div class="table">
                <table>
                    <tr v-for="user in youNotFollow" :key="user.href">
                        <td class="name"><a :href="user.href" target="_blank">{{ user.value }}</a></td>
                        <td class="date">{{ user.timestamp }}</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="content">
            <h1>Semua pengikut <span style="font-size: 1.5rem; color: var(--accent);">{{ store.followers.length }}</span></h1>
            <br>
            <div class="table">
                <table>
                    <tr v-for="user in store.followers" :key="user.href">
                        <td class="name"><a :href="user.href" target="_blank">{{ user.value }}</a></td>
                        <td class="date">{{ user.timestamp }}</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="content">
            <h1>Semua yang Diikuti <span style="font-size: 1.5rem; color: var(--accent);">{{ store.following.length }}</span></h1>
            <br>
            <div class="table">
                <table>
                    <tr v-for="user in store.following" :key="user.href">
                        <td class="name"><a :href="user.href" target="_blank">{{ user.value }}</a></td>
                        <td class="date">{{ user.timestamp }}</td>
                    </tr>
                </table>
            </div>
        </div>

        <div v-if="showModal" class="exit-modal">
            <div class="modal-bg">
                <div class="modal">
                    <h2>Konfirmasi Kembali</h2>
                    <p>Yakin nih mau kembali? Data sebelumnya mau dibersihkan atau dibiarin aja?</p>
                    <div class="btn">
                        <div class="cancel">
                            <button @click="showModal = false">Batal</button>
                        </div>
                        <div class="exit">
                            <button class="not-clear" @click="exit()">Biarin aja</button>
                            <button class="clear" @click="exitWithClear()">Bersihkan Data</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>© Copyright (c) 2025 amdrydho26. All right reserved.</p>
        </div>

    </div>
</template>

<style scoped>

    a {
        text-decoration: none;
        color: var(--accent);
    }

    .container {
        /* background-color: gray;  */
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .container .top-bar {
        background-color: var(--bg-second);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 60%;
        margin-top: 1rem;
        padding: 20px 0 20px;
        border-radius: 16px;
        animation: fadeInDown 1s ease forwards;
    }

    .container .top-bar .logo {
        font-size: 1rem;
        margin-left: 20px;
    }

    .container .top-bar .icon {
        margin-right: 20px;
    }

    .container .top-bar .icon a{
        color: var(--accent);
        margin-left: 16px;
    }

    .container .stats {
        width: 60%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        padding-top: 0;   
        animation: fade 1s ease forwards;    
    }

    .container .stats .stat {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 10px;
    }

    .container .stats .stat .stat-item {
        background-color: var(--bg-second);
        border-radius: 16px;
        padding: 0 18px;

    }

    .container .stats .stat .stat-item .title {
        color: var(--text-second);
        margin-bottom: 0;
        margin-top: 16px;
        font-size: 0.8rem;
    }

    .container .stats .stat .stat-item .count {
        color: var(--text-prime);
        font-size: 2rem;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 16px;
    }

    .container .content {
        width: 60%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        padding-top: 0;
        animation: fadeInUp 1s ease forwards;
    }

    .container .content h1 {
        margin-bottom: 0;
    }

    .container .content p {
        margin: 0 0 16px 0;
        font-size: 0.8rem;
        color: var(--text-second);
    }

    .container .content .table {
        background-color: var(--bg-second);
        border-radius: 16px;
        max-height: 418px;
        overflow-x: hidden;
        overflow-y: scroll;
        scrollbar-width: none;
    }

    .container .content .table table {
        margin: 8px 16px 8px 16px;
        width: calc(100% - 34px);
        table-layout: fixed;
        border-collapse: collapse;
    }

    .container .content .table table td {
        padding: 8px 0 8px 0;
    }

    .container .content .table table tr td.name {
        text-align: start;
        color: var(--accent);
    }

    .container .content .table table tr .date {
        text-align: end;
        font-size: 10px;
        color: var(--text-second);
    }

    .container .exit-modal {
        width: 100%;
        height: 100vh;
        position: fixed;
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: grayscale(100%);
        z-index: 10;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        animation: fade 0.5s ease forwards;
    }

    .container .exit-modal .modal-bg {
        background-color: var(--bg-second);
        width: 35%;
        border-radius: 16px;
    }

    .container .exit-modal .modal-bg .modal {
        display: flex;
        flex-direction: column;
        margin: 16px 24px;
    }

    .container .exit-modal .modal-bg .modal h2 {
        margin: 18px 0 10px 0;
    }

    .container .exit-modal .modal-bg .modal p {
        margin: 12px 0 48px 0;
    }
    

    .container .exit-modal .modal-bg .modal .btn {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 16px;
    }

    .container .exit-modal .modal-bg .modal .btn .cancel button {
        padding: 12px;
        background-color: var(--text-prime);
        border: none;
        border-radius: 8px;
        color: var(--bg-prime);
        cursor: pointer;
    }

    .container .exit-modal .modal-bg .modal .btn .exit {
        display: flex;
        flex-direction: row;
        gap: 6px;
    }

    .container .exit-modal .modal-bg .modal .btn .exit .clear {
        padding: 12px;
        background-color: var(--accent);
        border: none;
        border-radius: 8px;
        color: var(--text-prime);
        cursor: pointer;
    }

    .container .exit-modal .modal-bg .modal .btn .exit .not-clear {
        padding: 12px;
        background-color: var(--bg-second);
        border: 2px solid var(--accent);
        border-radius: 8px;
        color: var(--accent);
        cursor: pointer;
    }

    .container .exit-modal .modal-bg .modal .btn .exit .not-clear:hover {
        background-color: var(--accent);
        color: var(--text-prime);
    }

    .container .footer {
        width: 100%;
        height: 50px;
        font-size: 12px;
        color: var(--text-second);
        background-color: var(--bg-second);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 32px;
    }

    @media (max-width: 800px) {
        .container .top-bar {
            width: 90%;
            min-width: 200px;
        }

        .container .stats {
            width: 90%;
            min-width: 200px;
        }

        .container .stats .stat {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 1fr);
        }

        .container .content {
            width: 90%;
            min-width: 200px;
        }

        .container .exit-modal .modal-bg {
            width: 90%;
            min-width: 200px;
        }

    }

</style>