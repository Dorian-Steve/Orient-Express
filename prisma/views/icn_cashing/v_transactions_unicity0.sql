SELECT
  `t`.`id` AS `id`,
  `t`.`reference` AS `reference`,
  concat(
    REPLACE(`t`.`name`, ' ', ''),
    '-',
    `t`.`amount`,
    '-',
    `t`.`bankId`,
    '-',
    `t`.`branchId`,
    '-',
    `t`.`paymentModeId`,
    '-',
    CONVERT(
      date_format(`t`.`paymentDate`, '%Y-%m-%d') USING utf8mb4
    )
  ) AS `delta`,
  `u`.`email` AS `email`,
  `u`.`phone` AS `phone`
FROM
  (
    `icn_cashing`.`transactions` `t`
    LEFT JOIN `icn_cashing`.`users` `u` ON((`t`.`createdBy` = `u`.`id`))
  )
ORDER BY
  `t`.`created_at` DESC