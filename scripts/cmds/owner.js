const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "2.0.0",
    author: "NirZon",
    role: 0,
    shortDescription: "Owner information with image",
    category: "Information",
    guide: {
      en: "owner"
    }
  },

  onStart: async function ({ api, event }) {
    const ownerText = 
`╭─ 👑 Oᴡɴᴇʀ Iɴғᴏ 👑 ─╮
│ 👤 Nᴀᴍᴇ       : AriyAn Isʟᴀᴍ
│ 🧸 Nɪᴄᴋ       : Aruu
│ 🎂 Aɢᴇ        : 21+
│ 💼 Pʀᴏғᴇssɪᴏɴ : Jᴏʙ
│ 🏡 Lᴏᴄᴀᴛɪᴏɴ : 
├─ 🔗 Cᴏɴᴛᴀᴄᴛ ─╮
│ 📘 facebook : https://www.facebook.com/aruuhbbz
│ 💬 Messanger: https://m.me/aruuhbbz
╰────────────────╯`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "owner.jpg");

    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const imgLink = "https://i.imgur.com/dsdtiLt.jpeg";

    const send = () => {
      api.sendMessage(
        {
          body: ownerText,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => fs.unlinkSync(imgPath),
        event.messageID
      );
    };

    request(encodeURI(imgLink))
      .pipe(fs.createWriteStream(imgPath))
      .on("close", send);
  }
};
