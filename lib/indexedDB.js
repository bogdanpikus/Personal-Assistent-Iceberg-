let cachedDb = null;

export function openDB() {
    if (cachedDb) return Promise.resolve(cachedDb);

    return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open("Storage", 2);
        openRequest.onupgradeneeded = function (event) {
            let db = event.target.result;
            if (!db.objectStoreNames.contains("Notes")) {
                db.createObjectStore("Notes", { keyPath: "id" });
            };
            if (!db.objectStoreNames.contains("Tasks")) {
                db.createObjectStore("Tasks", { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains("Stats")) {
                db.createObjectStore("Stats", { keyPath: "id" });
            }
        };

        openRequest.onsuccess = () => {
            cachedDb = openRequest.result;
            resolve(cachedDb);
        };
        openRequest.onerror = () => {
            reject(openRequest.error)
        };
    })
}

