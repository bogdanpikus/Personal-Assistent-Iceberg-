export function openDB() {
    return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open("Storage", 1);
        openRequest.onupgradeneeded = function (event) {
            let db = event.target.result;
            if (!db.objectStoreNames.contains("Notes")) {
                db.createObjectStore("Notes", { keyPath: "id" });
            };
        };

        openRequest.onsuccess = () => resolve(openRequest.result);
        openRequest.onerror = () => reject(openRequest.error);
    })
}