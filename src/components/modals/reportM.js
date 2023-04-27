const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: `reportM`
  },
  async execute(interaction, client) {
    await interaction.reply({ content: 'Мне конечно похуй, но отправлю пожалуй админам.' });
    
    const uRep = interaction.fields.getTextInputValue("userInput");
    const rRep = interaction.fields.getTextInputValue("reasonInput");
    console.log({ uRep, rRep });

    const repEmbed = new EmbedBuilder()
      .setColor(0xff5050)
      .setTitle("Тип оповещения: Жалоба")
      .setAuthor({ name: "----- Оповещение -----" })
      .setDescription("Состав жалобы:")
      .addFields(
        { name: "На кого жалуются:", value: uRep },
        { name: "Причина:", value: rRep, inline: true }
      )
      .setTimestamp();

    
    const chanelMOD_ONLY1 = client.channels
      .fetch("1010155691043995669")
      .then((channel) => channel.send({ embeds: [repEmbed] }));
  },
};
