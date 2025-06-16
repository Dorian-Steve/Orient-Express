SELECT
  `a`.`id` AS `id`,
  `a`.`status` AS `status`,
  `a`.`reference` AS `reference`,
  `a`.`unitId` AS `unitId`,
  `ut`.`name` AS `unit`,
  `a`.`userId` AS `userId`,
  `u`.`name` AS `user`,
  `u`.`email` AS `userEmail`,
  `u`.`phone` AS `userPhone`,
  `a`.`validatorId` AS `validatorId`,
  `uv`.`name` AS `validator`,
  `a`.`validatedAt` AS `validatedAt`,
  `uv`.`email` AS `validatorEmail`,
  `uv`.`phone` AS `validatorPhone`,
  `a`.`reasonForRefusal` AS `reasonForRefusal`,
  `a`.`created_at` AS `createdAt`,
  `a`.`createdBy` AS `createdBy`,
  `a`.`updated_at` AS `updatedAt`,
  `a`.`modifiedBy` AS `modifiedBy`
FROM
  (
    (
      (
        `icn_cashing`.`assignments` `a`
        LEFT JOIN `icn_cashing`.`users` `u` ON((`u`.`id` = `a`.`userId`))
      )
      LEFT JOIN `icn_cashing`.`users` `uv` ON((`uv`.`id` = `a`.`validatorId`))
    )
    LEFT JOIN `icn_cashing`.`units` `ut` ON((`ut`.`id` = `a`.`unitId`))
  )
WHERE
  (`a`.`deleted` = 0)
ORDER BY
  `a`.`created_at` DESC