const { EmbedBuilder, Embed } = require("discord.js");
const Parser = require("rss-parser");
const parser = new Parser();
const fs = require("fs");

module.exports = (client) => {
  client.checkVideo = async () => {
    Console.log('Check videos');
    
    const data = await parser
      .parseURL(
        "https://www.youtube.com/feeds/videos.xml?channel_id=UC_eJydLmvf7usGGJMYCkr0Q"
      )
      .catch(console.error);

    const rawData = fs.readFileSync(`${__dirname}/../../json/video.json`);
    const jsonData = JSON.parse(rawData);

    if (jsonData.id !== data.items[0].id) {
      fs.writeFileSync(
        `${__dirname}/../../json/video.json`,
        JSON.stringify({ id: data.items[0].id })
      );

      const { title, link, id, author } = data.items[0];
      const embed = new EmbedBuilder({
        title: title,
        url: link,
        timestamp: Date.now(),
        image: {
          url: `https://img.youtube.com/vi/${id.slice(9)}/maxresdefault.jpg`,
        },
        author: {
          name: author,
          //iconURL: "", //INSERT IMAGE LINK
          url: "https://www.youtube.com/channel/UC_eJydLmvf7usGGJMYCkr0Q/?sub_confirmation=1",
        },
        footer: {
          text: client.user.tag,
          iconURL: client.user.displayAvatarURL(),
        },
      });

      const chanelMOD_ONLY1 = client.channels
        .fetch("1011676375729569892")
        .then((channel) =>
          channel.send({
            embeds: [embed],
            content: "Хай @everyone !!! Новое видео на канале !",
          })
        );
    }
  };
};
