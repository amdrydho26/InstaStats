<script setup>

    import { ref, watch } from 'vue';
    import { useRouter } from 'vue-router'
    import { useDataStore } from '../store/dataStore.js'

    const store = useDataStore();
    const router = useRouter();

    function handleFileChange(event, type){
        const file = event.target.files[0];
        
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target.result)
                
                if (type === 'followers') {
                    const followersList = jsonData.map(item => {
                        const data = item.string_list_data[0]
                        return {
                            href: data.href,
                            value: data.value,
                            timestamp: formatTimestamp(data.timestamp)
                        }
                    })
                    store.setFollowers(followersList);
                } else if (type === 'following') {
                    const followingList = jsonData.relationships_following.map(item => {
                        const data = item.string_list_data[0]
                        return {
                            href: data.href,
                            value: data.value,
                            timestamp: formatTimestamp(data.timestamp)
                        }
                    })
                    store.setFollowing(followingList);
                }
            } catch (err) {
                console.error(`gagal parsing file ${type} : ${err}`);
            }
        }

        reader.readAsText(file);
    }

    function formatTimestamp(unixTime) {
        const date = new Date(unixTime * 1000)
        return date.toLocaleString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    function submitData () {
        router.push('/result');
        store.loadFromStorage();
    }

</script>

<template>
    <div class="container">

        <div class="top-bar">
            <div class="logo">
                <router-link to="/">
                    <span style="font-weight: 400; color: var(--accent);">Insta</span> <span style="font-weight: 700; color: var(--text-second);">Stats</span>
                </router-link>
            </div>
            <div class="icon">
                <a href=""><font-awesome-icon icon="code" /></a>
                <a href="#guide"><font-awesome-icon icon="book" /></a>
            </div>
        </div>

        <div class="header">
            <p style="
                    background: #0D0D0D;
                    background: linear-gradient(to top, #0D0D0D 0%, #3457D5 60%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: 500;
                    font-size: 1.3rem;">Discover</p>
            <p style="
                    font-size: 3rem;"><span style="color: var(--accent); font-weight: 300;">Insta</span> <span style="color: var(--text-second); font-weight: 700;">Stats</span></p>
            <p style="
                    color: var(--text-second);
                    max-width: 90%;
                    align-self: center;
                    margin-top: 8px;">Instagram Analytics yang Bikin Kamu Paham Banget Siapa Sahabat Asli vs Ghost Follower!</p>
        </div>

        <div class="files">
            <h1>Upload File</h1>
            <p>Upload file <b>Followers_1.json</b> dan <b>Following.json</b> Kamu dibawah ini. Pastikan filenya sesuai, jangan sampai terbalik ya.</p>
            <div class="uploaded">
                <div class="file">
                    <p class="title">Followers_1.json</p>
                    <font-awesome-icon class="icon" icon="x"/>
                </div>
                <div class="file">
                    <p class="title">Following.json</p>
                    <font-awesome-icon class="icon" icon="x"/>
                </div>
            </div>
            <form>
                <div class="uploader">
                    <label for="followers">
                        <font-awesome-icon class="icon" icon="file"/>
                        <p class="title">Followers_1.json</p>
                    </label>
                    <input type="file" name="followers" id="followers" accept=".json" @change="e => handleFileChange(e, 'followers')">
                </div>
                <div class="uploader">
                    <label for="following">
                        <font-awesome-icon class="icon" icon="file"/>
                        <p class="title">Following.json</p>
                    </label>
                    <input type="file" name="following" id="following" accept=".json" @change="e => handleFileChange(e, 'following')">
                </div>
                <button @click="submitData()">Analisis Data</button>
            </form>
            
        </div>

        <div class="guide" id="guide">
            <h1>Cara mendapatkan file .JSON</h1>
            <ol>
                <li>Buka aplikasi <b>Instagram</b> dan pergi ke <b>Pengaturan</b>.</li>
                <li>Pilih <b>Pusat Akun</b>.</li>
                <li>Pada bagian <b>Pengaturan Akun</b>, pilih <b>Informasi dan izin Anda</b>.</li>
                <li>Kemudian pilih <b>Ekspor informasi Anda</b>. Jika anda diarahkan ke website, lakukan login jika belum.</li>
                <li>Selanjutnya pilih <b>Buat Ekspor</b> dan pilih <b>profil Anda</b> saat ini.</li>
                <li>Pilih <b>Ekspor ke perangkat</b>.</li>
                <li>Pilih <b>Sesuaikan Informasi</b> dan hapus semua centang kecuali <b>Pengikut dan mengikuti</b>. Jika sudah, pilih <b>Simpan</b>.</li>
                <li>Pilih <b>Rentang Tanggal</b> dan ubah menjadi <b>Sepanjang Waktu</b>. Jika sudah, pilih <b>Simpan</b>.</li>
                <li>Pilih <b>Format</b> dan ganti menjadi <b>JSON</b>. Jika sudah, pilih <b>Simpan</b>.</li>
                <li>Selanjutnya pilih <b>Mulai Ekspor</b>.</li>
                <li>Tunggu proses pembuatan data selesai, biasanya membutuhkan waktu sekitar 5 Menit (Waktu dapat bervariasi). Jika sudah selesai Anda akan menerima email dari Instagram.</li>
                <li>Kemudian jika sudah selesai, silahkan Download data Anda dengan menekan tombol <b>Download</b>. Kata sandi diperlukan untuk men-download data.</li>
                <li>Setelah ter-download, <b>ekstrak</b> file zip tersebut dan Anda sudah mendapatkan <b>file JSON-nya</b>.</li>
                <li>Terakhir Anda hanya perlu memasukkan file <b>followers_1.json</b> dan <b>following.json</b> sesuai kolomnya (tidak boleh terbalik).</li>
                <li>Lalu pilih <b>Analisis Data</b>.</li>
            </ol>
        </div>


    </div>
</template>

<style scoped>

    a {
        text-decoration: none;
        color: var(--text-prime);
    }

    input[type="file"] {
        display: none;
    }

    .container {
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

    .container .header {
        width: 60%;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding-top: 3rem;
    }

    .container .header p {
        margin: 0;
    }

    .container .files {
        width: 60%;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding-top: 3rem;
    }

    .container .files h1 {
        text-align: start;
        margin-bottom: 0;
    }

    .container .files p {
        text-align: start;
        color: var(--text-second);
        margin-bottom: 24px;
    }

    .container .files form {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr 64px;
        gap: 12px;
    }

    .container .files form .uploader {
        background-color: var(--bg-second);
        display: flex;
        flex-direction: column;
        text-align: start;
        border-radius: 16px;
        transition: background-color 0.5s ease, color 0.5s ease;
    }

    .container .files form .uploader:hover {
        background-color: var(--accent);

        .icon {
            color: var(--text-second);
        }

        .title {
            color: var(--text-prime);
            text-decoration: underline;
        }
    }

    .container .files form .uploader label {
        cursor: pointer;
        padding: 12px;
    }

    .container .files form .uploader .icon {
        font-size: 40px;
        color: var(--accent);
        margin-top: 5px;
        transition: background-color 0.5s ease, color 0.5s ease;
    }

    .container .files form .uploader .title {
        color: var(--text-second);
        margin-left: 5px;
        transition: background-color 0.5s ease, color 0.5s ease;
    }

    .container .files form button {
        grid-column: 1/3;
        color: var(--accent);
        background-color: transparent;
        border: 2px solid var(--accent);
        border-radius: 16px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.5s ease, color 0.5s ease;
        
    }

    .container .files form button:hover {
        background-color: var(--accent);
        color: var(--text-prime);
    }

    .container .files .uploaded {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        
    }

    .container .files .uploaded .file {
        background-color: var(--accent);
        border-radius: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
        padding: 22px 12px;
    }

    .container .files .uploaded .file .title {
        color: var(--text-prime);
        font-size: 14px;
        margin: 0;
    }

    .container .files .uploaded .file .icon {
        font-size: 14px;
    }

    .container .guide {
        width: 60%;
        display: flex;
        flex-direction: column;
        text-align: start;
        margin-top: 2rem;
    }

    .container .guide h1 {
        margin-bottom: 12px;
    }
    


    @media (max-width: 800px) {
        .container .top-bar {
            width: 90%;
            min-width: 200px;
        }

        .container .header {
            width: 90%;
            min-width: 200px;
        }

        .container .files {
            width: 90%;
            min-width: 200px;
        }
        
        .container .guide {
            width: 90%;
            min-width: 200px;
        }
    }

</style>