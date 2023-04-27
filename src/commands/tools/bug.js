const {
    SlashCommandBuilder,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("bug")
      .setDescription("Сделать отчет об ошибке в работе бота."),
  
    async execute(interaction, client) {
      const modal = new ModalBuilder()
        .setCustomId(`bugM`)
        .setTitle("Сделать отчет об ошибке в работе бота");
  
      const bugInput = new TextInputBuilder()
        .setCustomId("bugInput")
        .setLabel("Укажите проблему/ошибку в работе бота")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);
  
      const firstActionRow = new ActionRowBuilder().addComponents(bugInput);
  
      modal.addComponents(firstActionRow);
  
      await interaction.showModal(modal);
    },
  };
  