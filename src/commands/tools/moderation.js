const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("moderation")
    .setDescription("Mod-menu")
    .setDefaultMemberPermissions(
      //PermissionFlagsBits.KickMembers |
        //PermissionFlagsBits.BanMembers |
        //PermissionFlagsBits.MuteMembers |
        PermissionFlagsBits.Administrator
    )
    .addUserOption((option) =>
      option.setName("target").setDescription("Target user").setRequired(true)
    )

    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Type (1 - ban, 2 - timeout, 3 - kick)")
        .setRequired(true)
    )

    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason").setRequired(false)
    )

    .addStringOption((option) =>
      option.setName("option").setDescription("Option").setRequired(false)
    )

    .addBooleanOption((option) =>
      option.setName("channel").setDescription("Channel").setRequired(false)
    ),

  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    const typeM = interaction.options.getString("type");
    let option = parseInt(interaction.options.getString("option"));
    let reason = interaction.options.getString("reason");
    const ch = interaction.options.getBoolean("channel");

    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!option) option = 1;
    if (!reason) reason = "Отсутствует";

    switch (typeM) {
      case "1":
        user.send(`Вы были забанены на сервере Xinavo-DS. Причина ${reason} Срок ${option} days.`).catch(console.error);
        member
          .ban({
            days: option,
            reason: reason,
          })
          .catch(console.error);

        await interaction.reply({
          content:
            "Status: 1-1",
        });

        if (ch) {
          const banEmbed = new EmbedBuilder()
            .setColor(0xff0000)
            .addFields(
              { name: "---", value: `Пользователь ${user} был забанен.` },
              { name: "---", value: `Причина: ${reason}` }
            )
            .setTimestamp();

          const chanelE = client.channels
            .fetch('1010227171329065031')
            .then((channel) => channel.send({ embeds: [banEmbed] }));
        }

        break;

      case "2":
        user.send(`Вам был выдан мут на сервере Xinavo-DS. Причина ${reason} Срок ${option} min.`).catch(console.error);
        member.timeout(option * 60 * 1000, reason).catch(console.error);
        await interaction.reply({
          content:
            "Status: 1-1",
        });

        if (ch) {
          const banEmbed = new EmbedBuilder()
            .setColor(0xff0000)
            .addFields(
              { name: "---", value: `Пользователю ${user} был выдан мут на ${option} min.` },
              { name: "---", value: `Причина: ${reason}` }
            )
            .setTimestamp();

          const chanelE = client.channels
            .fetch('1010227171329065031')
            .then((channel) => channel.send({ embeds: [banEmbed] }));
        }
        break;

      case "3":
        user.send(`Вы были кикнуты с сервера Xinavo-DS. Причина ${reason}`).catch(console.error);
        await member.kick(reason).catch(console.error);
        await interaction.reply({
          content:
            "Status: 3-1",
        });

        if (ch) {
          const kickEmbed = new EmbedBuilder()
            .setColor(0xff0000)
            .addFields(
              { name: "---", value: `Пользователь ${user} был кикнут с сервера.` },
              { name: "---", value: `Причина: ${reason}` }
            )
            .setTimestamp();

          const chanelE = client.channels
            .fetch('1010227171329065031')
            .then((channel) => channel.send({ embeds: [kickEmbed] }));
        }

        break;

      default:
        console.log("err: moderation SC default (incorrect typeM)");
        break;
    }
  },
};
