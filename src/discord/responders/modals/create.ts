import { createResponder, ResponderType } from "#base";
import { productService } from "#database";
import { res } from "#functions";
import { modalFieldsToRecord } from "@magicyan/discord";
import { bold } from "discord.js";
import z from "zod";

const responderSchema = z.object({
  action: z.enum(["product"]),
});

const inputSchema = z.object({
  id: z.string(),
});

createResponder({
  customId: "create/:action",
  cache: "cached",
  types: [ResponderType.Modal],
  parse: responderSchema.parse,
  async run(interaction, { action }) {
    await interaction.reply(
      res.primary("Por favor aguarde, estamos realizando essa ação...")
    );

    const { id } = modalFieldsToRecord(interaction, inputSchema.parse);

    switch (action) {
      case "product": {
        const { data } = await productService.get(id);

        if (data) {
          await interaction.editReply(
            res.warning(`Desculpe, esse ${bold("ID")} já está sendo utilizado.`)
          );
          return;
        }

        await productService
          .set(id, {
            id,
            name: "Nome padrão...",
            price: 10,
            stock: [],
            images: [],
          })
          .then(async () => {
            await interaction.editReply(
              res.success("Parabéns, o produto foi cadastrado com sucesso.")
            );
          })
          .catch(async (err) => {
            console.error(err);
            await interaction.editReply(
              res.danger("Desculpe, não foi possível cadastrar o produto.")
            );
          });
        return;
      }
    }
  },
});
