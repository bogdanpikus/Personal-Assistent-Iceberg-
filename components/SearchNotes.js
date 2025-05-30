const search = document.getElementById('main_search');
const DB_NAME = "Tasks";
const STORE_NAME = "NoteDB";
function Search(text) {
    const openRequest = indexedDB.open(DB_NAME);
    openRequest.onsuccess = function () {
        let db = openRequest.result;
        let transaction = db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).getAll();
        transaction.onsuccess = function () {
            const allNotes = transaction.result;
            const fileFilter = allNotes.filter(note =>
                note.title && note.title.toLowerCase().includes(text.toLowerCase())
            );
            console.log("���������� ������:", fileFilter);
            
        };
        transaction.onerror = function () {
            console.error("������ ��������� ������");
        };
    }
    openRequest.onerror = function () {
        alert("Fatal OpenRequest ERROR", openRequest.error);
    }
};

search.addEventListener("input", function () {
    const text = this.value.trim();

    if (text === "") {
        container.innerHTML = ""; // �������, ���� ���� ������
        return;
    }

    Search(text);
});
