const {
    SlashCommandBuilder,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("question")
      .setDescription("Задать вопрос"),
  
    async execute(interaction, client) {
      const modal = new ModalBuilder()
        .setCustomId(`questionM`)
        .setTitle("Задать вопрос");
  
      const userInput = new TextInputBuilder()
        .setCustomId("userInput")
        .setLabel("Кому вы хотите задать вопрос ?")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
  
      const qInput = new TextInputBuilder()
        .setCustomId("qInput")
        .setLabel("Вопрос")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);
  
      const firstActionRow = new ActionRowBuilder().addComponents(userInput);
      const secondActionRow = new ActionRowBuilder().addComponents(qInput);
  
      modal.addComponents(firstActionRow, secondActionRow);
  
      await interaction.showModal(modal);
    },
  };
  