export function updateStats() {
    const reportCount = document.querySelectorAll('#history-body tr').length;
    document.getElementById('laporan-count').textContent = reportCount;

    let totalFeed = 0;
    document.querySelectorAll('#history-body tr').forEach(row => {
        const feed = parseInt(row.cells[4].textContent);
        if (!isNaN(feed)) totalFeed += feed;
    });
    document.getElementById('total-pakan').textContent = `${(totalFeed / 1000).toFixed(1)} Kg`;
}
