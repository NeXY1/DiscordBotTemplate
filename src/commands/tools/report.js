const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Пожаловаться на пользователя"),

  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId(`reportM`)
      .setTitle("Пожаловаться на пользователя");

    const userInput = new TextInputBuilder()
      .setCustomId("userInput")
      .setLabel("На кого вы хотите пожаловаться ?")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const reasonInput = new TextInputBuilder()
      .setCustomId("reasonInput")
      .setLabel("Что случилось ?")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const firstActionRow = new ActionRowBuilder().addComponents(userInput);
    const secondActionRow = new ActionRowBuilder().addComponents(reasonInput);

    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);
  },
};
