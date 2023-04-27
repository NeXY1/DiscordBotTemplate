const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: `bugM`
  },
  async execute(interaction, client) {
    await interaction.reply({ content: 'Спасибо за отчет !!! Этим Вы делаете сервер лучше.' });
    
    const uRep = interaction.fields.getTextInputValue("bugInput");
    console.log({ uRep });

    const repEmbed = new EmbedBuilder()
      .setColor(0xCC6699)
      .setTitle("Тип оповещения: Проблема")
      .setAuthor({ name: "----- Оповещение -----" })
      .setDescription("Состав отчета:")
      .addFields(
        { name: "Проблема:", value: uRep }
      )
      .setTimestamp();

    
    const chanelMOD_ONLY1 = client.channels
      .fetch("1010155691043995669")
      .then((channel) => channel.send({ embeds: [repEmbed] }));
  },
};
