SELECT
  `a`.`id` AS `id`,
  `a`.`createdAt` AS `createdAt`,
  date_format(`a`.`createdAt`, '%d/%m/%Y %H:%i:%s') AS `createdAtFormated`,
  `a`.`action` AS `action`,
  `a`.`source` AS `source`,
  `a`.`userId` AS `userId`,
  `u`.`name` AS `userName`,
  `u`.`email` AS `userEmail`,
  `a`.`ipAddress` AS `ipAddress`,
  `a`.`details` AS `details`,
  `a`.`endpoint` AS `endpoint`
FROM
  (
    `icn_cashing`.`audits` `a`
    LEFT JOIN `icn_cashing`.`users` `u` ON((`a`.`userId` = `u`.`id`))
  )
ORDER BY
  `a`.`createdAt` DESC