<script setup>

    import { onMounted, computed } from 'vue';
    import { useDataStore } from '../store/dataStore.js'

    const store = useDataStore();

    onMounted(() => {
        store.loadFromStorage();
    })
    
    const mutualFollow = computed(() =>
        store.followers.filter(f => store.following.some(fl => fl.value === f.value))
    )

    const notFollowBack = computed(() =>
        store.following.filter(f => !store.followers.some(fl => fl.value === f.value))
    )

// 3. Tidak Kamu Ikuti Balik
    const youNotFollow = computed(() =>
        store.followers.filter(f => !store.following.some(fl => fl.value === f.value))
    )

// 4. Persentase Follow Back
    const followBackPercentage = computed(() => {
        if (store.following.length === 0) return 0
        return ((mutualFollow.value.length / store.following.length) * 100).toFixed(2)
    })


</script>

<template>
    <div class="container">

        <div class="top-bar">
            <div class="logo">
                <router-link to="/">
                    <span style="color: var(--accent);"><font-awesome-icon icon="angle-left"/></span>
                    <span style="font-weight: 400; color: var(--accent);">Insta</span> <span style="font-weight: 700; color: var(--text-second);">Stats</span>
                </router-link>
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
                    <p class="count">{{ store.followers.length }}</p>
                </div>
                <div class="stat-item">
                    <p class="title">Total Mengikuti</p>
                    <p class="count">{{ store.following.length }}</p>
                </div>
                <div class="stat-item">
                    <p class="title">Saling Mengikuti</p>
                    <p class="count">{{ mutualFollow.length }}</p>
                </div>
                <div class="stat-item">
                    <p class="title">Kamu Tidak Follback</p>
                    <p class="count">{{ youNotFollow.length }}</p>
                </div>
                <div class="stat-item">
                    <p class="title">Tidak Follback Kamu</p>
                    <p class="count">{{ notFollowBack.length }}</p>
                </div>
                <div class="stat-item">
                    <p class="title">Tingkat Follback Kamu</p>
                    <p class="count">{{ followBackPercentage }}%</p>
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
    }

</style>