import { GenericResponderInteraction } from "#base";
import { createContainer } from "@magicyan/discord";
import { CommandInteraction, InteractionReplyOptions } from "discord.js";
import { z, ZodError } from "zod";

export async function zodErrorHandler(
  error: ZodError,
  interaction: CommandInteraction | GenericResponderInteraction
) {
  const container = createContainer({
    accentColor: constants.colors.danger,
    components: [
      "Ocorreu um erro ao validar os dados!",
      z.prettifyError(error),
    ],
  });

  const options = {
    flags: ["Ephemeral", "IsComponentsV2"],
    components: [container],
  } satisfies InteractionReplyOptions;

  await interaction
    .reply(options)
    .catch(async () => {
      await interaction.followUp(options);
    })
    .catch(() => null);
}
