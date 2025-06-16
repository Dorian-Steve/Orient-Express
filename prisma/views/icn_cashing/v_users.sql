SELECT
  `u`.`id` AS `id`,
  `u`.`name` AS `name`,
  `u`.`email` AS `email`,
  `u`.`phone` AS `phone`,
  `u`.`ldap` AS `ldap`,
(
    CASE
      WHEN (`u`.`isActive` = 0) THEN 'inactive'
      ELSE 'active'
    END
  ) AS `status`,
  `u`.`isActive` AS `isActive`,
  `u`.`deleted` AS `deleted`,
  `u`.`deletedAt` AS `deletedAt`,
  GROUP_CONCAT(`r`.`name` SEPARATOR ', ') AS `roles`,
  `ut`.`name` AS `unit`,
  `u`.`createdAt` AS `createdAt`,
  `u`.`updatedAt` AS `updatedAt`
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
WHERE
  (`u`.`deleted` = 0)
GROUP BY
  `u`.`id`,
  `u`.`name`,
  `u`.`email`,
  `u`.`phone`,
  `u`.`ldap`,
  `ut`.`name`
ORDER BY
  `u`.`createdAt` DESC