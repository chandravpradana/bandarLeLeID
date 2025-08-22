import { updateStats } from './stats.js';

export function initForm() {
    const form = document.getElementById('feedForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const data = {
            tanggal: document.getElementById('tanggal').value,
            waktu: document.getElementById('waktu').value,
            kolam: document.querySelector('#kolam option:checked').textContent,
            jenisPakan: document.querySelector('#jenis-pakan option:checked').textContent,
            jumlah: document.getElementById('jumlah').value,
            pelaksana: document.querySelector('#pelaksana option:checked').textContent
        };

        addHistoryRow(data);
        sendTelegram(data);
        sendGoogleSheets(form);
        showNotification(`Laporan pakan untuk ${data.kolam} berhasil dikirim!`, 'success');
        form.reset();
        setDefaultDateTime();
        updateStats();
    });

    setDefaultDateTime();
}

function setDefaultDateTime() {
    const today = new Date();
    document.getElementById('tanggal').value = today.toISOString().split('T')[0];
    const now = new Date();
    document.getElementById('waktu').value = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

function addHistoryRow(data) {
    const tableBody = document.getElementById('history-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${data.tanggal}</td>
        <td>${data.waktu}</td>
        <td>${data.kolam}</td>
        <td>${data.jenisPakan}</td>
        <td>${data.jumlah}</td>
        <td>${data.pelaksana}</td>
        <td><span class="status status-selesai">Terkirim</span></td>
    `;
    tableBody.insertBefore(newRow, tableBody.firstChild);
}

function sendTelegram(data) {
    const botToken = '8190460652:AAHu2L_0O_jzTJmxBo4mkQTSERPZYAmghjI';
    const chatId = '-1002637747100';
    const message = `
📋 *LAPORAN PAKAN TERKIRIM*
📅 ${data.tanggal} ⏰ ${data.waktu}
🏞️ ${data.kolam}
🍽️ ${data.jenisPakan}
⚖️ ${data.jumlah} gram
👤 ${data.pelaksana}
    `;
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
    }).catch(() => showNotification('Gagal mengirim ke Telegram!', 'error'));
}

function sendGoogleSheets(form) {
    const scriptURL = 'URL_APPS_SCRIPT';
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .catch(() => showNotification('Gagal mengirim ke Google Sheets!', 'error'));
}

function showNotification(message, type) {
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

