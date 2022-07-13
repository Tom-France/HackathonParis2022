let tags = [
        {
            name: "Santa Monica",
            number: 1995,
            amount: "$11,800",
            due: "12/05/1995",
        },
        {
            name: "Stankonia",
            number: 2000,
            amount: "$8,000",
            due: "10/31/2000",
        },
        {
            name: "Ocean Avenue",
            number: 2003,
            amount: "$9,500",
            due: "07/22/2003",
        },
        {
            name: "Tubthumper",
            number: 1997,
            amount: "$14,000",
            due: "09/01/1997",
        },
        {
            name: "Wide Open Spaces",
            number: 1998,
            amount: "$4,600",
            due: "01/27/1998",
        },
    ];
  
export function getTags() {
    return tags;
}

export function getTag(number) {
    return tags.find(
        (tag) => tag.number === number
    );
}



export const TAGS_DATABASE = "tags";
export const DB_VERSION = 1;

export function idbConnect() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(TAGS_DATABASE, DB_VERSION);

    request.onsuccess = ev => {
      resolve(request.result);
    };

    request.onupgradeneeded = ev => {
      //Is fired when version changes. Create data tables
      const db = ev.target.result;
      const objectStore = db.createObjectStore(TAGS_DATABASE, {
        autoIncrement: true
      });
      objectStore.createIndex("name", "name", { unique: false });
      objectStore.createIndex("id", "id", { unique: false });
      objectStore.createIndex("x", "x", { unique: false });
      objectStore.createIndex("y", "y", { unique: false });
    };

    request.onerror = () => {
      reject("Error occured");
    };
    request.onblocked = () => {
      reject("Blocked!");
    };
  });
}

export const idb = idbConnect();

export const idbAddItem = item => {
  const objectStore = idb
    .transaction(TAGS_DATABASE, "readwrite")
    .objectStore(TAGS_DATABASE);
  const request = objectStore.add(item);
  request.onsuccess = e => {
    console.log(`Item with id ${e.target.result} added`);
  };
};

export const idbRemoveItem = key => {
  const objectStore = idb
    .transaction(TAGS_DATABASE, "readwrite")
    .objectStore(TAGS_DATABASE);

  const request = objectStore.delete(key);
  request.onsuccess = e => {
    console.log(`Item with key ${key} was removed`);
  };

  request.onerror = e => {
    console.log(`Error: ${e}`);
  };
};
