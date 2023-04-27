const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: `questionM`
  },
  async execute(interaction, client) {
    await interaction.reply({ content: 'Ок, мы ответим вам в личные сообщения (если у нас не получится, то ответим в другом месте).' });
    
    const uRep = interaction.fields.getTextInputValue("userInput");
    const rRep = interaction.fields.getTextInputValue("qInput");
    console.log({ uRep, rRep });

    const repEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle("Тип оповещения: Вопрос")
      .setAuthor({ name: "----- Оповещение -----" })
      .setDescription("Состав вопроса:")
      .addFields(
        { name: "У кого спрашивают:", value: uRep },
        { name: "Вопрос:", value: rRep, inline: true }
      )
      .setTimestamp();

    
    const chanelMOD_ONLY1 = client.channels
      .fetch("1010155691043995669")
      .then((channel) => channel.send({ embeds: [repEmbed] }));
  },
};
