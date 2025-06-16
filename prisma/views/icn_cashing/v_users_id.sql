SELECT
  `u`.`id` AS `id`,
  `u`.`name` AS `name`,
  `u`.`email` AS `email`,
  `u`.`ldap` AS `ldap`,
  `u`.`password` AS `password`,
  `u`.`isActive` AS `isActive`,
  `u`.`deleted` AS `deleted`,
  GROUP_CONCAT(`r`.`id` SEPARATOR ', ') AS `roleId`,
  `ut`.`id` AS `unitId`
FROM
  (
    (
      (
        `icn_cashing`.`users` `u`
        LEFT JOIN `icn_cashing`.`user_roles` `ur` ON((`u`.`id` = `ur`.`userId`))
      )
      LEFT JOIN `icn_cashing`.`roles` `r` ON((`r`.`id` = `ur`.`roleId`))
    )
    LEFT JOIN `icn_cashing`.`units` `ut` ON((`ut`.`id` = `u`.`unitId`))
  )
GROUP BY
  `u`.`id`,
  `u`.`name`,
  `u`.`email`,
  `u`.`ldap`,
  `u`.`password`,
  `u`.`deleted`,
  `ut`.`id`
ORDER BY
  `u`.`createdAt` DESC