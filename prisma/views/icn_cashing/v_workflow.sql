SELECT
  `w`.`id` AS `id`,
  `w`.`name` AS `name`,
  `w`.`description` AS `description`,
  `w`.`isActive` AS `isActive`,
  `w`.`createdAt` AS `createdAt`,
  `w`.`createdBy` AS `createdBy`,
  `w`.`updatedAt` AS `updatedAt`,
  `w`.`updatedBy` AS `updatedBy`
FROM
  `icn_cashing`.`workflows` `w`
WHERE
  (`w`.`deleted` = 0)
ORDER BY
  `w`.`createdAt` DESC