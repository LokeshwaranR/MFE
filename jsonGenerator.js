const fs = require('fs');

const names = ["Dataset1", "Dataset2", "Dataset3", "Dataset4", "Dataset5", "Dataset6", "Dataset7", "Dataset8", "Dataset9", "Dataset10" ];

const getRandomName = () => names[Math.floor(Math.random() * names.length)];

const getRandomValue = () => Math.floor(Math.random() * 100) + 1;

const dataList = Array.from({ length: 5000 }, () => ({
    name: getRandomName(),
    value: getRandomValue(),
    from: "React",
    to: "Angular"
}));

const jsonString = JSON.stringify(dataList, null, 4);
fs.writeFile('data.json', jsonString, (err) => {
    if (err) {
        console.error('An error occurred:', err);
        return;
    }
    console.log('JSON file has been successfully created!');
});
