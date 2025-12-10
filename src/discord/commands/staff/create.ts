import { createCommand } from "#base";
import { modals } from "#modals";
import { ApplicationCommandOptionType } from "discord.js";

createCommand({
  name: "criar",
  description: "Comando de criação",
  defaultMemberPermissions: ["Administrator"],
  options: [
    {
      name: "produto",
      description: "Criar um Produto",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
  async run(interaction) {
    const { options } = interaction;
    const subCommand = options.getSubcommand();

    switch (subCommand) {
      case "produto": {
        await interaction.showModal(modals.product.create());
        return;
      }
    }
  },
});
