SELECT
  `t`.`id` AS `id`,
  `t`.`reference` AS `reference`,
  `t`.`type` AS `type`,
  `t`.`unpaidCount` AS `unpaidCount`,
  `t`.`unpaidAmount` AS `unpaidAmount`,
  `t`.`comment` AS `comment`,
  `t`.`status` AS `status`,
  `ticc`.`SERVICE_NUMBER` AS `SERVICE_NUMBER`,
  `ticc`.`SUPPLY_POINT` AS `SUPPLY_POINT`,
  `ticc`.`CODE_CLIENT` AS `CODE_CLIENT`,
  `ticc`.`NOM_CLIENT` AS `NOM_CLIENT`,
  `ticc`.`NO_COMPTEUR` AS `NO_COMPTEUR`,
  `ticc`.`ADRESSE_CLIENT` AS `ADRESSE_CLIENT`,
  `ticc`.`CONTACT_CLIENT` AS `CONTACT_CLIENT`,
  `ticc`.`CODE_TARIF_CLIENT` AS `CODE_TARIF_CLIENT`,
  `ticc`.`LIBELLE_TARIF_CLIENT` AS `LIBELLE_TARIF_CLIENT`,
  `ticc`.`CODE_STATUT_CONTRAT` AS `CODE_STATUT_CONTRAT`,
  `ticc`.`LIBELLE_STATUT_CONTRAT` AS `LIBELLE_STATUT_CONTRAT`,
  `ticc`.`CODE_TYPE_PHASE` AS `CODE_TYPE_PHASE`,
  `ticc`.`LIBELLE_TYPE_PHASE` AS `LIBELLE_TYPE_PHASE`,
  `ticc`.`VOLTAGE_CLIENT` AS `VOLTAGE_CLIENT`,
  `ticc`.`CODE_REGROUPEMENT` AS `CODE_REGROUPEMENT`,
  `ticc`.`NOM_REGROUPEMENT` AS `NOM_REGROUPEMENT`,
  `ticc`.`CENTRE_DE_REVE` AS `CENTRE_DE_REVE`,
  `ticc`.`TYPE_COMPTEUR` AS `TYPE_COMPTEUR`,
  `ticc`.`TYPE_CLIENT` AS `TYPE_CLIENT`,
  `ticc`.`CATEGORIE_CLIENT` AS `CATEGORIE_CLIENT`,
  `ticc`.`REGION` AS `REGION`,
  `ticc`.`DIVISION` AS `DIVISION`,
  `ticc`.`CODE_AGENCE` AS `CODE_AGENCE`,
  `ticc`.`AGENCE` AS `AGENCE`,
  `tw`.`workflowId` AS `workflowId`,
  `tw`.`workflowcurrentStepId` AS `workflowcurrentStepId`,
  `t`.`createdBy` AS `createdBy`,
  `uc`.`name` AS `creator`,
  `t`.`createdAt` AS `createdAt`,
  `t`.`updatedBy` AS `updatedBy`,
  `uc`.`name` AS `modifier`,
  `t`.`updatedAt` AS `updatedAt`,
  `ws`.`description` AS `workflowStatus`,
  `wvu`.`userId` AS `validatorUId`,
  `ur`.`userId` AS `validatorId`,
  `ur`.`roleId` AS `validatorRoleId`
FROM
  (
    (
      (
        (
          (
            (
              (
                (
                  (
                    `icn_cashing`.`tickets` `t`
                    JOIN `icn_cashing`.`t_import_clients_cms` `ticc` ON((`t`.`reference` = `ticc`.`SERVICE_NUMBER`))
                  )
                  LEFT JOIN `icn_cashing`.`ticket_workflow` `tw` ON((`t`.`id` = `tw`.`ticketId`))
                )
                LEFT JOIN `icn_cashing`.`workflow_steps` `ws` ON((`tw`.`workflowcurrentStepId` = `ws`.`id`))
              )
              LEFT JOIN `icn_cashing`.`workflow_validations` `wv` ON((`ws`.`id` = `wv`.`stepId`))
            )
            LEFT JOIN `icn_cashing`.`workflow_validation_roles` `wvr` ON((`wv`.`id` = `wvr`.`workflowValidationId`))
          )
          LEFT JOIN `icn_cashing`.`workflow_validation_users` `wvu` ON((`wv`.`id` = `wvu`.`workflowValidationId`))
        )
        LEFT JOIN `icn_cashing`.`user_roles` `ur` ON((`ur`.`roleId` = `wvr`.`roleId`))
      )
      LEFT JOIN `icn_cashing`.`users` `uc` ON((`t`.`createdBy` = `uc`.`id`))
    )
    LEFT JOIN `icn_cashing`.`users` `uu` ON((`t`.`createdBy` = `uu`.`id`))
  )
WHERE
  (`t`.`deleted` = 0)
ORDER BY
  `t`.`createdAt` DESC