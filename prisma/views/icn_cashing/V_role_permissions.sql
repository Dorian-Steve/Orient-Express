SELECT
  `r`.`id` AS `id`,
  `r`.`name` AS `role`,
  GROUP_CONCAT(`p`.`name` SEPARATOR ', ') AS `permissions`
FROM
  (
    (
      `icn_cashing`.`roles` `r`
      LEFT JOIN `icn_cashing`.`role_permissions` `rp` ON((`r`.`id` = `rp`.`roleId`))
    )
    LEFT JOIN `icn_cashing`.`permissions` `p` ON((`p`.`id` = `rp`.`permissionId`))
  )
GROUP BY
  `r`.`id`,
  `r`.`name`
ORDER BY
  `r`.`created_at` DESC