SELECT
  `t`.`id` AS `id`,
  `t`.`reference` AS `reference`,
  `t`.`type` AS `type`,
  `t`.`unpaidCount` AS `unpaidCount`,
  `t`.`unpaidAmount` AS `unpaidAmount`,
  `t`.`comment` AS `comment`,
  `t`.`status` AS `status`,
  `tw`.`workflowId` AS `workflowId`,
  `tw`.`workflowcurrentStepId` AS `workflowcurrentStepId`,
  `t`.`createdBy` AS `createdBy`,
  `uc`.`name` AS `creator`,
  `t`.`createdAt` AS `createdAt`,
  `t`.`updatedBy` AS `updatedBy`,
  `uc`.`name` AS `modifier`,
  `t`.`updatedAt` AS `updatedAt`,
  `ws`.`description` AS `workflowStatus`
FROM
  (
    (
      (
        (
          (
            `icn_cashing`.`tickets` `t`
            LEFT JOIN `icn_cashing`.`ticket_workflow` `tw` ON((`t`.`id` = `tw`.`ticketId`))
          )
          LEFT JOIN `icn_cashing`.`workflow_steps` `ws` ON((`tw`.`workflowcurrentStepId` = `ws`.`id`))
        )
        LEFT JOIN `icn_cashing`.`workflow_validations` `wv` ON((`ws`.`id` = `wv`.`stepId`))
      )
      LEFT JOIN `icn_cashing`.`users` `uc` ON((`t`.`createdBy` = `uc`.`id`))
    )
    LEFT JOIN `icn_cashing`.`users` `uu` ON((`t`.`createdBy` = `uu`.`id`))
  )
WHERE
  (`t`.`deleted` = 0)
ORDER BY
  `t`.`createdAt` DESC